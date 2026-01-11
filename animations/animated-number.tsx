// components/ui/AnimatedNumber.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion';

type Props = {
   value: number;
   compact?: boolean;
   suffix?: string;
   duration?: number; // ms
   locale?: string;
   className?: string;
};

const format = (n: number, compact: boolean, locale?: string) => {
   try {
      return new Intl.NumberFormat(locale, {
         notation: compact ? 'compact' : 'standard',
         maximumFractionDigits: 0,
      }).format(n);
   } catch {
      return compact ? `${Math.round(n / 1000)}` : `${Math.round(n)}`;
   }
};

const AnimatedNumber: React.FC<Props> = ({
   value,
   compact = false,
   suffix = '',
   duration = 1200,
   locale,
   className,
}) => {
   const prefersReduced = useReducedMotion();

   const ref = useRef<HTMLSpanElement>(null);
   // start animation when ~40% in view (once)
   const inView = useInView(ref, { amount: 0.4, once: true });

   const mv = useMotionValue(0);
   const [display, setDisplay] = useState<string>(format(0, compact, locale) + suffix);

   // Subscribe to motion value changes (✅ v6 API)
   useEffect(() => {
      const unsub = mv.onChange(v => {
         setDisplay(format(v, compact, locale) + suffix);
      });
      return () => unsub();
   }, [mv, compact, locale, suffix]);

   // Trigger the animation
   useEffect(() => {
      if (!inView) return;
      const controls = animate(mv, value, {
         duration: prefersReduced ? 0 : duration / 1000,
         ease: [0.22, 1, 0.36, 1], // easeOutCubic-ish
      });
      return () => controls.stop();
   }, [inView, value, duration, prefersReduced, mv]);

   return (
      <motion.span dir="ltr" ref={ref} className={className}>
         {display}
      </motion.span>
   );
};

export default AnimatedNumber;
