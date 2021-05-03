import React from 'react';
import { tokenToString } from 'typescript';

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
  
  const HeaderLink = ({ href, classes, rawClass, children }: { href: string; classes?: string[]; rawClass?: string; children?: string }) => (
    rawClass
      ? <a href={href} className={classNames("header__link", classes) + " " + rawClass} title={`Accéder à ${children}`}>
          {children}
        </a>
      : <a href={href} className={classNames("header__link")} title={`Accéder à ${children}`}>
          {children}
        </a>
  );

export default class extends React.Component {
  public render() {
    return (
      <HeaderNav>
        <HeaderLogo />
        <HeaderSection>Site</HeaderSection>
        <HeaderLink href="/">Home</HeaderLink>
        <HeaderSection last>Cool</HeaderSection>
        <HeaderLink href="/blog">Blog</HeaderLink>

        <a href="#" className={classNames("header__link")} id="theme-switch" title="Changer la couleur du fond">
          <span className={classNames("icon", "icon-light-up")}></span>
          <span className={classNames("icon", "icon-moon")}></span>
        </a>
      </HeaderNav>
    )
  }
}
