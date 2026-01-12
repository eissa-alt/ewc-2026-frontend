import { GetServerSideProps } from 'next';
import { useTranslate } from '~/i18n';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import Axios from '~/utils/axios';
import { ParsedUrlQuery } from 'querystring';
import JoinFormWrapper from '~/components/join/forms/form-wrapper';

interface IParams extends ParsedUrlQuery {
   lang: string;
   category: string;
   token: string;
}

type JoinWithTokenProps = {
   category: string;
   token: string;
   email: string;
   first_name: string;
   last_name: string;
   company: string;
   position: string;
   phone: string | null;
   title_id: string | null;
   prefilldata: string;
   lock_data: string;
   form_shape: string | null;
   optional_fields: string[];
   mandatory_fields: string[];
   visa_status_types: string[];
   with_otp: string;
   with_sms_otp: string;
   with_alternative_email: string;
};

const JoinWithToken = ({
   category,
   token,
   email,
   first_name,
   last_name,
   company,
   position,
   phone,
   title_id,
   prefilldata,
   lock_data,
   form_shape,
   optional_fields,
   mandatory_fields,
   visa_status_types,
   with_otp,
   with_sms_otp,
   with_alternative_email,
}: JoinWithTokenProps) => {
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
         <JoinFormWrapper
            category={category}
            guestEmail={email}
            guestFirstName={first_name}
            guestLastName={last_name}
            guestCompany={company}
            guestPosition={position}
            guestPhone={phone}
            guestTitleId={title_id}
            prefilldata={prefilldata}
            lock_data={lock_data}
            optionalFields={optional_fields}
            residencyStatusTypes={visa_status_types}
            mandatoryFields={mandatory_fields}
            token={token}
            // withToken={true}
            form_shape={form_shape}
            withOtp={with_otp === 'yes' ? true : false}
            withSmsOtp={with_sms_otp === 'yes' ? true : false}
            withAlternativeEmail={with_alternative_email === 'yes' ? true : false}
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
   const query = context?.query;
   const { lang, category, token } = context.params as IParams;

   try {
      const { data } = await Axios.get(`verify-invitation/${category}/${token}?lang=${lang}`);
      // console.log(data.status, 'data');
      if (data.status !== 'valid') {
         return {
            redirect: { permanent: false, destination: `/${lang}` },
         };
      }
      // console.log(data, 'data');

      return {
         props: {
            category: query.category || null,
            token: query.token || null,
            first_name: data.first_name || null,
            last_name: data.last_name || null,
            email: data.email || null,
            company: data.company || null,
            position: data.position || null,
            phone: data.phone || null,
            title_id: data.title_id || null,
            prefilldata: data.prefilldata || null,
            lock_data: data.lock_data || null,
            form_shape: data.form_shape || null,
            optional_fields: data.optional_fields || null,
            mandatory_fields: data.mandatory_fields || null,
            visa_status_types: data.visa_status_types || null,
            with_otp: data.with_otp || null,
            with_sms_otp: data.with_sms_otp || null,
            with_alternative_email: data.with_alternative_email || null,
         },
      };
   } catch (error) {
      console.error('Error fetching invitation data:', error);
      return {
         redirect: { permanent: false, destination: `/${lang}` },
      };
   }

   // const { lang } = context.params as IParams;

   // return {
   //    redirect: { permanent: false, destination: `/${lang}/registration-closed` },
   // };
};

export default JoinWithToken;
