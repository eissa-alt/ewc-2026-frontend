/* --------------- To fix date invalid format issue on Safari --------------- */

export default function getMonthList(local: string) {
   const monthsListEn = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ];
   const monthsListAr = [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
   ];

   switch (local) {
      case 'en':
         return monthsListEn;
      case 'ar':
         return monthsListAr;
      default:
         return monthsListEn;
   }
}
