import React from 'react';
import { Translate, useTranslate } from '../../i18n';
import Image from '../shared/image';
import AnimatedNumber from '~/animations/animated-number';

const StatsSection: React.FC = () => {
   const { lang } = useTranslate();
   const locale = lang === 'en' ? 'en-US' : 'en-US';

   const items = [
      {
         icon: '/images/stats/workshops_v2.svg',
         value: 45,
         compact: false,
         suffix: '+',
         labelId: 'stats_workshops_label',
      },
      {
         icon: '/images/stats/visitors_v2.svg',
         value: 18000,
         compact: true,
         suffix: '+',
         labelId: 'stats_visitors_label',
      },
      {
         icon: '/images/stats/exhibitors_v2.svg',
         value: 150,
         compact: false,
         suffix: '+',
         labelId: 'stats_exhibitors_label',
      },
      {
         icon: '/images/stats/speakers_v2.svg',
         value: 85,
         compact: false,
         suffix: '+',
         labelId: 'stats_speakers_label',
      },
      {
         icon: '/images/stats/consultants_v2.svg',
         value: 50,
         compact: false,
         suffix: '+',
         labelId: 'stats_consultants_label',
      },
   ];

   return (
      <section className="relative overflow-hidden py-12 md:py-32">
         {/* Background Video */}
         <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover">
               <source
                  src="https://devego.eu-central-1.linodeobjects.com/status_section_bg.mp4"
                  type="video/mp4"
               />
            </video>

            {/* Optional dark/light overlay for readability */}
            <div className="absolute inset-0 bg-[#ECE9E2]/60"></div>
         </div>

         {/* Content */}
         <div className="container relative z-10">
            <h2 className="mb-10 text-center text-3xl font-extrabold text-primary md:mb-14 md:text-5xl">
               <Translate id="web:stats_heading" />
            </h2>

            <div className="row justify-center">
               {items.map((it, i) => (
                  <div key={i} className="col-6 sm:col-4 md:col">
                     <div className="mb-6 flex flex-col text-center ">
                        <div className="relative mx-auto mb-4 h-[72px] w-[72px] md:h-[84px] md:w-[84px]">
                           <Image
                              src={it.icon}
                              alt=""
                              layout="fill"
                              objectFit="contain"
                              className="select-none"
                           />
                        </div>

                        <AnimatedNumber
                           value={it.value}
                           compact={it.compact}
                           suffix={it.suffix}
                           locale={locale}
                           duration={1200}
                           className="text-4xl font-extrabold leading-none text-secondary md:text-5xl"
                        />

                        <div className="mt-3 text-lg font-semibold text-primary">
                           <Translate id={`web:${it.labelId}`} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default StatsSection;
