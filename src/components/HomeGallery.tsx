import React, { ReactElement } from "react";
import { Work } from "./job/job";
import { useStaticQuery } from "gatsby";
import { graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Conf } from "./conf";
import { withPrefix } from "gatsby-link";

interface HomeGalleryProps {}

export default function HomeGallery({}: HomeGalleryProps): ReactElement {
  const data: {
    allWork: { nodes: Work[] };
  } = useStaticQuery(graphql`
    {
      allWork {
        nodes {
          description
          excerpt
          nombre
          titulo
          videos
          imagenes {
            alt
            src
          }
          portada {
            alt
            src
          }
        }
      }
    }
  `);

  const works = data.allWork.nodes;
  const [currentWork, setCurrentWork] = React.useState(0);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const newCurrentWork =
        currentWork + 1 >= works.length ? 0 : currentWork + 1;
      setCurrentWork(newCurrentWork);
      const image = document.getElementById("Image");
      const prevImage = document.getElementById("PrevImage");

      image &&
        image.animate(
          [
            // keyframes
            { opacity: 0, transform: "scale(0.9)" },
            { opacity: 1, transform: "scaleX(1.01)" },
          ],
          {
            // timing options
            duration: 1000,
          }
        );
      prevImage &&
        prevImage.animate(
          [
            // keyframes
            { opacity: 1, transform: "scaleX(1.01)" },
            { opacity: 0, transform: "scale(0.9)" },
          ],
          {
            // timing options
            duration: 1000,
          }
        );
    }, 6500);
    return () => clearTimeout(timeout);
  }, [currentWork]);

  const prevWork = currentWork - 1 < 0 ? works.length - 1 : currentWork - 1;

  return (
    <div id="HomeGallery">
      <div
        id="Image"
        className={`HomeGalleryImage`}
        style={{
          backgroundImage: `url("${withPrefix(
            works[currentWork].portada.src
          )}")`,
        }}
      ></div>
      <div
        id="PrevImage"
        style={{
          backgroundImage: `url("${withPrefix(works[prevWork].portada.src)}")`,
        }}
      ></div>
      <div id="JobTitle">
        <AniLink
          {...Conf.transitionProps}
          to={`/trabajos/${works[currentWork].nombre}`}
        >
          {" "}
          {works[currentWork].titulo}
        </AniLink>
      </div>
    </div>
  );
}
