import { GetServerSideProps } from 'next';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import useTranslate from '../../i18n/useTranslate';

import RegisterClosed from '~/components/registration-closed/registration-closed-sections';

const HomePage = () => {
   const { translate } = useTranslate();

   return (
      <Fragment>
         <NextSeo
            title={translate({ id: 'meta:title' })}
            description={translate({ id: 'meta:desc' })}
            noindex={true}
            nofollow={true}
         />
         <RegisterClosed />
      </Fragment>
   );
};

/*******************************************************************
 *
 *  THIS PAGE IS USING SERVER SIDE RENDERING WITH getServerSideProps
 *
 *******************************************************************/

export const getServerSideProps: GetServerSideProps = async () => {
   // It's better to use getServerSideProps than statically generating pages for not found :O
   // const query = context?.query;

   return {
      props: {},
   };
};
export default HomePage;
