import { GetServerSideProps } from 'next';
import { useTranslate } from '~/i18n';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import Axios from '~/utils/axios';
import { ParsedUrlQuery } from 'querystring';
// import QrCodeSections from '~/components/qr/qr-code-sectios';
import { GuestTicketType } from '~/interfaces/guestTicket';

interface IParams extends ParsedUrlQuery {
   lang: string;
   category: string;
   token: string;
}

type JoinWithTokenProps = {
   guest: GuestTicketType;
   status: string;
};

const JoinWithToken = ({
   // token,
   // guest,
   status,
}: JoinWithTokenProps) => {
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

               {/* <QrCodeSections guest={guest} /> */}
            </Fragment>
         );

      case 'invalid':
         return (
            <Fragment>
               <NextSeo
                  title={translate({ id: 'meta:title' })}
                  description={translate({ id: 'meta:desc' })}
               />

               {/* <WringTokenSections /> */}
            </Fragment>
         );

      default:
         return (
            <Fragment>
               <NextSeo
                  title={translate({ id: 'meta:title' })}
                  description={translate({ id: 'meta:desc' })}
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

   // const { data } = await Axios.get(`verify-code/${category}/${token}?lang=${lang}`);
   // console.log(data.status, 'data');
   // if (data.status !== 'valid') {
   //    return {
   //       redirect: { permanent: false, destination: `/${lang}` },
   //    };
   // }
   const { data } = await Axios.get(`verify-qr-code/${token}?lang=${lang}`);
   if (data.status !== 'success') {
      // if (data.data === 'submitted') {
      //    return {
      //       props: {
      //          token: token || null,
      //          status: 'submitted',
      //       },
      //    };
      // } else {
      //    return {
      //       props: {
      //          token: token || null,
      //          status: 'wrong token',
      //       },
      //    };
      // }
      return {
         props: {
            token: token || null,
            status: 'invalid',
         },
      };
   }
   // console.log('data', data);

   return {
      props: {
         token: token || null,
         guest: data.data as GuestTicketType,
         status: 'valid',
      },
   };
};

export default JoinWithToken;
