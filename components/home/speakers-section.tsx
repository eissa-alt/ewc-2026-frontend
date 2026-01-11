import React from 'react';
import { Translate, useTranslate } from '../../i18n';
import SpeakersSwiper from './speakers-swiper';
import SpeakerLabel from './speaker-label';
import NextLink from '../../i18n/link';

interface Speaker {
   id: number;
   name: string;
   title: string | null;
   job_title: string | null;
   photo_url: string | null;
   color: string | null;
   order: number;
}

interface SpeakerGroup {
   label: {
      id: number;
      name: string;
   } | null;
   speakers: Speaker[];
}

interface SpeakersSectionProps {
   speakers: SpeakerGroup[];
}

const SpeakersSection: React.FC<SpeakersSectionProps> = ({ speakers }) => {
   const { lang } = useTranslate();

   if (!speakers || speakers.length === 0) {
      return null;
   }

   return (
      <section className="bg-primary py-14 md:py-20">
         <div className="container">
            {/* Title */}
            <h2 className="text-center text-3xl font-extrabold text-white md:text-5xl">
               <Translate id="web:speakers_heading" />
            </h2>

            {/* Grouped Speakers */}
            <div className="mt-10">
               {speakers.map((group, index) => (
                  <div key={group.label?.id || `uncategorized-${index}`} className="mb-10">
                     {group.label && (
                        <SpeakerLabel
                           text={group.label.name}
                           iconSrc="/images/speakers/flower.png"
                        />
                     )}
                     {group.speakers && group.speakers.length > 0 && (
                        <SpeakersSwiper
                           speakers={group.speakers}
                           swiperId={group.label?.id?.toString() || `swiper-${index}`}
                        />
                     )}
                  </div>
               ))}
            </div>

            {/* Link to Speakers Page */}
            <div className="mt-10 text-center">
               <NextLink
                  href="/speakers"
                  className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-secondary transition-colors hover:bg-gray-100">
                  {lang === 'en' ? 'View All Speakers' : 'عرض جميع المتحدثين'}
               </NextLink>
            </div>
         </div>
      </section>
   );
};

export default SpeakersSection;
