import React from 'react';
import Image from '../shared/image';
import { Translate } from '~/i18n';
import classNames from 'classnames';

interface Sponsor {
   id: number;
   name: string;
   logo_url: string | null;
   order: number;
}

interface SponsorGroup {
   label: {
      id: number;
      name: string;
   } | null;
   sponsors: Sponsor[];
}

interface SponsorRow {
   row: number;
   labels: SponsorGroup[];
}

interface SponsorsSectionProps {
   sponsors: SponsorRow[];
}

const SponsorsSection = ({ sponsors }: SponsorsSectionProps) => {
   if (!sponsors || sponsors.length === 0) {
      return null;
   }

   return (
      <section className="bg-[#EDEAE2] py-12">
         <div className="container text-center">
            <h2 className="mb-10 text-center text-3xl font-extrabold leading-tight text-primary md:text-5xl">
               <Translate id="web:sponsors_heading" />
            </h2>

            {/* Grouped Sponsors by Rows */}
            <div className="mt-10 space-y-14">
               {sponsors.map((sponsorRow, rowIndex) => (
                  <div
                     key={`row-${sponsorRow.row}`}
                     className="flex flex-wrap justify-center gap-x-16 gap-y-10">
                     {sponsorRow.labels.map((group, groupIndex) => (
                        <div
                           key={group.label?.id || `uncategorized-${rowIndex}-${groupIndex}`}
                           className="flex flex-col items-center">
                           {/* Label Title */}
                           {group.label && (
                              <div className="mb-3 text-center">
                                 <div className="text-base font-bold text-primary md:text-lg">
                                    {group.label.name}
                                 </div>
                              </div>
                           )}

                           {/* Sponsors logos */}
                           {group.sponsors && group.sponsors.length > 0 && (
                              <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4">
                                 {group.sponsors.map(s => (
                                    <div
                                       key={s.id}
                                       className={classNames(
                                          'relative',
                                          'h-[30px] w-[70px] md:h-[45px] md:w-[120px]'
                                       )}>
                                       {s.logo_url ? (
                                          <Image
                                             src={s.logo_url}
                                             alt={s.name}
                                             layout="fill"
                                             objectFit="contain"
                                             className="select-none"
                                          />
                                       ) : (
                                          <div className="flex h-full items-center justify-center text-sm font-semibold text-primary md:text-base">
                                             {s.name}
                                          </div>
                                       )}
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default SponsorsSection;
