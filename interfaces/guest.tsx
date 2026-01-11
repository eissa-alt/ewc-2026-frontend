export interface GuestType {
   // step
   id: string;
   gender: string | null;
   title_id: string | null;
   first_name: string | null;
   last_name: string | null;
   company: string | null;
   position_id: string | null;
   position: string | null;
   job_title: string | null;
   country_of_residence: string | null;
   city: string | null;
   email: string | null;
   // phone_code: string | null;
   // phone_code_id: string | null;
   phone: string | null;
   employee_id_number: string | null;
   //extra
   org_size: string | null;
   sector: string | null;
   industry: string | null;
   interests: string | null;
   industry_other: string | null;
   knowing_about_event: string | null;

   // step
   is_saudi: string | null;
   residency_status?: string | null; // for none saudi
   valid_visa?: string | null; // for foreign_national
   document_type: string | null;
   passport_type: string | null;
   saudi_embassy_city: string | null;

   document_number: string | null;
   issue_date?: string | null; // for none saudi
   issue_place?: string | null; // for none saudi
   expiration_date: string | null;
   full_name_on_document: string | null;
   birth_date: string | null;
   birth_city?: string | null; // for none saudi
   nationality: string | null;
   religion: string | null;
   personal_image: string | null;
   personal_image_url?: string | null;
   document_copy: string | null;
   document_copy_url?: string | null;
   visa_copy?: string | null; // for none saudi
   visa_copy_url?: string | null;

   // vaccination_certificate?: string | null;
   // vaccination_certificate_url?: string | null;

   // first_vaccination_type?: string | null;
   // first_vaccination_date?: string | null;

   // second_vaccination_type?: string | null;
   // second_vaccination_date?: string | null;

   // third_vaccination_type?: string | null;
   // third_vaccination_date?: string | null;

   // step
   require_flights?: string | null;
   departure_city_to?: string | null;
   destination_to?: string | null;
   expected_date_of_arrival?: string | null;
   specific_requirements_to?: string | null;
   departure_city_from?: string | null;
   destination_from?: string | null;
   expected_date_of_departure?: string | null;
   specific_requirements_from?: string | null;
   comments?: string | null;
   // flight details for transfer (when require_flights === 'no' and require_transfer === 'yes')
   flight_arrival_time?: string | null;
   flight_arrival_company?: string | null;
   flight_arrival_number?: string | null;
   flight_departure_time?: string | null;
   flight_departure_company?: string | null;
   flight_departure_number?: string | null;
   // step
   require_accommodation?: string | null;
   special_requests?: string | null;
   dietary_requirements?: string | null;
   require_transfer?: string | null;
   check_in_date?: string | null;
   check_out_date?: string | null;

   is_email_verified?: string | null;
   is_phone_verified?: string | null;

   otp_token?: string | null;
   sms_otp_token?: string | null;

   alternative_email: string | null;

   days?: string[] | null;
   terms: string | null;

   // EDGEX Registration Form Fields
   edgex_job_role?: string | null;
   edgex_decision_influence?: string | null;
   edgex_education_levels?: string[] | null;
   edgex_areas_of_interest?: string[] | null;
   edgex_organization_type?: string | null;

   // other
   step: string | null;

   // category_name?: string | null;
   // status_name?: string | null;
   registration_number?: string | null;

   // +1 Guest fields
   // has_plus_one?: string | boolean | null;
   // plus_one_gender: string | null;
   // plus_one_title_id: string | null;
   // plus_one_first_name: string | null;
   // plus_one_last_name: string | null;
   // plus_one_company: string | null;
   // plus_one_job_title?: string | null;
   // plus_one_email?: string | null;
   // plus_one_phone?: string | null;
}
