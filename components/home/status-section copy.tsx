// components/sections/StatsSection.tsx
import React from 'react';
import { Translate, useTranslate } from '../../i18n';
import Image from '../shared/image';
import AnimatedNumber from '~/animations/animated-number';

// type StatItem = {
//    icon: string;
//    value: number; // raw number
//    labelId: string;
//    compact?: boolean; // use 18K notation
//    suffix?: string; // '+'
// };

const StatsSection: React.FC = () => {
   const { lang } = useTranslate();
   const locale = lang === 'en' ? 'en-US' : 'en-US';
   const bgClassName = 'bg-[#ECE9E2]';

   const items = [
      {
         icon: '/images/stats/workshops.svg',
         value: 45,
         compact: false,
         suffix: '+',
         labelId: 'stats_workshops_label',
      },
      {
         icon: '/images/stats/visitors.svg',
         value: 18000,
         compact: true,
         suffix: '+',
         labelId: 'stats_visitors_label',
      },
      {
         icon: '/images/stats/exhibitors.svg',
         value: 150,
         compact: false,
         suffix: '+',
         labelId: 'stats_exhibitors_label',
      },
      {
         icon: '/images/stats/speakers.svg',
         value: 85,
         compact: false,
         suffix: '+',
         labelId: 'stats_speakers_label',
      },
      {
         icon: '/images/stats/consultants.svg',
         value: 50,
         compact: false,
         suffix: '+',
         labelId: 'stats_consultants_label',
      },
   ];

   return (
      <section className={`${bgClassName} py-12 md:py-28`}>
         <div className="container">
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
