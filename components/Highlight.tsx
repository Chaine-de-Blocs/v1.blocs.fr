import { classNames } from "../core/css";

export default (props: any) => (
    <span className={classNames('term-highlight')}>{props.children}</span>
);