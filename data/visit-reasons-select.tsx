import { Translate } from '~/i18n';

const VisitReasonSelect = [
   {
      value: 'association_ngo_organization',
      label: <Translate id="web:association_ngo_organization" />,
   },
   { value: 'education_research', label: <Translate id="web:education_research" /> },
   { value: 'energy_company', label: <Translate id="web:energy_company" /> },
   { value: 'energy_services', label: <Translate id="web:energy_services" /> },
   { value: 'government', label: <Translate id="web:government" /> },
   {
      value: 'infrastructure_logistic_transport',
      label: <Translate id="web:infrastructure_logistic_transport" />,
   },
   { value: 'machinery_equipment', label: <Translate id="web:machinery_equipment" /> },
   { value: 'mining_company', label: <Translate id="web:mining_company" /> },
   { value: 'mining_services_supplier', label: <Translate id="web:mining_services_supplier" /> },
   { value: 'professional_services', label: <Translate id="web:professional_services" /> },
   { value: 'student', label: <Translate id="web:student" /> },
   { value: 'technology', label: <Translate id="web:technology" /> },
   { value: 'other', label: <Translate id="web:other" /> },
];

export default VisitReasonSelect;
