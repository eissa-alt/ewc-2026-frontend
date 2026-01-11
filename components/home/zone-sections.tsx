// components/sections/ZonesSection.tsx
import React from 'react';
import { Translate } from '../../i18n';
import Image from '../shared/image';

interface Zone {
   id: number;
   name: string;
   description: string | null;
   image_url: string | null;
   order: number;
}

interface ZonesSectionProps {
   zones: Zone[];
}

const ZonesSection: React.FC<ZonesSectionProps> = ({ zones }) => {
   if (!zones || zones.length === 0) {
      return null;
   }

   return (
      <section className="bg-primary py-14 md:py-20">
         <div className="container">
            {/* Heading */}
            <h2 className="text-center text-3xl font-extrabold text-accent md:text-5xl">
               <Translate id="web:zones_heading" />
            </h2>

            {/* Intro */}
            <p className="mx-auto my-20 max-w-4xl text-center text-lg leading-8 text-white/90 md:text-xl">
               <Translate id="web:zones_intro" />
            </p>

            {/* Zones */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
               {zones.map(zone => (
                  <div key={zone.id} className="flex flex-col items-center justify-center">
                     {zone.image_url ? (
                        <div className="relative h-[120px] w-full max-w-[280px] md:h-[120px] md:max-w-[260px]">
                           <Image
                              src={zone.image_url}
                              alt={`GO ${zone.name}`}
                              layout="fill"
                              objectFit="contain"
                              className="select-none"
                           />
                        </div>
                     ) : (
                        <div className="relative h-[120px] w-full max-w-[280px] md:h-[120px] md:max-w-[260px]">
                           <div className="flex h-full items-center justify-center text-2xl font-bold text-white">
                              GO {zone.name}
                           </div>
                        </div>
                     )}
                     {zone.description && (
                        <p className="mt-6 w-full max-w-[280px] text-sm leading-6 text-white/90 md:max-w-full md:text-justify md:text-base">
                           {zone.description}
                        </p>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default ZonesSection;
