import React from 'react';
import { useRouter } from 'next/router';
import transConfig from '~/translation.json';
const { languages } = transConfig;

import Link from 'next/link';
import classNames from 'classnames';

interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
   className?: string;
   text: string | React.ReactNode;
}

const LangSwitcher: React.FC<NavLinkProps> = ({ text, href, className, ...rest }) => {
   const router = useRouter();
   const regex = new RegExp(`^/(${Object.keys(languages).join('|')})`);
   const hrefAs = `${router.asPath.replace(regex, `${href}`)}`;
   const pathname = router.pathname;

   const linkHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      router.push(pathname, hrefAs);
   };

   return (
      <Link href={pathname} as={hrefAs}>
         <a
            {...rest}
            onClick={linkHandler}
            className={classNames(
               'group inline-block items-center rounded-md p-[2px] font-semibold text-primary rtl:justify-end',
               'min-w-[80px] text-center',
               'focus:border-primary-600 focus:outline-none focus:ring focus:ring-accent focus:ring-opacity-50',

               // ✅ keep your original gradient EXACTLY
               'bg-gradient-to-r from-[#4E442D] to-gold-primary',

               // ✅ smooth reverse illusion (animate background-position)
               'bg-[length:220%_100%] bg-[position:0%_50%]',
               'transition-[background-position] duration-700 ease-in-out',
               'hover:bg-[position:100%_50%]',

               className
            )}>
            <div className="h-full w-full rounded bg-[#231f20] px-4 py-1 ltr:font-ar rtl:font-en rtl:order-0">
               <div
                  className={classNames(
                     // ✅ same gradient text as original
                     'bg-gradient-to-r from-[#4E442D] to-gold-primary bg-clip-text text-transparent',

                     // ✅ smooth reverse illusion for text too
                     'bg-[length:220%_100%] bg-[position:0%_50%]',
                     'transition-[background-position] duration-700 ease-in-out',
                     'group-hover:bg-[position:100%_50%]'
                  )}>
                  {text}
               </div>
            </div>
         </a>
      </Link>
   );
};

export default LangSwitcher;
