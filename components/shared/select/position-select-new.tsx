import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Listbox } from '@headlessui/react';
import { Icon } from '@iconify/react';
import Axios from '~/utils/axios';
import { useRouter } from 'next/router';
import Label from '../forms/label';
import { Translate, useTranslate } from '~/i18n';
import { PositionType } from '~/interfaces/position';

export type Item = {
   value: string;
   label: string;
};

type PositionSelectNewProps = {
   callBack: (value: Item | null) => void;
   errors: string | undefined;
   selected_id?: string | null;
   label?: string;
   isRequired?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
   positions?: PositionType[]; // Optional: if provided, skip API call
   category?: string; // Optional: category/role passed from parent component
};

const PositionSelectNew: React.FC<PositionSelectNewProps> = ({
   label,
   callBack,
   errors,
   selected_id,
   isRequired = false,
   className,
   disabled = false,
   placeholder,
   positions,
   category,
}) => {
   const { lang, translate } = useTranslate();
   const [loading, setLoading] = useState(false);
   const [list, setList] = useState<PositionType[]>([]);
   const router = useRouter();

   // Use category prop if provided, otherwise fall back to router.query
   const role = category || (router.query?.category as string);

   useEffect(() => {
      // If positions are provided as props, use them and skip API call
      if (positions !== undefined) {
         setList(positions || []);
         setLoading(false);
         return;
      }

      // Otherwise, fetch from API
      let mounted = true;
      const fetchData = async () => {
         setLoading(true);
         try {
            const res = await Axios.get(`/positions-select/${role}?lang=${lang}`);
            if (!mounted) return;
            setList(res.data?.data ?? []);
         } catch {
            if (!mounted) return;
            setList([]);
         } finally {
            if (mounted) setLoading(false);
         }
      };
      if (role) {
         fetchData();
      }
      return () => {
         mounted = false;
      };
   }, [lang, role, positions]);

   const options: Item[] = useMemo(() => {
      return (list || []).map(item => ({
         value: item.id,
         label: item.name,
      }));
   }, [list]);

   // Currently selected option (by id)
   const selectedOption = useMemo(() => {
      if (!selected_id) return null;
      return options.find(o => o.value === selected_id) || null;
   }, [options, selected_id]);

   // If the selected id no longer exists, clear it
   // Only clear if options have been loaded (list.length > 0) to avoid clearing during initial load
   useEffect(() => {
      if (selected_id && !selectedOption && !loading && list.length > 0) {
         callBack(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selected_id, selectedOption, loading, list.length]);

   const resolvedPlaceholder =
      placeholder || translate({ id: 'web:select_position' }) || 'Select Position...';

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
                  onChange={(val: Item | null) => callBack(val)}
                  disabled={disabled || loading}>
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
                           (disabled || loading) &&
                              'disabled:cursor-not-allowed disabled:bg-gray-800 disabled:opacity-50'
                        )}>
                        <span
                           className={classNames(
                              !selectedOption?.label && 'text-[#7F8694]' // ← make placeholder accent color
                           )}>
                           {selectedOption?.label ||
                              (loading ? translate({ id: 'web:loading' }) : resolvedPlaceholder)}
                        </span>

                        <span className="pointer-events-none absolute inset-y-0 flex items-center text-[#7F8694] ltr:right-0 ltr:pr-3 rtl:left-0 rtl:pl-3">
                           <Icon icon="mdi:chevron-down" className="h-5 w-5" />
                        </span>
                     </Listbox.Button>

                     {/* Dropdown panel */}
                     {!loading && (
                        <Listbox.Options
                           className={classNames(
                              'absolute z-20 mt-1 max-h-60 w-full overflow-auto',
                              'rounded-none border border-[#495057] bg-[#495057] text-sm shadow-lg'
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
                                          active || selected
                                             ? 'bg-accent text-black'
                                             : 'bg-[#495057]',
                                          selected ? 'font-medium' : 'font-normal'
                                       )
                                    }>
                                    {option.label}
                                 </Listbox.Option>
                              ))
                           )}
                        </Listbox.Options>
                     )}
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

export default PositionSelectNew;
