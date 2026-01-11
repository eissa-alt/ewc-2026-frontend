import { GetServerSideProps } from 'next';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import useTranslate from '../../../i18n/useTranslate';
import Axios from '~/utils/axios';
import { ParsedUrlQuery } from 'querystring';
// import AlreadyDoneSections from '~/components/complete-data/already-done-sections';
import WringTokenSections from '~/components/complete-data/wrong-token-sections';
// import MissingDataSections from '~/components/complete-data/missing-data-sections';
import ShareSections from '~/components/share/sharebtn-sections';

interface IParams extends ParsedUrlQuery {
   lang: string;
   token: string;
}
interface HomePageProps {
   token: string;
   status: string;
   share_text_en: string | null;
   share_text_ar: string | null;
}
const HomePage = ({ token, status, share_text_en, share_text_ar }: HomePageProps) => {
   const { translate } = useTranslate();

   switch (status) {
      case 'valid':
         return (
            <Fragment>
               <NextSeo
                  title={translate({ id: 'meta:title' })}
                  description={translate({ id: 'meta:desc' })}
                  noindex={true}
                  nofollow={true}
               />
               <ShareSections
                  token={token}
                  shareTextAr={share_text_ar}
                  shareTextEn={share_text_en}
               />
            </Fragment>
         );

      case 'wrong token':
         return (
            <Fragment>
               <NextSeo
                  title={translate({ id: 'meta:title' })}
                  description={translate({ id: 'meta:desc' })}
                  noindex={true}
                  nofollow={true}
               />
               <WringTokenSections />
            </Fragment>
         );
      default:
         return (
            <Fragment>
               <NextSeo
                  title={translate({ id: 'meta:title' })}
                  description={translate({ id: 'meta:desc' })}
                  noindex={true}
                  nofollow={true}
               />
            </Fragment>
         );
   }
};

/*******************************************************************
 *
 *  THIS PAGE IS USING SERVER SIDE RENDERING WITH getServerSideProps
 *
 *******************************************************************/

export const getServerSideProps: GetServerSideProps = async context => {
   // const query = context?.query;
   const { lang, token } = context.params as IParams;

   const { data } = await Axios.get(`verify-share-token/${token}?lang=${lang}`);
   if (data.status !== 'success') {
      return {
         props: {
            token: token || null,
            status: 'wrong token',
         },
      };
   }
   return {
      props: {
         token: token || null,
         status: 'valid',
         share_text_en: data?.share_text_en || '',
         share_text_ar: data?.share_text_ar || '',
      },
   };
};

export default HomePage;
