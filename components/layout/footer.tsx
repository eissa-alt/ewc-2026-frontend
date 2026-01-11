// import classNames from 'classnames';
import Section3 from './footer/section-3';
// import { useTranslate } from '~/i18n';

const Footer = () => {
   // const { lang } = useTranslate();

   return (
      <footer className="relative">
         {/* <div className="absolute bottom-0   block w-full overflow-hidden">
            <div
               className={classNames(
                  'bg-body-bg-2  relative  -z-0 h-[300px] bg-contain  bg-right-bottom bg-no-repeat',
                  lang === 'ar' && 'flip-x'
               )}></div>
         </div> */}
         {/* Bottom-right triangle */}
         {/* <div
            style={{
               clipPath: 'polygon(0 0, 100% 0, 0 100%)',
               background: 'linear-gradient(to top left, #55A6D9, #55A6D9, #55A6D9)',
               transform: lang === 'ar' ? 'rotate(-90deg)' : 'rotate(180deg)',
            }}
            // className="absolute bottom-0 right-0 h-[200px] w-[200px]"
            className={classNames(
               'absolute bottom-0  h-[200px] w-[200px]',
               'ltr:right-0 rtl:left-0'
            )}></div> */}
         {/* <FooterFollow /> */}
         <Section3 />
      </footer>
   );
};

export default Footer;
