import type { NextApiRequest, NextApiResponse } from 'next';
import { getLanguagesPaths } from '~/utils/translate';

type Data = {
   revalidated: boolean;
   message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   // Check for secret to confirm this is a valid request
   if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token', revalidated: false });
   }

   try {
      // Get all language paths dynamically
      const languagePaths = getLanguagesPaths();
      const paths = languagePaths.map(
         (path: { params: { lang: string } }) => `/${path.params.lang}`
      );

      // Revalidate each path
      await Promise.all(
         paths.map(path => {
            return res.revalidate(path);
         })
      );

      return res.json({ revalidated: true, message: `Revalidated ${paths.length} paths` });
   } catch (err) {
      // If there was an error, Next.js will continue to show the last successfully generated page
      return res.status(500).json({
         message: 'Error revalidating',
         revalidated: false,
      });
   }
}
