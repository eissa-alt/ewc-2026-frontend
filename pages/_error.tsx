import { NextLink, Translate } from '~/i18n';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import classNames from 'classnames';

const ErrorPage = () => {
   return (
      <Fragment>
         <NextSeo
            title="500 - Server Error"
            description="Something went wrong on our end"
            noindex={true}
            nofollow={true}
         />
         <div className="relative flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
               <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
               {/* Large 500 number */}
               <div className="mb-8">
                  <h1 className="text-9xl font-bold leading-none md:text-[12rem]">
                     <span className="bg-gradient-to-r from-[#4E442D] to-gold-primary bg-clip-text text-transparent">
                        500
                     </span>
                  </h1>
               </div>

               {/* Error title */}
               <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  <Translate id="common:500_title" />
               </h2>

               {/* Error message */}
               <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-300 md:text-xl">
                  <Translate id="common:500_message" />
               </p>

               {/* Homepage button */}
               <div className="mt-8 text-center">
                  <div className="row justify-center">
                     <div className="md:col-12">
                        <NextLink
                           href="/"
                           className={classNames(
                              'block w-full border-none border-transparent px-4 py-3 text-center text-sm font-bold leading-5 text-white',

                              // 'disabled:cursor-not-allowed disabled:opacity-50',
                              'bg-primary hover:bg-primary-600',
                              // 'bg-gradient-to-r from-[#C3FF42] via-[#27CBC0] to-[#0077C0]',
                              'focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50',
                              'transition-all duration-150',
                              'rounded-xl',
                              'bg-gradient-to-r from-[#4E442D] to-gold-primary',

                              'rounded-xl'
                           )}>
                           <Translate id="web:back_to_homepage" />
                        </NextLink>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
   //    console.log(err);
   //    console.log(res);
   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
   return { error: statusCode };
};
// ErrorPage.isMiniHeaderFooterLayout = true;

export default ErrorPage;
