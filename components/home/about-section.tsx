// components/sections/AboutSection.tsx
import React from 'react';
// import Link from 'next/link';
import { Translate, useTranslate } from '../../i18n';
import Image from '../shared/image'; // your custom Image wrapper
import Timer from './timer';

type Props = {
   onRegisterClick?: () => void;
};

const AboutSection: React.FC<Props> = ({ onRegisterClick }) => {
   const { lang } = useTranslate();
   const icons = {
      location: '/images/shape_1.svg',
      time: '/images/shape_2.svg',
      dates: '/images/shape_3.svg',
   };
   return (
      <section className="bg-primary py-14 md:py-20">
         <div className="container">
            <div className="row items-center">
               <div className="col-12 lg:col-7">
                  <div className="ltr:text-left rtl:text-right">
                     {lang === 'en' ? (
                        <h2 className="mb-6 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                           <Translate id="web:about_heading" />
                        </h2>
                     ) : (
                        <React.Fragment>
                           <h2 className="mb-6 hidden text-3xl font-extrabold leading-tight text-white md:text-5xl">
                              <Translate id="web:about_heading" />
                           </h2>
                           <div className="relative mt-4 mb-4 h-[100px] w-[230px] md:w-[250px]">
                              <Image
                                 src={'/images/about/dont_start_from_zero_white.png'}
                                 alt={`don't start from zero`}
                                 layout="fill"
                                 objectFit="contain"
                                 className="select-none"
                              />
                           </div>
                        </React.Fragment>
                     )}

                     <p className="mb-10 text-lg leading-9 text-white/95 md:text-xl">
                        <Translate id="web:about_paragraph" />
                     </p>

                     <div className="mb-10">
                        <Timer />
                     </div>
                     {/* <Link href="#register">
                        <a className="inline-block rounded-full bg-accent px-8 py-3 text-base font-extrabold text-white shadow-md transition hover:brightness-105 active:scale-95">
                           <Translate id="web:about_cta" />
                        </a>
                     </Link> */}
                     <div className="flex justify-center md:justify-start">
                        <button
                           onClick={onRegisterClick}
                           className="inline-block rounded-full bg-accent px-8 py-3 text-base font-extrabold text-white shadow-md transition hover:brightness-105 active:scale-95">
                           <Translate id="web:about_cta" />
                        </button>
                     </div>
                  </div>
               </div>

               <div className="col-12 mt-10 lg:mt-0 lg:col-5">
                  <div className="flex flex-col gap-8 text-lg ltr:text-left rtl:text-right">
                     {/* Location */}
                     <div className="text-white/90">
                        <div className="flex items-start gap-4">
                           <div className="relative h-7 w-7 shrink-0">
                              <Image
                                 src={icons.location}
                                 alt="location"
                                 layout="fill"
                                 objectFit="contain"
                                 className="select-none"
                              />
                           </div>
                           <div className="leading-7 text-white">
                              <a
                                 href="https://maps.app.goo.gl/KTaNvVWUfG2u1Drz9"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="hover:underline">
                                 <span className="font-bold">
                                    <Translate id="web:about_location_line1" />
                                 </span>

                                 <br />
                                 <Translate id="web:about_location_line2" />
                              </a>
                           </div>
                        </div>
                     </div>

                     {/* Time */}
                     <div className="text-white/90">
                        <div className="flex items-start gap-4">
                           <div className="relative h-7 w-7 shrink-0">
                              <Image
                                 src={icons.time}
                                 alt="time"
                                 layout="fill"
                                 objectFit="contain"
                                 className="select-none"
                              />
                           </div>
                           <div className="font-bold">
                              <div className="mb-1 ">
                                 <Translate id="web:about_time_start" />
                              </div>
                              <div className="">
                                 <Translate id="web:about_time_end" />
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Dates */}
                     <div className="text-white/90">
                        <div className="flex items-start gap-4">
                           <div className="relative h-7 w-7 shrink-0">
                              <Image
                                 src={icons.dates}
                                 alt="dates"
                                 layout="fill"
                                 objectFit="contain"
                                 className="select-none"
                              />
                           </div>
                           <div className="font-bold">
                              <div className="mb-1">
                                 <Translate id="web:about_dates_range" />
                              </div>
                              <div className="">
                                 <Translate id="web:about_dates_month" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default AboutSection;
