import { Image, ImageSource } from "../core/components";

import { getPosts } from "../core/files";

import { className, classNames } from "../core/css";

export default () => (
  <ul className={className("post-list")}>
    {getPosts().map(({ url, title, filename, image, date, description }) => (
      <li className={className("post-preview") + " post-preview-selector"} key={filename} data-post-url={url}>
        {
          image &&
            <Image src={image} alt={title || ''} className="preview" resize={{ width: 200 }}>
              <ImageSource
                src={image}
                resize={{
                  width: 200,
                }}
                media="(max-width: 800)"
              />
            </Image>
        }
        <div>
          <a href={url}>{title ?? url}</a>
          <p className={classNames('post-description')}>{description}</p>
          <p className={classNames('edit-date')}>
            <i>Dernière modification le {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: undefined }).format(date!)}</i>
          </p>
        </div>
      </li>
    ))}
  </ul>
);
