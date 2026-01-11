import React, { useMemo } from 'react';
import StaticSelectNew, { StaticSelectItem } from './static-select-new';
import IndustryTypeSelect from '~/data/industry-types-select';

export type Item = StaticSelectItem;

type IndustrySelectNewProps = {
   callBack: (value: Item | null) => void;
   errors?: string | undefined;
   selected_id?: string | null;
   label?: string;
   isRequired?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
};

const IndustrySelectNew: React.FC<IndustrySelectNewProps> = (props) => {
   const options: StaticSelectItem[] = useMemo(() => {
      return IndustryTypeSelect.map(item => ({
         value: item.value,
         label: item.label,
      }));
   }, []);

   return (
      <StaticSelectNew
         {...props}
         options={options}
         placeholderTranslationId="web:select_industry"
         dropdownRounded="none"
      />
   );
};

export default IndustrySelectNew;



