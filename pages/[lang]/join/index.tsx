import { GetServerSideProps } from 'next';
import { useTranslate } from '~/i18n';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import ParticipationJoinFormWrapper from '~/components/join/forms/participation-type-wrapper';

// interface IParams extends ParsedUrlQuery {
//    lang: string;
//    category: string;
//    token: string;
// }

// type JoinWithTokenProps = {};

const JoinWithToken = () => {
   const { translate } = useTranslate();
   // console.log(with_otp, 'with_otp');

   return (
      <Fragment>
         <NextSeo
            title={translate({ id: 'meta:title' })}
            description={translate({ id: 'meta:desc' })}
            noindex={true}
            nofollow={true}
         />
         <ParticipationJoinFormWrapper />
      </Fragment>
   );
};

/*******************************************************************
 *
 *  THIS PAGE IS USING SERVER SIDE RENDERING WITH getServerSideProps
 *
 *******************************************************************/

export const getServerSideProps: GetServerSideProps = async () => {
   // console.log(data, 'data');

   return {
      props: {},
   };

   // const { lang } = context.params as IParams;

   // return {
   //    redirect: { permanent: false, destination: `/${lang}/registration-closed` },
   // };
};

export default JoinWithToken;
