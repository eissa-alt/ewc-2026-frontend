import React, { useEffect, useMemo, useRef, useState } from 'react';

type Gender = 'male' | 'female';

type AvatarSaudiCursorTrackerProps = {
   gender?: Gender;
   size?: number; // px
   className?: string;
   // Optional: when true, stops tracking (useful on mobile or when not visible)
   disabled?: boolean;
};

type Vec2 = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
   return Math.max(min, Math.min(max, n));
}

function lerp(a: number, b: number, t: number) {
   return a + (b - a) * t;
}

function usePrefersReducedMotion() {
   const [reduced, setReduced] = useState(false);

   useEffect(() => {
      if (typeof window === 'undefined') return;
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReduced(!!mq.matches);
      update();
      // Safari older compatibility
      if (mq.addEventListener) mq.addEventListener('change', update);
      else mq.addListener(update);
      return () => {
         if (mq.removeEventListener) mq.removeEventListener('change', update);
         else mq.removeListener(update);
      };
   }, []);

   return reduced;
}

const AvatarSaudiCursorTracker: React.FC<AvatarSaudiCursorTrackerProps> = ({
   gender = 'male',
   size = 120,
   className = '',
   disabled = false,
}) => {
   const reducedMotion = usePrefersReducedMotion();
   const containerRef = useRef<HTMLDivElement | null>(null);

   // Target movement (from pointer)
   const targetRef = useRef<Vec2>({ x: 0, y: 0 });

   // Smoothed movement (spring-ish)
   const smoothRef = useRef<Vec2>({ x: 0, y: 0 });
   const velRef = useRef<Vec2>({ x: 0, y: 0 });

   // State we actually render
   const [eye, setEye] = useState<Vec2>({ x: 0, y: 0 });
   const [head, setHead] = useState<number>(0);
   const [blink, setBlink] = useState(false);
   const [breath, setBreath] = useState(0);

   const rafRef = useRef<number | null>(null);
   const blinkTimerRef = useRef<number | null>(null);
   const microTimerRef = useRef<number | null>(null);
   const lastTRef = useRef<number>(0);

   // Config tuned for “elegant / calm” UI
   const cfg = useMemo(() => {
      const eyeMax = size * 0.055; // subtle
      const headMaxDeg = 2.5; // subtle
      return { eyeMax, headMaxDeg };
   }, [size]);

   // Blinking (natural + non-annoying)
   useEffect(() => {
      if (reducedMotion) return;
      const scheduleBlink = () => {
         const delay = 2200 + Math.random() * 3200; // 2.2s - 5.4s
         blinkTimerRef.current = window.setTimeout(() => {
            setBlink(true);
            window.setTimeout(() => setBlink(false), 120);
            scheduleBlink();
         }, delay);
      };
      scheduleBlink();

      return () => {
         if (blinkTimerRef.current) window.clearTimeout(blinkTimerRef.current);
      };
   }, [reducedMotion]);

   // Micro-saccades (tiny eye jitter)
   useEffect(() => {
      if (reducedMotion) return;
      const tick = () => {
         const delay = 900 + Math.random() * 1800;
         microTimerRef.current = window.setTimeout(() => {
            // micro saccade adjusts the *target* slightly for a moment
            const jx = (Math.random() - 0.5) * cfg.eyeMax * 0.35;
            const jy = (Math.random() - 0.5) * cfg.eyeMax * 0.25;
            targetRef.current = {
               x: clamp(targetRef.current.x + jx, -cfg.eyeMax, cfg.eyeMax),
               y: clamp(targetRef.current.y + jy, -cfg.eyeMax, cfg.eyeMax),
            };
            tick();
         }, delay);
      };
      tick();
      return () => {
         if (microTimerRef.current) window.clearTimeout(microTimerRef.current);
      };
   }, [cfg.eyeMax, reducedMotion]);

   // Pointer tracking
   useEffect(() => {
      if (disabled) return;
      if (typeof window === 'undefined') return;

      const onMove = (e: PointerEvent) => {
         if (!containerRef.current) return;

         const rect = containerRef.current.getBoundingClientRect();
         const cx = rect.left + rect.width / 2;
         const cy = rect.top + rect.height / 2;

         const dx = e.clientX - cx;
         const dy = e.clientY - cy;

         // Normalize by half of max dimension
         const maxD = Math.max(rect.width, rect.height) / 2;
         const nx = clamp(dx / maxD, -1, 1);
         const ny = clamp(dy / maxD, -1, 1);

         // Calm easing factor
         const ease = 0.75;

         targetRef.current = {
            x: nx * cfg.eyeMax * ease,
            y: ny * cfg.eyeMax * ease,
         };

         // Head rotation only responds to x, more subtle
         const headDeg = clamp(nx * cfg.headMaxDeg * 0.8, -cfg.headMaxDeg, cfg.headMaxDeg);
         setHead(prev => (reducedMotion ? headDeg : lerp(prev, headDeg, 0.25)));
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
   }, [cfg.eyeMax, cfg.headMaxDeg, reducedMotion, disabled]);

   // Animation loop (spring smoothing)
   useEffect(() => {
      if (disabled) return;
      if (typeof window === 'undefined') return;

      const stiffness = reducedMotion ? 0.25 : 0.14; // lower = softer
      const damping = reducedMotion ? 0.68 : 0.78;

      const loop = (t: number) => {
         const last = lastTRef.current || t;
         const dt = Math.min(32, t - last) / 1000; // cap dt
         lastTRef.current = t;

         // breath (very subtle)
         setBreath(b => (reducedMotion ? 0 : (b + dt * 1.15) % (Math.PI * 2)));

         const target = targetRef.current;
         const pos = smoothRef.current;
         const vel = velRef.current;

         // Spring-ish integration
         const ax = (target.x - pos.x) * (stiffness * 60);
         const ay = (target.y - pos.y) * (stiffness * 60);

         vel.x = (vel.x + ax) * damping;
         vel.y = (vel.y + ay) * damping;

         pos.x = pos.x + vel.x;
         pos.y = pos.y + vel.y;

         // Commit to state at a reasonable cadence
         setEye({ x: pos.x, y: pos.y });

         rafRef.current = window.requestAnimationFrame(loop);
      };

      rafRef.current = window.requestAnimationFrame(loop);
      return () => {
         if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      };
   }, [disabled, reducedMotion]);

   // --- SVG layout ---
   const cx = size / 2;
   const cy = size / 2;

   // Face proportions
   const faceR = size * 0.28;
   const faceY = size * 0.02;

   const eyeY = cy - size * 0.06;
   const eyeSpacing = size * 0.22;

   const eyeDotR = size * 0.018;
   const eyeWhiteR = size * 0.045;

   // Colors (dark-theme friendly)
   const skin = '#F2C9A0';
   const skinShadow = 'rgba(0,0,0,0.18)';
   const ink = '#0B0F14'; // near-black
   const softInk = 'rgba(11,15,20,0.65)';
   const thobe = '#E9F2FF';
   const ghutra = '#FFFFFF';
   const agal = '#0A0A0A';
   const hijab = '#111827'; // slate-900-ish
   const abaya = '#0B1220';
   const accent = 'rgba(45,212,191,0.35)'; // teal glow-ish

   const blinkScaleY = blink ? 0.08 : 1; // squish eyes vertically on blink
   const breatheY = reducedMotion ? 0 : Math.sin(breath) * (size * 0.004);

   // Slight shadow / glow ring for elegance
   const ringStroke = 'rgba(45,212,191,0.35)';
   const ringStroke2 = 'rgba(255,255,255,0.12)';

   return (
      <div
         ref={containerRef}
         className={`relative inline-block ${className}`}
         style={{ width: size, height: size }}
         aria-label={gender === 'male' ? 'Saudi male avatar' : 'Saudi female avatar'}
         role="img">
         <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
            {/* Outer glow ring */}
            <circle
               cx={cx}
               cy={cy}
               r={size * 0.46}
               fill="transparent"
               stroke={ringStroke}
               strokeWidth={size * 0.012}
               opacity={0.8}
            />
            <circle
               cx={cx}
               cy={cy}
               r={size * 0.44}
               fill="transparent"
               stroke={ringStroke2}
               strokeWidth={size * 0.01}
               opacity={0.9}
            />

            {/* Soft background halo */}
            <circle cx={cx} cy={cy} r={size * 0.41} fill={accent} opacity={0.08} />

            {/* Main group (head rotation + breathing) */}
            <g
               transform={`translate(${cx}, ${
                  cy + breatheY
               }) rotate(${head}) translate(${-cx}, ${-cy})`}>
               {/* Shoulders / clothing */}
               {gender === 'male' ? (
                  <>
                     {/* Thobe */}
                     <path
                        d={`
                  M ${cx - size * 0.25} ${cy + size * 0.2}
                  Q ${cx} ${cy + size * 0.1} ${cx + size * 0.25} ${cy + size * 0.2}
                  L ${cx + size * 0.3} ${cy + size * 0.55}
                  Q ${cx} ${cy + size * 0.62} ${cx - size * 0.3} ${cy + size * 0.55}
                  Z
                `}
                        fill={thobe}
                        opacity={0.95}
                     />
                     {/* Collar */}
                     <path
                        d={`
                  M ${cx - size * 0.1} ${cy + size * 0.18}
                  L ${cx} ${cy + size * 0.25}
                  L ${cx + size * 0.1} ${cy + size * 0.18}
                  L ${cx + size * 0.08} ${cy + size * 0.14}
                  L ${cx} ${cy + size * 0.2}
                  L ${cx - size * 0.08} ${cy + size * 0.14}
                  Z
                `}
                        fill="#FFFFFF"
                        opacity={0.9}
                     />
                  </>
               ) : (
                  <>
                     {/* Abaya */}
                     <path
                        d={`
                  M ${cx - size * 0.28} ${cy + size * 0.22}
                  Q ${cx} ${cy + size * 0.1} ${cx + size * 0.28} ${cy + size * 0.22}
                  L ${cx + size * 0.33} ${cy + size * 0.58}
                  Q ${cx} ${cy + size * 0.66} ${cx - size * 0.33} ${cy + size * 0.58}
                  Z
                `}
                        fill={abaya}
                        opacity={0.95}
                     />
                  </>
               )}

               {/* Head shadow */}
               <circle cx={cx} cy={cy + faceY} r={faceR * 1.02} fill={skinShadow} opacity={0.25} />

               {/* Face */}
               <circle cx={cx} cy={cy + faceY} r={faceR} fill={skin} />

               {/* Male headwear: ghutra + agal */}
               {gender === 'male' ? (
                  <>
                     {/* Ghutra cloth */}
                     <path
                        d={`
                  M ${cx - faceR * 1.15} ${cy - faceR * 0.55}
                  Q ${cx} ${cy - faceR * 1.55} ${cx + faceR * 1.15} ${cy - faceR * 0.55}
                  Q ${cx + faceR * 1.25} ${cy + faceR * 0.65} ${cx + faceR * 0.55} ${
                           cy + faceR * 0.95
                        }
                  Q ${cx} ${cy + faceR * 1.1} ${cx - faceR * 0.55} ${cy + faceR * 0.95}
                  Q ${cx - faceR * 1.25} ${cy + faceR * 0.65} ${cx - faceR * 1.15} ${
                           cy - faceR * 0.55
                        }
                  Z
                `}
                        fill={ghutra}
                        opacity={0.98}
                     />
                     {/* Agal */}
                     <ellipse
                        cx={cx}
                        cy={cy - faceR * 0.85}
                        rx={faceR * 0.78}
                        ry={faceR * 0.22}
                        fill={agal}
                        opacity={0.96}
                     />
                     <ellipse
                        cx={cx}
                        cy={cy - faceR * 0.78}
                        rx={faceR * 0.7}
                        ry={faceR * 0.18}
                        fill="rgba(255,255,255,0.08)"
                        opacity={0.6}
                     />
                  </>
               ) : (
                  <>
                     {/* Hijab wrap */}
                     <path
                        d={`
                  M ${cx - faceR * 1.25} ${cy - faceR * 0.45}
                  Q ${cx} ${cy - faceR * 1.55} ${cx + faceR * 1.25} ${cy - faceR * 0.45}
                  L ${cx + faceR * 1.1} ${cy + faceR * 1.25}
                  Q ${cx} ${cy + faceR * 1.42} ${cx - faceR * 1.1} ${cy + faceR * 1.25}
                  Z
                `}
                        fill={hijab}
                        opacity={0.98}
                     />
                     {/* Hijab inner opening (face frame) */}
                     <path
                        d={`
                  M ${cx - faceR * 0.95} ${cy - faceR * 0.1}
                  Q ${cx} ${cy - faceR * 0.98} ${cx + faceR * 0.95} ${cy - faceR * 0.1}
                  Q ${cx + faceR * 0.65} ${cy + faceR * 0.95} ${cx} ${cy + faceR * 1.05}
                  Q ${cx - faceR * 0.65} ${cy + faceR * 0.95} ${cx - faceR * 0.95} ${
                           cy - faceR * 0.1
                        }
                  Z
                `}
                        fill="rgba(255,255,255,0.06)"
                        opacity={0.85}
                     />
                  </>
               )}

               {/* Eyes (white + pupils) */}
               {/* Left eye socket */}
               <g transform={`translate(${cx - eyeSpacing}, ${eyeY}) scale(1, ${blinkScaleY})`}>
                  <ellipse
                     cx={0}
                     cy={0}
                     rx={eyeWhiteR}
                     ry={eyeWhiteR * 0.78}
                     fill="#FFFFFF"
                     opacity={0.95}
                  />
                  {!blink && (
                     <circle
                        cx={clamp(eye.x, -cfg.eyeMax, cfg.eyeMax) * 0.75}
                        cy={clamp(eye.y, -cfg.eyeMax, cfg.eyeMax) * 0.65}
                        r={eyeDotR}
                        fill={ink}
                     />
                  )}
                  {/* eyelid line */}
                  <path
                     d={`M ${-eyeWhiteR} 0 Q 0 ${-eyeWhiteR * 0.55} ${eyeWhiteR} 0`}
                     stroke={softInk}
                     strokeWidth={size * 0.01}
                     fill="none"
                     opacity={0.65}
                  />
               </g>

               {/* Right eye socket */}
               <g transform={`translate(${cx + eyeSpacing}, ${eyeY}) scale(1, ${blinkScaleY})`}>
                  <ellipse
                     cx={0}
                     cy={0}
                     rx={eyeWhiteR}
                     ry={eyeWhiteR * 0.78}
                     fill="#FFFFFF"
                     opacity={0.95}
                  />
                  {!blink && (
                     <circle
                        cx={clamp(eye.x, -cfg.eyeMax, cfg.eyeMax) * 0.75}
                        cy={clamp(eye.y, -cfg.eyeMax, cfg.eyeMax) * 0.65}
                        r={eyeDotR}
                        fill={ink}
                     />
                  )}
                  <path
                     d={`M ${-eyeWhiteR} 0 Q 0 ${-eyeWhiteR * 0.55} ${eyeWhiteR} 0`}
                     stroke={softInk}
                     strokeWidth={size * 0.01}
                     fill="none"
                     opacity={0.65}
                  />
               </g>

               {/* Brows */}
               <path
                  d={`
              M ${cx - eyeSpacing - eyeWhiteR} ${eyeY - size * 0.055}
              Q ${cx - eyeSpacing} ${eyeY - size * 0.075}
              ${cx - eyeSpacing + eyeWhiteR} ${eyeY - size * 0.055}
            `}
                  stroke={ink}
                  strokeWidth={size * 0.012}
                  strokeLinecap="round"
                  opacity={0.85}
                  fill="none"
               />
               <path
                  d={`
              M ${cx + eyeSpacing - eyeWhiteR} ${eyeY - size * 0.055}
              Q ${cx + eyeSpacing} ${eyeY - size * 0.075}
              ${cx + eyeSpacing + eyeWhiteR} ${eyeY - size * 0.055}
            `}
                  stroke={ink}
                  strokeWidth={size * 0.012}
                  strokeLinecap="round"
                  opacity={0.85}
                  fill="none"
               />

               {/* Nose */}
               <path
                  d={`
              M ${cx} ${cy + size * 0.035}
              L ${cx + size * 0.018} ${cy + size * 0.085}
            `}
                  stroke={softInk}
                  strokeWidth={size * 0.012}
                  strokeLinecap="round"
               />

               {/* Mouth (friendly, subtle) */}
               <path
                  d={`
              M ${cx - size * 0.05} ${cy + size * 0.12}
              Q ${cx} ${cy + size * 0.145}
              ${cx + size * 0.05} ${cy + size * 0.12}
            `}
                  stroke="rgba(239,68,68,0.85)"
                  strokeWidth={size * 0.012}
                  strokeLinecap="round"
                  fill="none"
               />
            </g>

            {/* Bottom “stand” shadow to sit nicely on dark UI */}
            <ellipse
               cx={cx}
               cy={cy + size * 0.44}
               rx={size * 0.22}
               ry={size * 0.06}
               fill="rgba(0,0,0,0.35)"
               opacity={0.55}
            />
         </svg>
      </div>
   );
};

export default AvatarSaudiCursorTracker;
