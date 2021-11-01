import React, { ReactElement } from "react";
import { withPrefix } from "gatsby-link";
import { Helmet } from "react-helmet";
import { Image } from "../imageViewer/imageViewer";
import "./job.sass";

export type Work = {
  excerpt: string;
  description: string;
  nombre: string;
  titulo: string;
  videos: string[];
  imagenes: {
    alt: string;
    src: string;
  }[];
  portada: {
    alt: string;
    src: string;
  };
};

interface Props {
  pageContext: {
    work: Work;
  };
}

function Video({ src }: { src: string }): ReactElement {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  function getWidth() {
    if (width < height) return width / 1.2;
    return width / 2.5;
  }
  function getHeight() {
    if (width < height) return width / 1.8;
    return width / 3.3;
  }
  React.useEffect(() => {
    const videos = document.querySelectorAll(
      "iframe[src^='http://www.youtube.com']"
    );
    function handleResize() {
      videos.forEach(video => {
        console.log(video);
        video.setAttribute("width", `${getWidth()}px`);
        video.setAttribute("height", `${getHeight()}px`);
      });
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => document.removeEventListener("resize", handleResize);
  }, []);
  return (
    <iframe
      width={getWidth()}
      height={getHeight()}
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export default function Job({ pageContext }: Props): ReactElement {
  const { work } = pageContext;
  const images = work.imagenes.map(image => image.src);
  const Portada = () =>
    work.videos.length > 0 ? (
      <Video src={work.videos[0]} />
    ) : (
      <Image image={withPrefix(work.portada.src)} images={images} />
    );

  const firstImage = work.imagenes[0];

  return (
    <div id="WorkDetails">
      <Helmet>
        <title>Incipio SRL. {work.titulo}</title>
      </Helmet>
      <h1>{work.titulo} </h1>
      {work.description && <p>{work.description}</p>}
      <div className="PortadaContainer">
        {firstImage && (
          <Image
            image={withPrefix(firstImage.src)}
            alt={firstImage.alt}
            images={images}
          />
        )}
        <Portada />
      </div>
      <div className="WorkImages">
        {work.imagenes.map((image, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <Image
                image={withPrefix(image.src)}
                alt={image.alt}
                images={images}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
