import { classNames } from "../core/css";

type Props = {
    children: JSX.Element;

    href?: string;
    action?(): void;
    plain?: boolean;
    className?: string;
}

export default (props: Props) => (
  <a
    className={classNames("btn" + (props.plain ? " plain" : "") + (props.className || ""))}
    href={props.href ? props.href : '#'}
  >
    {props.children}
  </a>
);
