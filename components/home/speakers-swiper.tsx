// components/swipers/SpeakersSwiper.tsx
import React, { useEffect, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { SwiperOptions } from 'swiper';
import Image from '../shared/image';
import classNames from 'classnames';
import { useTranslate } from '~/i18n';

interface Speaker {
   id: number;
   name: string;
   title: string | null;
   job_title: string | null;
   photo_url: string | null;
   color: string | null;
   order: number;
}

interface SpeakersSwiperProps {
   speakers: Speaker[];
   swiperId?: string; // Optional unique ID for this swiper instance
}

const SpeakersSwiper: React.FC<SpeakersSwiperProps> = ({ speakers, swiperId }) => {
   const { lang } = useTranslate();
   // Generate a unique ID for this swiper instance if not provided
   const uniqueIdRef = useRef<string>(
      swiperId || `speakers-swiper-${Math.random().toString(36).substr(2, 9)}`
   );
   const uniqueId = uniqueIdRef.current;

   // Generate unique class names based on the unique ID
   const paginationClasses = useMemo(() => {
      const id = uniqueId.replace(/[^a-zA-Z0-9]/g, '-');
      return {
         container: `speakers-swiper-pagination-${id}`,
         bullet: `speakers-swiper-pagination-${id}-bullet`,
         bulletActive: `speakers-swiper-pagination-${id}-bullet-active`,
      };
   }, [uniqueId]);

   interface BreakPoints {
      [ratio: string]: SwiperOptions;
      [width: number]: SwiperOptions;
   }
   const breakpoints: BreakPoints = {
      768: { slidesPerView: 4, spaceBetween: 5 },
   };

   const swiperRef = useRef<any>(null); // Ref for Swiper instance
   useEffect(() => {
      if (swiperRef.current?.swiper) {
         swiperRef.current.swiper.changeLanguageDirection(lang === 'en' ? 'ltr' : 'rtl');
      }
   }, [lang]);

   if (!speakers || speakers.length === 0) {
      return null;
   }

   return (
      <div className="relative py-5">
         <Swiper
            ref={swiperRef} // Attach the Swiper instance to the ref
            breakpoints={breakpoints}
            slidesPerView={1}
            spaceBetween={5}
            speed={500}
            autoplay={false}
            pagination={{
               el: `.${paginationClasses.container}`,
               clickable: true,
               bulletClass: paginationClasses.bullet,
               bulletActiveClass: paginationClasses.bulletActive,
            }}
            className="h-full">
            {speakers.map((s, idx) => (
               <SwiperSlide key={idx}>
                  <div className="flex justify-center">
                     <div
                        className={classNames(
                           'relative h-[360px] w-full ',
                           'bg-contain bg-center bg-no-repeat',
                           {
                              'bg-shape-violet-en': s.color === 'violet' && lang === 'en',
                              'bg-shape-violet-ar': s.color === 'violet' && lang === 'ar',
                              'bg-shape-orange-en': s.color === 'orange' && lang === 'en',
                              'bg-shape-orange-ar': s.color === 'orange' && lang === 'ar',
                              'bg-shape-green-en': s.color === 'green' && lang === 'en',
                              'bg-shape-green-ar': s.color === 'green' && lang === 'ar',
                              'bg-shape-beige-en': s.color === 'beige' && lang === 'en',
                              'bg-shape-beige-ar': s.color === 'beige' && lang === 'ar',
                           }
                        )}>
                        {s.photo_url && (
                           <Image
                              src={s.photo_url}
                              alt={s.name}
                              layout="fill"
                              objectFit="contain"
                           />
                        )}

                        <div
                           className={classNames('absolute bottom-0 left-0 right-0', {
                              'bg-[#bfaed5]': s.color === 'violet',
                              'bg-[#fdc99b]': s.color === 'orange',
                              'bg-[#68c8c7]': s.color === 'green',
                              'bg-[#e9e5dd]': s.color === 'beige',
                           })}>
                           <div className="flex h-full min-h-[92px] flex-col justify-center py-2">
                              {s.title && (
                                 <div className="px-5 text-center text-xs font-medium text-gray-700">
                                    {s.title}
                                 </div>
                              )}
                              <div className="text px-5 text-center text-sm font-semibold text-gray-900">
                                 {s.name}
                              </div>
                              {s.job_title && (
                                 <div className="sm px-5 text-center text-xs text-gray-600">
                                    {s.job_title}
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
         {/* Pagination bullets container (like your logos slider) */}
         <div
            className={`${paginationClasses.container} my-6 space-x-3 text-center rtl:space-x-reverse`}></div>
         {/* Dynamic styles for this swiper's pagination */}
         <style
            dangerouslySetInnerHTML={{
               __html: `
            .${paginationClasses.bullet} {
               border: 1px solid white;
               height: 10px;
               width: 10px;
               border-radius: 50%;
               display: inline-block;
               cursor: pointer;
            }
            .${paginationClasses.bulletActive} {
               background-color: rgb(209, 207, 207);
            }
         `,
            }}
         />
      </div>
   );
};

export default SpeakersSwiper;
