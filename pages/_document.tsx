import Document, { Head, Main, NextScript, Html } from 'next/document';
import transConfig from '~/translation.json';
const { languages, defaultLanguage } = transConfig;

/* -------------------------------------------------------------------------- */
/*                                  DOCUMENT                                  */
/* -------------------------------------------------------------------------- */

export default class NextDocument extends Document {
   render() {
      /* -------- Just getting direction and language inside html elements -------- */

      const langs = languages as Record<string, string>;
      const props = this.props.__NEXT_DATA__;
      const lang = props?.query?.lang || defaultLanguage;
      const direction = langs[lang + ''] || 'ltr';
      return (
         <Html
            lang={lang + ''}
            dir={direction}
            className="font-primary antialiased  ltr:font-en rtl:font-ar">
            <Head>
               {/* Google Tag Manager */}
               {/* <script
                  dangerouslySetInnerHTML={{
                     __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER || ''}');`,
                  }}
               /> */}
               {/* End Google Tag Manager */}
               <meta charSet="utf-8" />
               <meta name="google" content="notranslate" />
               {/* //todo */}
               <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />

               {/* <link rel="stylesheet" href="https://use.typekit.net/zmf4cef.css" /> */}
            </Head>
            <body
               id="body"
               dir={direction}
               lang={lang + ''}
               className="antialiased ltr:text-left ltr:font-en rtl:text-right rtl:font-ar">
               {/* Google Tag Manager (noscript) */}
               {/* <noscript>
                  <iframe
                     src={`https://www.googletagmanager.com/ns.html?id=${
                        process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER || ''
                     }`}
                     height="0"
                     width="0"
                     style={{ display: 'none', visibility: 'hidden' }}
                  />
               </noscript> */}
               {/* End Google Tag Manager (noscript) */}
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
