import {
    ExternalJs,
    InlineCss,
    InlineJs,
} from "../core/components";

import useContent from "../core/useContent";

import { transform } from '../core/utils/parsers';

type Props = {
  title: string;

  image?: string;
  imageAlt?: string;
  description?: string;

  inlineCSS: string;
  inlineJS: string;
  assetsJS: string;
};

const resolveImagePath = (image: string) => {
  const content = useContent();
  const { src } = transform(
    content,
    image,
  );
  return src;
}

export default (props: Props) => {
  return (
    <>
      <title>{props.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#0070FC" />
      <meta name="author" content="Jonathan Serra" />

      <meta property="og:url" content="https://blocs.fr" />
      <meta property="og:title" content={props.title} />
      {props.description && <meta property="og:description" content={props.description} />}
      {props.description && <meta name="description" content={props.description} />}

      {props.image && <meta property="og:image" content={resolveImagePath(props.image)} />}
      {props.imageAlt && <meta property="og:image:alt" content={props.imageAlt} />}
      
      <meta property="og:type" content="blog" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@_blocs" />
      <meta name="twitter:creator" content="@_blocs" />

      <meta property="article:author" content="Jonathan Serra" />

      {
        props.assetsJS
          .split(',')
          .filter((file) => file.length > 0)
          .map((file, i) => <ExternalJs key={i} src={`/assets/${file}.js`} defer />)
      }
      <InlineCss
        src={["base", ...props.inlineCSS.split(",")]
          .filter((file) => file.length > 0)
          .map((file) => `/assets/${file}.css`)}
      />
      <InlineJs src={props.inlineJS} defer />
    </>
  );
};
