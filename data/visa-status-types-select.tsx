import { Translate } from '~/i18n';

const VisaStatusTypeSelect = [
   { value: 'valid_visa', label: <Translate id="web:valid_visa" /> },
   { value: 'iqama', label: <Translate id="web:iqama" /> },
   { value: 'need_visa', label: <Translate id="web:need_visa" /> },
   { value: 'gcc', label: <Translate id="web:gcc" /> },
];

export default VisaStatusTypeSelect;
