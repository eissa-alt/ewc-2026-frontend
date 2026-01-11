/**
 * @return {boolean}
 */
function validateSAID(id: any, residence: any) {
   // if (!residence) {
   //    return false;
   // }
   id = id.trim();
   if (isNaN(parseInt(id))) {
      return false;
   }
   if (id.length !== 10) {
      return false;
   }
   const type = id.substr(0, 1);
   if (residence === 'citizen') {
      if (type !== '1') {
         return false;
      }
   } else {
      if (type !== '2') {
         return false;
      }
   }
   let sum = 0;
   for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
         const ZFOdd = String('00' + String(Number(id.substr(i, 1)) * 2)).slice(-2);
         sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
      } else {
         sum += Number(id.substr(i, 1));
      }
   }
   return sum % 10 !== 0 ? false : true;
}

export default validateSAID;
