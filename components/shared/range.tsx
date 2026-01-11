// import Section1 from './footer/section-1';
// import Section2 from './footer/section-2';

const Range = () => {
   return (
      <div className="m-auto flex w-full items-center justify-center py-5">
         <div className="relative min-w-full py-1">
            <div className="h-2 rounded-full bg-gray-200">
               <div
                  className="absolute h-2 w-0 rounded-full bg-teal-600"
                  style={{ width: '100%' }}></div>
               <div
                  className="absolute top-0 -ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white shadow"
                  style={{ left: '100%' }}>
                  <div className="relative -mt-2 w-1">
                     <div className="bottom-100 absolute left-0 z-40 mb-2 min-w-full opacity-100">
                        <div className="relative shadow-md"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Range;
