import { className } from "../core/css";

export default () => (
  <>
    <div className={className("socials")}>
      <a href="https://github.com/Slals/" target="_blank">
        <span className={className("icon-github") + " icon"}></span>
      </a>
      <a href="https://www.linkedin.com/in/serrajonathan/" target="_blank">
        <span className={className("icon-linkedin") + " icon"}></span>
      </a>
      <a href="https://www.instagram.com/john_blocs" target="_blank">
        <span className={className("icon-instagram") + " icon"}></span>
      </a>
      <a href="https://www.youtube.com/channel/UCjvOu6faxxmqE6ZHTLR5qmw" target="_blank">
        <span className={className("icon-youtube") + " icon"}></span>
      </a>
    </div>
  </>
);
