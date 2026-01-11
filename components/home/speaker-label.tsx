import React from 'react';
import Image from '../shared/image';
import classNames from 'classnames';

const SVG_PATH_LTR =
   'M437.46,0c-8.42,0-16.37,3.27-22.4,9.22-5.53,5.45-12.74,8.18-19.94,8.18-7.21,0-14.41-2.73-19.94-8.18C369.16,3.27,361.21,0,352.79,0H31.92C14.32,0,0,14.32,0,31.91c0,17.6,14.32,31.92,31.92,31.92h320.87c8.42,0,16.37-3.27,22.4-9.22,5.53-5.45,12.74-8.18,19.94-8.18,7.21,0,14.41,2.73,19.94,8.18,6.02,5.94,13.97,9.21,22.39,9.21,17.6,0,31.92-14.32,31.92-31.91,0-17.6-14.32-31.92-31.92-31.92h0Z';

const SVG_PATH_RTL =
   'M32.37,64.73c8.54,0,16.6-3.32,22.71-9.35,5.61-5.53,12.92-8.3,20.22-8.3,7.31,0,14.62,2.77,20.23,8.3,6.11,6.03,14.17,9.34,22.71,9.34h325.41c17.85,0,32.37-14.52,32.37-32.37C476.02,14.52,461.5,0,443.65,0H118.24c-8.54,0-16.6,3.32-22.71,9.35-5.61,5.53-12.92,8.3-20.22,8.3-7.31,0-14.62-2.77-20.23-8.3C48.98,3.32,40.91,0,32.37,0,14.52,0,0,14.52,0,32.37c0,17.85,14.52,32.37,32.37,32.37h0Z';

type SpeakerLabelProps = {
   text: string;
   iconSrc?: string;
   className?: string;
};

const SpeakerLabel: React.FC<SpeakerLabelProps> = ({ text, iconSrc, className = '' }) => {
   return (
      <div
         className={classNames(
            'relative inline-block h-[40px] w-[300px] sm:w-[315px]', // width can be overridden from parent
            className
         )}
         style={{ lineHeight: 0 }}>
         {/* LTR shape */}
         <svg
            className="absolute inset-0 h-full w-full ltr:block rtl:hidden"
            viewBox="0 0 469.39 63.83"
            preserveAspectRatio="none"
            aria-hidden="true">
            <path d={SVG_PATH_LTR} fill="#002f6c" />
         </svg>

         {/* RTL shape */}
         <svg
            className="absolute inset-0 h-full w-full ltr:hidden rtl:block"
            viewBox="0 0 476.02 64.73"
            preserveAspectRatio="none"
            aria-hidden="true">
            <path d={SVG_PATH_RTL} fill="#002f6c" />
         </svg>

         {/* content */}
         <div
            className={classNames(
               'relative z-10 flex h-[40px] w-full items-center gap-2 text-white',
               // keep content away from the curved side
               'ltr:pl-6 ltr:pr-20',
               'rtl:pl-20 rtl:pr-6'
            )}>
            {iconSrc && (
               <span className="absolute h-6 w-6 shrink-0 ltr:right-2 rtl:left-2 md:h-7 md:w-7">
                  <Image src={iconSrc} alt="" layout="fill" objectFit="contain" />
               </span>
            )}
            <span className="truncate text-base font-semibold sm:text-lg">{text}</span>
         </div>
      </div>
   );
};

export default SpeakerLabel;
