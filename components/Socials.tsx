import { className, classNames } from "../core/css";

export default () => (
  <>
    <div className={className("socials")}>
      <a href="https://github.com/Slals/" target="_blank" title="Page Github à Jonathan" rel="noopener">
        <span className={classNames("icon-github icon")}></span>
      </a>
      <a href="https://www.linkedin.com/in/serrajonathan/" target="_blank" title="Page LinkedIn à Jonathan" rel="noopener">
        <span className={classNames("icon-linkedin icon")}></span>
      </a>
      <a href="https://www.instagram.com/john_blocs" target="_blank" title="Compte Instagram à Jonathan" rel="noopener">
        <span className={classNames("icon-instagram icon")}></span>
      </a>
      <a href="https://www.youtube.com/channel/UCjvOu6faxxmqE6ZHTLR5qmw" target="_blank" title="Chaîne You Tube à Jonathan, la chaîne de Blocs" rel="noopener">
        <span className={classNames("icon-youtube icon")}></span>
      </a>
      <a href="https://t.me/Bl0cs" target="_blank" title="Telegram pour contacter Jonathan" rel="noopener">
        <span className={classNames("icon-telegram icon")}></span>
      </a>
    </div>
  </>
);
