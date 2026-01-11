// components/forms/PhoneInputV2.tsx
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import PhoneInput2, { CountryData } from 'react-phone-input-2';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'react-phone-input-2/lib/style.css';
import Label from './label';
import ONLY_COUNTRIES from '~/utils/cont-list';
import { useFormContext } from 'react-hook-form'; // <-- add

// built-in Arabic localization file (no overrides)
import ar from 'react-phone-input-2/lang/ar.json';

export type PhoneInputV2Props = {
   label?: React.ReactNode;
   id?: string;
   name?: string;
   value?: string; // E.164 string
   onChange?: (value: string) => void; // emits E.164
   disabled?: boolean;
   placeholder?: string;

   isInline?: boolean; // used only if label exists
   isRequired?: boolean;
   error?: React.ReactNode;
   help?: React.ReactNode;

   defaultCountry?: string; // e.g. 'sa', 'ae', ...
   groupClassName?: string;
   className?: string;

   /** current UI language; controls country-list localization + placeholders */
   lang: string;
};

const PhoneInputV2 = forwardRef<HTMLDivElement, PhoneInputV2Props>(function PhoneInputV2(
   {
      label,
      id = 'phone',
      name = 'phone',
      value = '',
      // onChange,
      disabled = false,
      placeholder = 'Mobile Number',
      isInline = false,
      isRequired = false,
      error,
      help,
      defaultCountry = 'sa',
      groupClassName,
      className,
      lang = 'en',
   },
   _ref
) {
   const hasError = !!error && error !== true;
   const inline = !!label && !!isInline; // only apply inline grid when label exists

   const localization = lang === 'ar' ? ar : undefined;
   const searchPH = lang === 'ar' ? '...ابحث عن دولة' : 'Search country...';
   // inside component
   const { setValue, clearErrors } = useFormContext(); // <-- add

   return (
      <div className={groupClassName || classNames(inline ? 'row' : 'relative mb-5 w-full')}>
         {label && (
            <div className={classNames(inline ? 'self-center md:mb-5 md:col-3' : '')}>
               <Label id={name} isRequired={isRequired} label={label} />
            </div>
         )}

         <div className={classNames(inline ? 'mb-5 md:col-9' : '')}>
            {/* Keep digits LTR; dropdown/flag are styled via CSS */}
            <div
               className={classNames(
                  'ui-phone w-full',
                  hasError && 'is-error',
                  disabled && 'is-disabled',
                  className
               )}
               data-testid="ui-phone"
               dir="ltr">
               <PhoneInput2
                  country={defaultCountry}
                  value={value}
                  // onChange={(_v, _data: CountryData, __, formatted) => {
                  //    const cleaned = (formatted || '').replace(/\s+/g, '');
                  //    const pn = parsePhoneNumberFromString(cleaned);
                  //    onChange?.(pn?.number ?? cleaned); // store canonical E.164
                  // }}
                  onChange={(_v, _country: CountryData, __, formatted) => {
                     const cleaned = (formatted || '').replace(/\s+/g, '');
                     const pn = parsePhoneNumberFromString(cleaned);
                     const e164 = pn?.number ?? cleaned;

                     // treat bare dial code like "+965" as transitional (don’t validate yet)
                     const isBareDial = /^\+\d{1,4}$/.test(e164);

                     // if you’re using useFormContext:
                     // const { setValue, clearErrors } = useFormContext();
                     if (isBareDial) {
                        setValue(name, e164, { shouldValidate: false, shouldDirty: true });
                        clearErrors(name);
                        return;
                     }

                     setValue(name, e164, { shouldValidate: true, shouldDirty: true });
                  }}
                  enableSearch
                  searchPlaceholder={searchPH}
                  onlyCountries={ONLY_COUNTRIES}
                  disabled={disabled}
                  inputClass="ui-phone__input"
                  buttonClass="ui-phone__flag"
                  localization={localization}
                  inputProps={{
                     name,
                     id,
                     autoComplete: 'tel',
                     placeholder,
                  }}
               />
            </div>

            {help && <div className="mt-1 text-xs text-[#7F8694]">{help}</div>}
            {hasError && (
               <div className="absolute text-xs text-error" role="alert">
                  {error}
               </div>
            )}
         </div>
      </div>
   );
});

export default PhoneInputV2;
