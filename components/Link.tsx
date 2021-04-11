import { className } from "../core/css";

type Props = {
    href: string;
    children: JSX.Element;
    className?: string;
}

export default (props: Props) =>
  <a href={props.href} className={className(props.className)} target="_blank">{props.children}</a>
