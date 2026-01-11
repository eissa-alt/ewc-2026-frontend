// timezoneFix.ts
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { fromUnixTime } from 'date-fns';

export const timeZoneFix = (timestampStr: string) => {
   const timestamp = parseInt(timestampStr, 10); // Convert string timestamp to number
   const saudiArabiaDate = utcToZonedTime(fromUnixTime(timestamp), 'Asia/Riyadh');
   return format(saudiArabiaDate, 'dd/MM/yyyy');
};
