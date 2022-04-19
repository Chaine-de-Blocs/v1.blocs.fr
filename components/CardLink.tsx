import { classNames } from "../core/css";

import { useServerEffect } from "../core/useContent";

import ogs, { SuccessResult } from "open-graph-scraper";

type Props = {
    href: string;
    defaultTitle: string;
    defaultDescription: string;
    fallbackImage: string;

    forceDefault?: boolean;
}

interface OGMetaResult extends SuccessResult {
    ogTitle: string;
    ogSiteName: string;
    ogDescription: string;
    ogImage?: {
        url: string;
        width: number;
        height: number;
    };
    requestUrl: string;
}

const parseMeta = async (url: string): Promise<OGMetaResult> => {
    return new Promise((resolve, reject) => {
        ogs({
            url
        }, (err, res) => {
            if (err) {
                reject(new Error(`card link failed to parse meta of ${url}`));
                return;
            }
        
            const meta = res as OGMetaResult;

            resolve(meta);
        });
    });
}

const getDescription = (ogMeta: OGMetaResult, props: Props) => {
    if (props.forceDefault) {
        return props.defaultDescription;
    }
    return ogMeta.ogDescription || props.defaultDescription;
}

const getTitle = (ogMeta: OGMetaResult, props: Props) => {
    if (props.forceDefault) {
        return props.defaultTitle;
    }
    return ogMeta.ogTitle || props.defaultTitle;
}

const getImage = (ogMeta: OGMetaResult, props: Props) => {
    if (ogMeta.ogImage) {
        return ogMeta.ogImage.url;
    }
    return props.fallbackImage;
}

export default (props: Props) => {
    const [ogmeta]: Array<OGMetaResult> =
        useServerEffect(null, "_ogmeta_", async () => {
            try {
                return await parseMeta(props.href);
            } catch(_) {
                return {
                    ogTitle: "Oups, le titre n'a pas été trouvé :(",
                    ogDescription: "La description non plus, du coup"
                }
            }
        });

    if (ogmeta === null) {
        return (
            <a href={props.href} target="_blank">{props.defaultTitle}</a>
        )
    }

    return (
        <div className={classNames('og-card') + ' card-link'} data-card-href={props.href}>
            {
                <div className={classNames('thumbnail')}>
                    <img src={getImage(ogmeta, props)} />
                </div>
            }
            <div className={classNames('content')}>
                <p className={classNames('title')}>
                    {getTitle(ogmeta, props)}
                </p>
                <p className={classNames('description')}>
                    {getDescription(ogmeta, props)}
                </p>
                <p className={classNames('website')}>
                    {props.href}
                </p>
            </div>
        </div>
    )
};
