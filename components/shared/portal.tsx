import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
   node: string;
}
const Portal: FC<PortalProps> = ({ children, node }) => {
   let parent: HTMLElement | null = null;

   useEffect(() => {
      () => {
         if (parent) {
            document.body.removeChild(parent);
         }
      };
   }, [parent]);

   if (typeof window === 'undefined') return null;

   const el = document.getElementById(node);

   if (el) {
      parent = el;
   } else {
      parent = document.createElement('div');
      parent.setAttribute('id', node);
      document.body.appendChild(parent);
   }

   return ReactDOM.createPortal(children, parent);
};

export default Portal;
