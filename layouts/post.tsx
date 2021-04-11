import { className, classNames, variable } from "../core/css";

import Header from '../components/Header';
import Nav from '../components/Nav';

import { LayoutProps } from '../core/type';

const parseFilename = (path: string): string => {
  const splt = path.split('/');
  if (splt.length === 0) {
    return '';
  }

  return splt[splt.length - 1];
}

export default ({
  file,
  title,
  image,
  imageAlt,
  description,
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
        {file.date != null && (
          <span className={className("published-on")}>
            Modifié le {" "}
            <time dateTime={new Date(file.date).toISOString()}>
              {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: undefined }).format(file.date!)}
            </time>
          </span>
        )}

        <section className={className('contribute')}>
          <p>
            <i>Cet article est sous license <a href="https://creativecommons.org/licenses/?lang=fr-FR" target="_blank">Creative Commons BY-NC-SA</a>. Il est ouvert à contribution en vous rendant sur ce lien : <a href={`https://github.com/Chaine-de-Blocs/blocs.fr/blob/master/posts/${parseFilename(file.filename)}`} target="_blank">{file.title}</a></i>
          </p>
        </section>

        <script
          type="text/javascript"
          data-isso="https://isso.blocs.fr/"
          src="//isso.blocs.fr/js/embed.min.js"
          data-isso-css="true"
          data-isso-lang="fr"
          data-isso-reply-notifications="true"
          async
        >
        </script>

        <div className={className("comments")}>
          <h2>Commentaires</h2>
          <p><i>(Le format <a href="https://www.christopheducamp.com/2014/09/18/love-markdown/" target="_blank">Markdown</a> est accepté)</i></p>
          <section id="isso-thread"></section>
        </div>
      </body>
    </html>
  );
};
