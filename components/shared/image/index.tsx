import React, { FC, memo, useState } from 'react';
import classNames from 'classnames';
import Img, { ImageProps } from 'next/image';

type ImgComponentProps = ImageProps & {
   loaderWrapperClassName?: string;
   imageWrapperClassName?: string;
   imageClassName?: string;
   placeholderImage?: React.ReactNode;
   fallbackImage?: React.ReactNode;
};

const Image: FC<ImgComponentProps> = ({
   imageWrapperClassName,
   loaderWrapperClassName,
   placeholderImage,
   onLoad,
   src,
   fallbackImage,
   imageClassName,
   ...props
}) => {
   const [loading, setLoading] = useState(true);
   const [hasError, setHasError] = useState(false);

   return (
      <div className={classNames(imageWrapperClassName || 'relative h-full overflow-hidden')}>
         {hasError ? (
            fallbackImage
         ) : (
            <Img
               src={src}
               className={imageClassName}
               {...props}
               onLoad={e => {
                  setLoading(false);
                  onLoad && onLoad(e);
               }}
               onError={() => {
                  setLoading(false);
                  setHasError(true);
                  // const image = e.target as HTMLImageElement;
                  // image.srcset = '';
                  // image.src = fallbackImage;
                  // onError && onError(e);
               }}
            />
         )}

         {loading && (
            <div
               className={classNames(
                  loaderWrapperClassName,
                  'absolute inset-0 flex items-center justify-center'
               )}>
               {placeholderImage}
            </div>
         )}
      </div>
   );
};
Image.displayName = 'Image';
export default memo(Image);
