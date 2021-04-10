import { className, classNames } from "../core/css";

import { getAnchor } from '../core/renderPage';

interface Item {
    title: string;

    subItems?: Array<Item>;
    href?: string;
}

type Props = {
    items: Array<Item>;

    children: any;
}

const renderItems = (items: Array<Item>, isSub: boolean = false) => items.map((i, index) => {
    const link = (
        <a href={i.href ?? '#' + getAnchor(i.title)}>{i.title}</a>
    );

    if (typeof i.subItems !== 'undefined') {
        return (
            <div key={index} className={isSub ? '' : className('section')}>
                {link}
                <div>
                    {renderItems(i.subItems, true)}
                </div>
            </div>
        )
    }

    return <div key={index} className={isSub ? '' : className('section')}>{link}</div>;
});

export default ({
    children, items,
}: Props) => (
    <div className={classNames('summary')}>
        <div className={classNames('intro')}>
            {children}
        </div>
        <div className={classNames('insert')}>
            <h2>Sommaire</h2>
            {renderItems(items)}
        </div>
    </div>
);