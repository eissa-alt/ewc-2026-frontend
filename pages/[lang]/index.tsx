import { GetServerSideProps } from 'next';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import useTranslate from '../../i18n/useTranslate';
import HomepageSections from '~/components/home/homepage-sections';
// import { getLanguagesPaths } from '~/utils/translate';
// import Axios from '~/utils/axios';

// interface LandingPageData {
//    speakers: any[];
//    sponsors: any[];
//    zones: any[];
//    titles?: any[];
// }

// interface HomePageProps {
//    landingPageData: LandingPageData;
// }

const HomePage = () => {
   const { translate, lang } = useTranslate();

   return (
      <Fragment>
         <NextSeo
            title={translate({ id: 'meta:title' })}
            description={translate({ id: 'meta:desc' })}
            // noindex={process.env.NEXT_PUBLIC_ENV === 'production' ? false : true}
            // nofollow={process.env.NEXT_PUBLIC_ENV === 'production' ? false : true}
            openGraph={{
               title: translate({ id: 'meta:title' }),
               description: translate({ id: 'meta:desc' }),
               type: 'website',
               locale: lang === 'en' ? 'en_US' : lang === 'ar' ? 'ar_SA' : lang,
            }}
         />
         <HomepageSections />
      </Fragment>
   );
};

/*******************************************************************
 *
 *  THIS PAGE IS USING STATIC SITE GENERATION (SSG) WITH getStaticPaths & getStaticProps
 *
 *******************************************************************/

// export const getStaticPaths: GetStaticPaths = async () => {
//    return {
//       paths: getLanguagesPaths(),
//       fallback: false,
//    };
// };

// export const getStaticProps: GetStaticProps = async context => {
//    try {
//       const lang = (context.params?.lang as string) || 'en';
//       const response = await Axios.get(`/landing-page?lang=${lang}`);
//       const landingPageData = response.data.data || {
//          speakers: [],
//          sponsors: [],
//          zones: [],
//          titles: [],
//       };

//       return {
//          props: {
//             landingPageData,
//          },
//          // Revalidate every 5 minutes (ISR - Incremental Static Regeneration)
//          revalidate: 300,
//       };
//    } catch (err) {
//       console.error('Error fetching landing page data:', err);
//       // Let ISR keep the last successful page
//       // (If a revalidate fails, Next serves the previous version.)
//       throw err;
//    }
// };

/*******************************************************************
 *
 *  THIS PAGE IS USING SERVER SIDE RENDERING WITH getServerSideProps
 *
 *******************************************************************/

export const getServerSideProps: GetServerSideProps = async () => {
   // It's better to use getServerSideProps than statically generating pages for not found :O
   return {
      props: {},
   };
   // const { lang } = context.params as IParams;

   // return {
   //    redirect: { permanent: false, destination: `/${lang}/registration-closed` },
   // };
};
export default HomePage;
