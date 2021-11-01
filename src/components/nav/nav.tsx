import { Conf } from "../conf";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import React from "react";
import { MdInsertPhoto, MdHome, MdPhone } from "react-icons/md";
import { onRouteChange } from "../../services/router";
import { ImMenu } from "react-icons/im";
import "./nav.sass";

export default function Nav() {
  const [show, setShow] = React.useState(false);
  const [pathName, setPathName] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    handleScroll();
    const unsuscribe = onRouteChange(route => {
      setPathName(route);
    });
    setPathName(window.location.pathname);

    return () => {
      window.removeEventListener("scroll", handleScroll), unsuscribe;
    };
  }, []);

  const Links = [
    { to: "/", Element: <MdHome color={Conf.color} size="50" /> },
    { to: "/gallery", Element: <MdInsertPhoto color={Conf.color} size="50" /> },
    { to: "/contact", Element: <MdPhone color={Conf.color} size="50" /> },
  ];

  return (
    <nav>
      <div>
        {Links.map(
          link =>
            link.to !== pathName && (
              <AniLink key={link.to} {...Conf.transitionProps} to={link.to}>
                {link.Element}
              </AniLink>
            )
        )}
        <a id="PortraitMenu">
          <ImMenu
            onClick={() => {
              document.querySelector("nav")?.classList.toggle("OpenPortrait");
            }}
          />
        </a>
        {/* }
        <AniLink {...Conf.transitionProps} to="/contact">
          <MdPhone color={Conf.color} size="50" />
        </AniLink> */}
      </div>
    </nav>
  );
}
