import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslate } from '~/i18n';

const HeroSection: React.FC = () => {
   const poster = '/images/hero_poster.png';
   const heightClass = 'h-[640px]';
   const { lang } = useTranslate();

   // client-only media query
   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

   // we need this so SSG/SSR doesn’t try to use window-size on the server
   const [mounted, setMounted] = React.useState(false);
   React.useEffect(() => {
      setMounted(true);
   }, []);

   const src =
      lang === 'ar'
         ? isMobile
            ? 'https://devego.eu-central-1.linodeobjects.com/deve_go_ar_v3_lg_mobile.mp4'
            : 'https://devego.eu-central-1.linodeobjects.com/deve_go_ar_v3_lg.mp4'
         : isMobile
         ? 'https://devego.eu-central-1.linodeobjects.com/deve_go_en_v3_lg_mobile.mp4'
         : 'https://devego.eu-central-1.linodeobjects.com/deve_go_en_v3_lg.mp4';

   return (
      <section className={`relative isolate ${heightClass} bg-primary`}>
         {mounted ? (
            <video
               key={src}
               className="absolute inset-0 h-full w-full object-cover"
               src={src}
               poster={poster}
               autoPlay
               loop
               muted
               playsInline
               preload="auto"
            />
         ) : (
            // what the static HTML shows before hydration
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
         )}
      </section>
   );
};

export default HeroSection;
