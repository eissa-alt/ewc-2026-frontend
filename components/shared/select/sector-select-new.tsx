import React, { useMemo } from 'react';
import StaticSelectNew, { StaticSelectItem } from './static-select-new';
import SectorTypeSelect from '~/data/sector-types-select';

export type Item = StaticSelectItem;

type SectorSelectNewProps = {
   callBack: (value: Item | null) => void;
   errors?: string | undefined;
   selected_id?: string | null;
   label?: string;
   isRequired?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
};

const SectorSelectNew: React.FC<SectorSelectNewProps> = (props) => {
   const options: StaticSelectItem[] = useMemo(() => {
      return SectorTypeSelect.map(item => ({
         value: item.value,
         label: item.label,
      }));
   }, []);

   return (
      <StaticSelectNew
         {...props}
         options={options}
         placeholderTranslationId="web:select_sector"
         dropdownRounded="xl"
      />
   );
};

export default SectorSelectNew;



