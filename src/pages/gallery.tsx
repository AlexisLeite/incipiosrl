import * as React from "react";
import "../styles/main.sass";
import { useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import { Work } from "../components/job/job";
import { CCard, CCardImage, CCardText, CCardTitle } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Conf } from "../components/conf";
import GalleryJobCard from "./../components/galleryJobCard";
import { Helmet } from "react-helmet";

const Gallery = () => {
  const data: {
    allWork: { nodes: Work[] };
    allHighlight: { nodes: { path: string }[] };
  } = useStaticQuery(graphql`
    {
      allHighlight {
        nodes {
          path
        }
      }
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

  return (
    <>
      <Helmet>
        <title>Galería de imágenes</title>
      </Helmet>
      <div className="Stage" id="Gallery">
        {data.allWork.nodes.map(job => (
          <GalleryJobCard key={job.nombre} job={job} />
        ))}
      </div>
    </>
  );
};

export default Gallery;
