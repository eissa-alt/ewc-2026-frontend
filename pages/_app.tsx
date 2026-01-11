import { AppProps } from 'next/app';
import Layout from '~/components/layout';
import { getLang } from '~/utils/translate';
// import { initGTM } from '~/utils/analytics';
import { useEffect } from 'react';
// import { AuthProvider } from '~/auth';
import { motion } from 'framer-motion';

import { TranslationProvider } from '~/i18n';
import { DefaultSeo } from 'next-seo';
import transConfig from '~/translation.json';
const { languages } = transConfig;

import { NextPageContext, NextComponentType } from 'next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import '../css/tailwind.css';
import '../css/web.css';
import '../css/fonts.css';

import '../css/nprogress.min.css';
import Head from 'next/head';
import Favicon from '~/components/favicon/favicon';

import 'react-day-picker/dist/style.css';
import '../css/day-picker.css';
import '../css/ui-phone.css';

import { Analytics } from '@vercel/analytics/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import SwiperCore, { Pagination, Navigation, Autoplay, Thumbs, FreeMode } from 'swiper';

// import { ThemeProvider } from 'next-themes';
// import { QueryClient, QueryClientProvider } from 'react-query';
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                              NEXTJS IS AWESOME                             */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

interface CustomAppProps extends AppProps {
   Component: NextComponentType<NextPageContext, any> & {
      isMiniHeaderFooterLayout?: boolean;
   };
}

SwiperCore.use([Pagination, Navigation, Autoplay, Thumbs, FreeMode]);

const App = ({ Component, pageProps, router }: CustomAppProps) => {
   /*
    * Make sure to only use it when necessary as this function will run on every page
    * thats why we are using analytics in here
    **/
   // useEffect(() => {
   //    initGTM();
   // }, []);
   /* ---------------------- Application current language ---------------------- */
   const lang = getLang(router);
   // const { user } = useAuth();

   // Manipulating html element for lang and dir attributes
   useEffect(() => {
      const langs = languages as Record<string, string>;
      const dir = langs[lang];
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.body.dir = dir;
   }, [lang]);

   let translations = null;
   // const queryClient = new QueryClient();
   translations = require(`~/translations/${lang}`).default;
   // const { isMiniHeaderFooterLayout, isHomePageLayout } = Component;

   return (
      <GoogleReCaptchaProvider
         language={lang}
         reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || ''}
         scriptProps={{ defer: true }}>
         <TranslationProvider lang={lang} translations={translations}>
            {/* <QueryClientProvider client={queryClient}> */}
            {/* <ThemeProvider enableSystem={true} attribute="class"> */}
            {/* <SocialProfileJsonLd
               type="Organization"
               name={translations.meta['site_name']}
               url={process.env.NEXT_PUBLIC_BASE_URL || ''}
               sameAs={
                  [
                     'https://x.com/sdb_sa', // X (Twitter)
                     'https://instagram.com/sdbbank', // Instagram
                     'https://www.linkedin.com/company/scsb', // LinkedIn
                     'https://www.youtube.com/@sdbank_sa', // YouTube
                     'https://www.tiktok.com/@sdb_sa', // TikTok
                     // Note: Snapchat is not typically included in JSON-LD structured data
                     // 'https://www.snapchat.com/add/sdbbank',
                  ].filter(Boolean) as string[]
               }
            /> */}

            <DefaultSeo
               defaultTitle={translations.meta['site_name']}
               description={translations.meta['desc']}
               canonical={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
               // Removed dangerouslySetAllPagesToNoFollow and dangerouslySetAllPagesToNoIndex
               // to allow homepage indexing. Individual pages can set noindex/nofollow as needed.
               dangerouslySetAllPagesToNoFollow
               dangerouslySetAllPagesToNoIndex
               //todo:
               // twitter={{
               //    cardType: 'summary'
               //    ,
               //    site: '@',
               // }}
               openGraph={{
                  site_name: translations.meta['site_name'],
                  title: translations.meta['title'],
                  description: translations.meta['desc'],
                  locale: lang === 'en' ? 'en_US' : lang === 'ar' ? 'ar_SA' : lang,
                  type: 'website',
                  url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
                  images: [
                     {
                        url: process.env.NEXT_PUBLIC_BASE_URL + `/seo/poster_${lang}.jpg`,
                        alt: translations.meta['site_name'],
                     },
                  ],
               }}
            />
            <Head>
               <meta name="application-name" content={translations.meta['application_name']} />
               <Favicon />
            </Head>
            {/* <AuthProvider afterLoginTo={`/ar`}> */}
            <Layout>
               <motion.div
                  key={router.route}
                  initial="pageInitial"
                  animate="pageAnimate"
                  variants={{
                     pageInitial: {
                        opacity: 0,
                     },
                     pageAnimate: {
                        opacity: 1,
                        transition: {
                           delay: 0.2,
                        },
                     },
                  }}>
                  <Component {...pageProps} />
               </motion.div>
            </Layout>
            {/* </AuthProvider> */}

            {/* ------------------------------- App styling ------------------------------ */}
            {/* this makes sure that main take the full available height of the broweser */}
            <style jsx global>{`
               #__next {
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
               }
               #__next main {
                  flex: 1;
               }
            `}</style>
            {/* </ThemeProvider> */}
            {/* </QueryClientProvider> */}
         </TranslationProvider>
         <Analytics />
      </GoogleReCaptchaProvider>
   );
};

export default App;
