import { TitleType } from '~/interfaces/title';

export const TITLES_STAGING: TitleType[] = [
   {
      id: 'a03aa380-ffc6-457e-811c-a02588baeb64',
      name: 'Mr.',
      gender_specific_ar: null,
      allowed_genders: ['male'],
   },
   {
      id: 'a03aa381-001f-483b-9720-82ac57e68111',
      name: 'Ms.',
      gender_specific_ar: null,
      allowed_genders: ['female'],
   },
   {
      id: 'a03aa381-0068-4d5f-a934-c692d47ec899',
      name: 'Mrs.',
      gender_specific_ar: null,
      allowed_genders: ['female'],
   },
   {
      id: 'a03aa381-00a4-4077-a14d-70dec179c8ec',
      name: 'Dr.',
      gender_specific_ar: { male: 'الدكتور', female: 'الدكتورة' },
      allowed_genders: ['male', 'female'],
   },
   {
      id: 'a03aa381-0123-4182-bc70-f56f2c28523d',
      name: 'Eng.',
      gender_specific_ar: null,
      allowed_genders: null,
   },
   {
      id: 'a03aa381-0189-4eba-88a5-4f7ae2a9ab70',
      name: 'Prof.',
      gender_specific_ar: { male: 'الأستاذ', female: 'الأستاذة' },
      allowed_genders: ['male', 'female'],
   },
];

export const TITLES_PROD: TitleType[] = [
   {
      id: 'a03aadf6-292e-4e0b-a517-c7ea1b791d92',
      name: 'Mr.',
      gender_specific_ar: null,
      allowed_genders: ['male'],
   },
   {
      id: 'a03aadf6-2aea-4cb3-8463-c7564e112d8c',
      name: 'Ms.',
      gender_specific_ar: null,
      allowed_genders: ['female'],
   },
   {
      id: 'a03aadf6-2c5a-4275-8886-5a032248430e',
      name: 'Mrs.',
      gender_specific_ar: null,
      allowed_genders: ['female'],
   },
   {
      id: 'a03aadf6-2dc2-46cf-8965-f44a6d1cc7c9',
      name: 'Dr.',
      gender_specific_ar: { male: 'الدكتور', female: 'الدكتورة' },
      allowed_genders: ['male', 'female'],
   },
   {
      id: 'a03aadf6-2f2d-4ad2-a420-28d06db5c684',
      name: 'Eng.',
      gender_specific_ar: null,
      allowed_genders: null,
   },
   {
      id: 'a03aadf6-309c-4525-9545-a66f2b655d59',
      name: 'Prof.',
      gender_specific_ar: { male: 'الأستاذ', female: 'الأستاذة' },
      allowed_genders: ['male', 'female'],
   },
];

// Helper to pick by env (set NEXT_PUBLIC_RUNTIME_ENV='staging' | 'prod')
export const getTitlesByEnv = (env?: string) =>
   env === 'production' ? TITLES_PROD : TITLES_STAGING;
