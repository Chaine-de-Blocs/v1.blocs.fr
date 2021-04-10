import { className, classNames } from "../core/css";

const HeaderNav = ({ children }: { children: any }) => (
    <div className={className("header")}>{children}</div>
  );
  
  const HeaderSection = ({
    last,
    children,
  }: {
    last?: boolean;
    children: string;
  }) => (
    <div
      className={classNames("header__section", last && "header__section--last")}
    >
      {children}
    </div>
  );
  
  const HeaderLogo = () => (
    <a href="/" className={classNames("header__logo")}>
      Blocs
      <br />
      .fr
    </a>
  );
  
  const HeaderLink = ({ href, children }: { href: string; children: string }) => (
    <a href={href} className={classNames("header__link")}>
      {children}
    </a>
  );

type Props = {
};

export default (_: Props) => {
  return (
    <HeaderNav>
      <HeaderLogo />
      <HeaderSection>Site</HeaderSection>
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderSection last>Cool</HeaderSection>
      <HeaderLink href="/blog">Blog</HeaderLink>
    </HeaderNav>
  );
};
