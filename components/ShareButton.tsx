import { classNames } from "../core/css";

type Social = 'twitter';

type Props = {
    social: Social;
    text: string;

    className?: string;
    id?: string;
}

const createLink = (s: Social, text: string): string => {
    switch(s) {
        case 'twitter':
            const url = "https://twitter.com/intent/tweet?text=";
            const encodedText = encodeURIComponent(text);
            return url + encodedText;
    }
}

export default (props: Props) => {
    switch(props.social) {
        case 'twitter':
            return (
                <div className={classNames("twitter-share-button-container")}>
                    <i className={classNames("icon-twitter icon")} />
                    <a
                        className={classNames("twitter-share-button", props.className)}
                        target="_blank" 
                        href={createLink(props.social, props.text)}
                        id={props.id}
                    >
                        Partager
                    </a>
                </div>
            )
    }
};
