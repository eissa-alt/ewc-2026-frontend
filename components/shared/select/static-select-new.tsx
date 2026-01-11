import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Listbox } from '@headlessui/react';
import { Icon } from '@iconify/react';
import Label from '../forms/label';
import { Translate, useTranslate } from '~/i18n';

export type StaticSelectItem = {
   value: string;
   label: React.ReactNode;
};

type StaticSelectNewProps = {
   options: StaticSelectItem[];
   callBack: (value: StaticSelectItem | null) => void;
   errors?: string | undefined;
   selected_id?: string | null;
   label?: string;
   isRequired?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
   placeholderTranslationId?: string; // Translation ID for placeholder (e.g., 'web:select_sector')
   dropdownRounded?: 'xl' | 'none'; // Dropdown border radius style
};

const StaticSelectNew: React.FC<StaticSelectNewProps> = ({
   options,
   label,
   callBack,
   errors,
   selected_id,
   isRequired = false,
   className,
   disabled = false,
   placeholder,
   placeholderTranslationId,
   dropdownRounded = 'none',
}) => {
   const { translate } = useTranslate();

   // Currently selected option (by value)
   const selectedOption = useMemo(() => {
      if (!selected_id) return null;
      return options.find(o => o.value === selected_id) || null;
   }, [options, selected_id]);

   const resolvedPlaceholder =
      placeholder ||
      (placeholderTranslationId ? translate({ id: placeholderTranslationId }) : null) ||
      'Select...';

   return (
      <div className={classNames(label ? 'row mb-6' : 'relative mb-6 w-full pb-1', className)}>
         {label && (
            <div className={classNames(label ? 'self-center md:col-3' : '')}>
               <Label id="" label={label} isRequired={isRequired} />
            </div>
         )}

         <div className={classNames(label ? 'md:col-9' : '')}>
            <div className="relative">
               <Listbox
                  value={selectedOption}
                  onChange={(val: StaticSelectItem | null) => callBack(val)}
                  disabled={disabled}>
                  <div className="relative">
                     {/* Trigger / "input" */}
                     <Listbox.Button
                        className={classNames(
                           className,
                           errors && '!border-error focus:border-error focus:ring-error',
                           'custom-input block w-full text-white placeholder:text-[#DF1B22] ltr:text-left rtl:text-right',
                           'focus:border-accent focus:outline-none focus:ring focus:ring-accent focus:ring-opacity-50',
                           'rounded-xl px-3 py-2 pr-9',
                           !errors && 'border border-[#495057] bg-[#212529]',
                           disabled &&
                              'disabled:cursor-not-allowed disabled:bg-gray-800 disabled:opacity-50'
                        )}>
                        <span
                           className={classNames(
                              !selectedOption?.label && 'text-[#7F8694]' // ← make placeholder accent color
                           )}>
                           {selectedOption?.label || resolvedPlaceholder}
                        </span>

                        <span className="pointer-events-none absolute inset-y-0 flex items-center text-[#7F8694] ltr:right-0 ltr:pr-3 rtl:left-0 rtl:pl-3">
                           <Icon icon="mdi:chevron-down" className="h-5 w-5" />
                        </span>
                     </Listbox.Button>

                     {/* Dropdown panel */}
                     <Listbox.Options
                        className={classNames(
                           'absolute z-20 mt-1 max-h-60 w-full overflow-auto',
                           dropdownRounded === 'xl'
                              ? 'rounded-xl border border-[#495057] bg-[#495057] text-sm shadow-lg'
                              : 'rounded-none border border-[#495057] bg-[#495057] text-sm shadow-lg'
                        )}>
                        {options.length === 0 ? (
                           <div className="px-4 py-2 text-white">
                              <Translate id="web:no_results" />
                           </div>
                        ) : (
                           options.map(option => (
                              <Listbox.Option
                                 key={option.value}
                                 value={option}
                                 className={({ active, selected }) =>
                                    classNames(
                                       'cursor-pointer select-none px-4 py-2 text-white',
                                       active || selected ? 'bg-accent text-black' : 'bg-[#495057]',
                                       selected ? 'font-medium' : 'font-normal'
                                    )
                                 }>
                                 {option.label}
                              </Listbox.Option>
                           ))
                        )}
                     </Listbox.Options>
                  </div>
               </Listbox>

               {errors && (
                  <p className="absolute left-0 mt-1 text-xs text-red-500" role="alert">
                     {errors}
                  </p>
               )}
            </div>
         </div>
      </div>
   );
};

export default StaticSelectNew;
