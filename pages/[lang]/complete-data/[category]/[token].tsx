import { GetServerSideProps } from 'next';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import useTranslate from '../../../../i18n/useTranslate';
import Axios from '~/utils/axios';
import { ParsedUrlQuery } from 'querystring';
import AlreadyDoneSections from '~/components/complete-data/already-done-sections';
import WringTokenSections from '~/components/complete-data/wrong-token-sections';
import MissingDataSections from '~/components/complete-data/missing-data-sections';
import { GuestType } from '~/interfaces/guest';

interface IParams extends ParsedUrlQuery {
   lang: string;
   token: string;
}
interface HomePageProps {
   token: string;
   status: string;
   guest: GuestType;
}
const HomePage = ({ status, token, guest }: HomePageProps) => {
   const { translate } = useTranslate();

   console.log(guest, '');
   console.log(guest, '');
   console.log(token, 'token');

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
               <MissingDataSections guestData={guest} token={token} />
            </Fragment>
         );

      case 'submitted':
         return (
            <Fragment>
               <NextSeo
                  title={translate({ id: 'meta:title' })}
                  description={translate({ id: 'meta:desc' })}
                  noindex={true}
                  nofollow={true}
               />
               <AlreadyDoneSections />
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

   const { data } = await Axios.get(`verify-status-token/${token}?lang=${lang}`);
   if (data.status !== 'success') {
      if (data.submitted === 'submitted') {
         return {
            props: {
               token: token || null,
               status: 'submitted',
            },
         };
      } else {
         return {
            props: {
               token: token || null,
               status: 'wrong token',
            },
         };
      }
   }
   return {
      props: {
         token: token || null,
         status: 'valid',
         guest: data.guest || null,
      },
   };
};

export default HomePage;
