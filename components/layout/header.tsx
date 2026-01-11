import React from 'react';
import LangSwitcher from '../shared/langSwitcher';
import NProgress from 'nprogress';
import Router from 'next/router';
import useTranslate from '../../i18n/useTranslate';
import Image from '../shared/image';
// import Image from '../shared/image';

const MiniHeader = () => {
   NProgress.configure({
      showSpinner: false,
   });
   Router.events.on('routeChangeStart', () => {
      NProgress.start();
   });
   Router.events.on('routeChangeComplete', () => NProgress.done());
   Router.events.on('routeChangeError', () => NProgress.done());

   const { lang } = useTranslate();

   return (
      <header>
         <div className="container relative z-20 md:px-12">
            <div className="row py-8">
               <div className="col-6 self-center">
                  {/* <a
                     href={`https://esportsworldcup.com/${lang}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-block"> */}
                  <div className="h-[60px] w-[70px] sm:h-[70px] sm:w-[200px]">
                     <Image
                        src={`/images/logo_white.png`}
                        alt="SSC logo"
                        // width="150"
                        // height="71"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                     />
                  </div>
                  {/* <div className="">
                        <Image
                           src={`/images/organized_by_logo_${lang}_2.png`}
                           height="20px"
                           width="100px"
                           alt="about-img"
                           layout="responsive"
                           className="h-[20px] w-[100px]"
                           objectFit="contain"
                        />
                     </div> */}
                  {/* </a> */}
               </div>
               <div className="col-6 self-center ltr:text-right rtl:text-left">
                  <ul className="">
                     <li className="my-auto">
                        {lang !== 'en' ? (
                           <LangSwitcher href="/en" text="English" />
                        ) : (
                           <LangSwitcher href="/ar" text="عربي" />
                        )}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </header>
   );
};

export default MiniHeader;
