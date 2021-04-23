import { className, classNames } from "../core/css";

export default () => (
  <>
    <div className={className("socials")}>
      <a href="https://github.com/Slals/" target="_blank">
        <span className={classNames("icon-github icon")}></span>
      </a>
      <a href="https://www.linkedin.com/in/serrajonathan/" target="_blank">
        <span className={classNames("icon-linkedin icon")}></span>
      </a>
      <a href="https://www.instagram.com/john_blocs" target="_blank">
        <span className={classNames("icon-instagram icon")}></span>
      </a>
      <a href="https://www.youtube.com/channel/UCjvOu6faxxmqE6ZHTLR5qmw" target="_blank">
        <span className={classNames("icon-youtube icon")}></span>
      </a>
      <a href="https://t.me/Bl0cs" target="_blank">
        <span className={classNames("icon-telegram icon")}></span>
      </a>
    </div>
  </>
);
