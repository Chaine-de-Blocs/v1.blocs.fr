import type { ImgHTMLAttributes } from "react";
import useContent from "../useContent";
import { ClassNames, classNames } from "../css";

import { Resize, parseResize, transform } from '../utils/parsers';

type Props = Omit<ImgHTMLAttributes<any>, "className" | "width" | "height"> & {
  src: string;
  alt: string;
  className: ClassNames;
  width?: number | "compute";
  height?: number | "compute";
  resize?: Resize | string;
};

export default ({ src: inputSrc, resize, children, ...props }: Props) => {
  const content = useContent();
  const resizeObj = typeof resize === "string" ? parseResize(resize) : resize;
  const { src, additionalSources, width, height } = transform(
    content,
    inputSrc,
    resizeObj
  );

  const imgBase = (
    <img
      src={src}
      {...props}
      className={classNames(props.className)}
      width={props.width === "compute" ? width : props.width}
      height={props.height === "compute" ? height : props.height}
    />
  );

  return additionalSources.length > 0 || children != null ? (
    <picture>
      {children}
      {additionalSources.map(({ src, type }) => (
        <source key={type} srcSet={src} type={type} />
      ))}
      {imgBase}
    </picture>
  ) : (
    imgBase
  );
};

type ImageSourceProps = {
  src: string;
  resize: Resize | string;
  media: string;
};

export const Source = ({ src: inputSrc, resize, media }: ImageSourceProps) => {
  const content = useContent();
  const resizeObj = typeof resize === "string" ? parseResize(resize) : resize;
  const { src, additionalSources } = transform(content, inputSrc, resizeObj);

  return (
    <>
      {additionalSources.map(({ src, type }) => (
        <source key={type} srcSet={src} type={type} media={media} />
      ))}
      <source srcSet={src} media={media} />
    </>
  );
};
