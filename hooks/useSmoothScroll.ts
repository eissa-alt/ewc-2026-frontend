// hooks/useSmoothScroll.ts
import { RefObject, useCallback } from 'react';

export function useSmoothScroll(offset = 0) {
   // Respect user accessibility setting
   const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

   const scrollToRef = useCallback(
      (ref: RefObject<HTMLElement>) => {
         const node = ref.current;
         if (!node) return;
         const top = node.getBoundingClientRect().top + window.pageYOffset - offset;

         window.scrollTo({
            top,
            behavior: prefersReduced ? 'auto' : 'smooth',
         });
      },
      [offset, prefersReduced]
   );

   return { scrollToRef };
}
