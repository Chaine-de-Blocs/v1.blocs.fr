import {
    ExternalJs,
    InlineCss,
    InlineJs,
} from "../core/components";

type Props = {
  title: string;
  description?: string;

  inlineCSS: string;
  inlineJS: string;
  assetsJS: string;
};

export default (props: Props) => {
  return (
    <>
      <title>{props.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {props.description && <meta name="description" content={props.description} />}
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
