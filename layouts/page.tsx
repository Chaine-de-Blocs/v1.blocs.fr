import Header from '../components/Header';
import Nav from '../components/Nav';
import { variable } from "../core/css";

import { LayoutProps } from '../core/type';

export default ({
  title,
  description,
  image,
  imageAlt,
  css = "",
  js = "",
  primary,
  children,
}: LayoutProps) => {
  const style: any = {
    [variable("--primary")]: primary?.startsWith("var(")
      ? primary.replace(/--[a-z-]+/, variable)
      : primary,
  };

  return (
    <html style={style} lang="fr" prefix="og: http://ogp.me/ns#">
      <head>
        <Header
          title={title}
          description={description}
          image={image}
          imageAlt={imageAlt}
          inlineCSS={css}
          inlineJS="/assets/set-hairline-width.js"
          assetsJS={js}
        />
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
};
