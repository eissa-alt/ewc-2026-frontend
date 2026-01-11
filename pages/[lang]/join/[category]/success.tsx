// import { GetServerSideProps } from 'next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';
import SuccessSections from '~/components/success/success-sections';
// import ContactSections from '~/components/contact/contact-sections';
import { useTranslate } from '~/i18n';
import Axios from '~/utils/axios';

type SuccessProps = {
   visibility: 'private' | 'public';
   with_share: string;
   share_text_en: string | null;
   share_text_ar: string | null;
   show_in_success_page: string | null;
};

interface IParams extends ParsedUrlQuery {
   lang: string;
   category: string;
}
const Success = ({
   visibility,
   with_share,
   share_text_en,
   share_text_ar,
   show_in_success_page,
}: SuccessProps) => {
   const { translate } = useTranslate();

   return (
      <Fragment>
         <NextSeo
            title={translate({ id: 'meta:title' })}
            description={translate({ id: 'meta:desc' })}
            noindex={true}
            nofollow={true}
         />
         <SuccessSections
            visibility={visibility}
            withShare={with_share === 'yes' ? true : false}
            shareTextEn={share_text_en}
            shareTextAr={share_text_ar}
            showInSuccessPage={show_in_success_page === 'yes' ? true : false}
         />
      </Fragment>
   );
};

/*******************************************************************
 *
 *  THIS PAGE IS USING SERVER SIDE RENDERING WITH getServerSideProps
 *
 *******************************************************************/

export const getServerSideProps: GetServerSideProps = async context => {
   const { lang, category } = context.params as IParams;

   try {
      const { data } = await Axios.get(`categories/visibility/${category}/?lang=${lang}`); //private | public

      return {
         props: {
            visibility: data?.data?.visibility || null,
            with_share: data?.data?.with_share || null,
            share_text_en: data?.data?.share_text_en || null,
            share_text_ar: data?.data?.share_text_ar || null,
            show_in_success_page: data?.data?.show_in_success_page || null,
         },
      };
   } catch (error: any) {
      // If API fails, return default values to prevent page crash
      // The success page will still display but without dynamic features
      return {
         props: {
            visibility: 'public',
            with_share: null,
            share_text_en: null,
            share_text_ar: null,
            show_in_success_page: null,
         },
      };
   }
};
export default Success;
