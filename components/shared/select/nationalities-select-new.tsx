import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Combobox } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { ClassicSpinner } from 'react-spinners-kit';
import { Translate, useTranslate } from '~/i18n';
import Axios from '~/utils/axios';
import Label from '../forms/label';

type Item = { value: string; label: string; raw?: any };

type NationalitiesSelectNewProps = {
   callBack: (value: Item | null) => void;
   errors?: string;
   selected_id?: string | null;
   label?: string;
   isRequired?: boolean;
   isPhoneCode?: boolean;
   countries?: any[]; // optional: pass to skip API
   className?: string;
   disabled?: boolean;
   placeholder?: string;
};

const NationalitiesSelectNew: React.FC<NationalitiesSelectNewProps> = ({
   label,
   callBack,
   errors,
   selected_id,
   isRequired,
   isPhoneCode,
   countries: countriesProp,
   className,
   disabled = false,
   placeholder,
}) => {
   const { lang, translate } = useTranslate();
   const [fetchLoading, setFetchLoading] = useState(false);
   const [countries, setCountries] = useState<any[]>(countriesProp || []);
   const [query, setQuery] = useState('');

   // fetch if not provided
   useEffect(() => {
      let mounted = true;
      const fetchData = async () => {
         if (countriesProp?.length) {
            setCountries(countriesProp);
            return;
         }
         setFetchLoading(true);
         try {
            const response = await Axios.get(`/countries-select?lang=${lang}`);
            if (!mounted) return;
            setCountries(response.data?.data ?? []);
         } catch {
            if (!mounted) return;
            setCountries([]);
         } finally {
            if (mounted) setFetchLoading(false);
         }
      };
      fetchData();
      return () => {
         mounted = false;
      };
   }, [lang, countriesProp]);

   const options: Item[] = useMemo(
      () =>
         (countries || []).map((c: any) => ({
            value: c.id,
            label: `${c.name}${isPhoneCode ? ` (+${c.phone_code})` : ''}`,
            raw: c,
         })),
      [countries, isPhoneCode]
   );

   const selectedOption = useMemo(
      () => (selected_id ? options.find(o => o.value === selected_id) || null : null),
      [options, selected_id]
   );

   // filter by name (and phone code if included)
   const filtered = useMemo(() => {
      if (!query.trim()) return options;
      const q = query.toLowerCase();
      return options.filter(o => {
         const nameMatch = o.raw?.name?.toLowerCase().includes(q);
         const codeMatch = isPhoneCode
            ? String(o.raw?.phone_code || '')
                 .toLowerCase()
                 .includes(q.replace('+', ''))
            : false;
         return nameMatch || codeMatch;
      });
   }, [options, query, isPhoneCode]);

   // clear if selected becomes invalid
   // Only clear if options have been loaded (countries.length > 0) to avoid clearing during initial load
   useEffect(() => {
      if (selected_id && !selectedOption && !fetchLoading && countries.length > 0) {
         callBack(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selected_id, selectedOption, fetchLoading, countries.length]);

   const resolvedPlaceholder =
      placeholder || translate({ id: 'web:select_country' }) || 'Select country';

   return (
      <div className={classNames(label ? 'row mb-5' : 'relative mb-5 w-full', className)}>
         {label && (
            <div className={classNames(label ? 'self-center md:mb-5 md:col-3' : '')}>
               <Label id="" label={label} isRequired={isRequired} />
            </div>
         )}

         <div className={classNames(label ? 'md:col-9' : '')}>
            {fetchLoading ? (
               <div className="custom-input mb-5 block w-full select-none rounded-xl border border-[#495057] bg-[#212529] px-3 py-2">
                  <div className="flex items-center">
                     <span className="text-sm text-[#7F8694]">
                        <Translate id="web:loading" />
                     </span>
                     <span className="ltr:ml-3 rtl:mr-3">
                        <ClassicSpinner color="#bebebe" size={18} />
                     </span>
                  </div>
               </div>
            ) : (
               <Combobox
                  value={selectedOption}
                  onChange={(val: Item | null) => callBack(val)}
                  disabled={disabled}>
                  <div className="relative">
                     {/* SINGLE source of border + error + focus */}
                     <div
                        className={classNames(
                           'relative w-full rounded-xl',
                           'focus-within:ring focus-within:ring-opacity-50',
                           errors
                              ? 'border border-error focus-within:ring-error'
                              : 'border border-[#495057]  focus-within:border-accent focus-within:ring-accent'
                        )}>
                        <Combobox.Input
                           displayValue={(item: Item) => item?.label || ''}
                           onChange={e => setQuery(e.target.value)}
                           className={classNames(
                              // input styles without borders
                              'block w-full rounded-xl px-3 py-2 pr-9',
                              'bg-transparent outline-none',
                              'text-white placeholder:text-[#7F8694]',
                              // remove any inner ring/border
                              'border-none focus:ring-0'
                           )}
                           placeholder={selectedOption ? undefined : resolvedPlaceholder}
                        />

                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#7F8694]">
                           <Icon icon="mdi:chevron-down" className="h-5 w-5" />
                        </Combobox.Button>
                     </div>

                     <Combobox.Options
                        className={classNames(
                           'absolute z-20 mt-1 max-h-60 w-full overflow-auto',
                           'rounded-xl border border-[#495057] bg-[#495057] text-sm shadow-lg'
                        )}>
                        {filtered.length === 0 ? (
                           <div className="px-4 py-2 text-white">
                              <Translate id="web:no_results" />
                           </div>
                        ) : (
                           filtered.map(option => (
                              <Combobox.Option
                                 key={option.value}
                                 value={option}
                                 className={({ active }) =>
                                    classNames(
                                       'cursor-pointer select-none px-4 py-2 text-white',
                                       active ? 'bg-accent text-black' : 'bg-[#495057]'
                                    )
                                 }>
                                 {option.label}
                              </Combobox.Option>
                           ))
                        )}
                     </Combobox.Options>
                  </div>
               </Combobox>
            )}

            {errors && (
               <p className="mt-1 text-xs text-red-500" role="alert">
                  {errors}
               </p>
            )}
         </div>
      </div>
   );
};

export default NationalitiesSelectNew;
