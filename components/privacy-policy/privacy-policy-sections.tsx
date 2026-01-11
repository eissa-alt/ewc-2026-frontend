import { Translate } from '~/i18n';
import React from 'react';

/******************************************************************
 *
 *  PRIVACY POLICY COMPONENT WITH SUBSECTIONS
 *
 ******************************************************************/

const PrivacyPolicySections = () => {
   // const { lang } = useTranslate();
   return (
      <section className="py-12 md:py-20">
         <div className="container">
            <div className="row">
               <div className="col-12 md:col-10 md:offset-1">
                  {/* Main Title */}
                  <div className="mb-8 text-center">
                     <h1 className="text-3xl font-bold text-secondary md:text-4xl">
                        <Translate id="meta:privacy_policy_title" />
                     </h1>
                     <p className="mt-4 text-gray-600">
                        <Translate id="web:privacy_policy_last_updated" />
                     </p>
                  </div>

                  {/* Introduction */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_intro_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_intro_content" />
                     </p>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_intro_contact" />
                     </p>
                  </div>

                  {/* What we collect */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_first_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_first_intro" />
                     </p>
                     <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_first_subtitle" />
                     </h3>
                     <ul className="ml-6 list-disc space-y-2 text-gray-700">
                        <li>
                           <Translate id="web:privacy_policy_first_item1" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item2" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item3" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item4" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item5" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item6" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item7" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item8" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item9" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item10" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item11" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item12" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_item13" />
                        </li>
                     </ul>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_first_categories_title" />
                     </h3>
                     <ul className="ml-6 list-disc space-y-2 text-gray-700">
                        <li>
                           <Translate id="web:privacy_policy_first_categories_item1" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_categories_item2" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_first_categories_item3" />
                        </li>
                     </ul>
                     <p className="mt-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_first_collection_note" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_sensitive_title" />
                     </h3>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_sensitive_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_third_party_title" />
                     </h3>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_third_party_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_aggregated_title" />
                     </h3>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_aggregated_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_children_title" />
                     </h3>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_children_content" />
                     </p>
                  </div>

                  {/* How and why personal data is used */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_second_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_intro" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_event_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_event_content" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_event_sharing" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_event_photos" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_event_badges" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_event_badge_scanning" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_event_virtual" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_marketing_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_marketing_content" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_marketing_sms" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_marketing_partners" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_sales_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_sales_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_call_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_call_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_gamification_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_gamification_intro" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_gamification_content" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_gamification_sharing" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_social_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_social_content" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_social_presence" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_surveys_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_surveys_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_analytics_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_analytics_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_website_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_website_content" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_website_location" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_website_pixel" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_website_subscribe" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_enquiries_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_enquiries_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_automated_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_automated_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_second_legal_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_second_legal_content" />
                     </p>
                  </div>

                  {/* Legal bases for processing */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_third_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_third_content" />
                     </p>
                     <ul className="ml-6 list-disc space-y-2 text-gray-700">
                        <li>
                           <Translate id="web:privacy_policy_third_item1" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_third_item2" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_third_item3" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_third_item4" />
                        </li>
                     </ul>
                  </div>

                  {/* How we protect personal information */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_fourth_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_fourth_intro" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_fourth_content" />
                     </p>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_fourth_transmission" />
                     </p>
                  </div>

                  {/* International transfer */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_fifth_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_fifth_intro" />
                     </p>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_fifth_content" />
                     </p>
                  </div>

                  {/* Cookies */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_sixth_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_sixth_intro" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_sixth_what" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_sixth_types" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_sixth_first_third" />
                     </p>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_sixth_managing" />
                     </p>
                  </div>

                  {/* Who personal information is shared with */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_seventh_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_intro" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_seventh_service_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_service_content" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_service_chat" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_seventh_organisations_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_organisations_content" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_organisations_virtual" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_organisations_marketing" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_seventh_business_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_business_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_seventh_legal_title" />
                     </h3>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_legal_content" />
                     </p>
                     <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                        <Translate id="web:privacy_policy_seventh_links_title" />
                     </h3>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_seventh_links_content" />
                     </p>
                  </div>

                  {/* Storage and Destruction */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_eighth_title" />
                     </h2>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_eighth_content" />
                     </p>
                  </div>

                  {/* Your rights */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_ninth_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_ninth_intro" />
                     </p>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_ninth_content" />
                     </p>
                     <ul className="ml-6 list-disc space-y-2 text-gray-700">
                        <li>
                           <Translate id="web:privacy_policy_ninth_item1" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_ninth_item2" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_ninth_item3" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_ninth_item4" />
                        </li>
                        <li>
                           <Translate id="web:privacy_policy_ninth_item5" />
                        </li>
                     </ul>
                     <p className="mt-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_ninth_restrictions" />
                     </p>
                     <p className="mt-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_ninth_eu" />
                     </p>
                     <p className="mt-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_ninth_contact" />
                     </p>
                  </div>

                  {/* Updating your information and marketing preferences */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_tenth_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_tenth_intro" />
                     </p>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_tenth_content" />
                     </p>
                  </div>

                  {/* Contacting us */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_eleventh_title" />
                     </h2>
                     <p className="mb-4 leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_eleventh_content" />
                     </p>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_eleventh_complaint" />
                     </p>
                  </div>

                  {/* Changes to this Privacy Notice */}
                  <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                     <h2 className="mb-4 text-2xl font-semibold text-primary">
                        <Translate id="web:privacy_policy_twelfth_title" />
                     </h2>
                     <p className="leading-relaxed text-gray-700">
                        <Translate id="web:privacy_policy_twelfth_content" />
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default PrivacyPolicySections;
