import React, { useMemo } from 'react';
import StaticSelectNew, { StaticSelectItem } from './static-select-new';
import KnowingAboutEventTypeSelect from '~/data/knowing-about-event-types-select';

export type Item = StaticSelectItem;

type KnowingAboutEventSelectNewProps = {
   callBack: (value: Item | null) => void;
   errors?: string | undefined;
   selected_id?: string | null;
   label?: string;
   isRequired?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
};

const KnowingAboutEventSelectNew: React.FC<KnowingAboutEventSelectNewProps> = (props) => {
   const options: StaticSelectItem[] = useMemo(() => {
      return KnowingAboutEventTypeSelect.map(item => ({
         value: item.value,
         label: item.label,
      }));
   }, []);

   return (
      <StaticSelectNew
         {...props}
         options={options}
         placeholderTranslationId="web:knowing_about_event"
         dropdownRounded="none"
      />
   );
};

export default KnowingAboutEventSelectNew;



