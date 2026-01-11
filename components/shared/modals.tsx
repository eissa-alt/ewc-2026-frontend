import { motion } from 'framer-motion';

import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import Portal from './portal';
interface ModalProps {
   open: boolean;
   onClickOutside?: () => any;
   size?: 'xs' | 'sm' | 'md' | 'lg' | number;
   node?: string;
}

const ModalBody: FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => {
   return (
      <div className={cn('rounded-default', className)} {...props}>
         {children}
      </div>
   );
};

let timeout: any;

const Modal: FC<ModalProps> & { Body: FC<React.HTMLProps<HTMLDivElement>> } = ({
   children,
   open,
   onClickOutside,
   size = 'sm',
   node,
}) => {
   const DURATION = 0.225;
   const [hidden, setHidden] = useState(open);
   const clickOutside = useCallback(() => {
      onClickOutside && onClickOutside();
   }, [onClickOutside]);

   const widths = {
      xs: '430px',
      sm: '500px',
      md: '650px',
      lg: '800px',
   };

   useEffect(() => {
      const escHandler = ({ key }: KeyboardEvent) => {
         if (key === 'Escape') clickOutside();
      };
      if (open) {
         setHidden(false);
         // Closing on ESC button
         window.addEventListener('keydown', escHandler);

         if (timeout) clearTimeout(timeout);
      } else {
         timeout = setTimeout(() => setHidden(true), DURATION * 1000 * 2);
      }
      return () => {
         clearTimeout(timeout);
         window.removeEventListener('keydown', escHandler);
      };
   }, [open, clickOutside]);

   const variants = {
      open: {
         backgroundColor: 'rgba(0,0,0,0.5)',
         zIndex: 1000,
      },
      close: {
         backgroundColor: 'rgba(0,0,0,0)',
         transitionEnd: {
            zIndex: -1,
         },
      },
   };

   const contentVaraitns = {
      open: {
         opacity: 1,
         y: '-50%',
      },
      close: {
         opacity: 0,
         y: '0%',
      },
   };

   return (
      <Portal node={node || 'modal'}>
         {open && (
            <style jsx global>{`
               body {
                  overflow-y: hidden;
               }
            `}</style>
         )}

         {open && (
            <motion.div
               // id={node}
               onClick={clickOutside}
               variants={variants}
               transition={{ duration: DURATION, ease: 'easeInOut' }}
               initial="close"
               animate="open"
               className="fixed inset-0 overflow-y-auto"
               exit="close">
               <motion.div
                  className="absolute left-1/2 top-1/2 z-10 max-h-full"
                  onClick={e => e.stopPropagation()}
                  variants={contentVaraitns}
                  transition={{ duration: DURATION, ease: 'easeInOut' }}
                  initial="close"
                  animate="open"
                  exit="close"
                  style={{
                     maxWidth: '95%',
                     // padding: '0 15px',
                     width: `${typeof size === 'string' ? widths[size] : size + 'px'}`,
                     x: '-50%',
                  }}>
                  {!hidden && children}
               </motion.div>
            </motion.div>
         )}
      </Portal>
   );
};
Modal.Body = ModalBody;

export default Modal;
