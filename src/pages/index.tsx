import * as React from "react";
import image from "../images/logo.png";
import "../styles/main.sass";
import Img from "../components/img";
import { useStaticQuery, graphql } from "gatsby";
import HomeHighlight from "../components/homeHighlights/homeHighlights";
import Contact from "./contact";
import HomeGallery from "../components/HomeGallery";
import { Helmet } from "react-helmet";

const IndexPage = () => {
  const data: {
    allHighlight: { nodes: { path: string }[] };
  } = useStaticQuery(graphql`
    {
      allHighlight {
        nodes {
          path
        }
      }
    }
  `);
  return (
    <>
      <div className="Stage" id="Home">
        <main style={{}}>
          <Img src={image} alt="Logo" placeholder="none" id="Logo" />
          <h2>If you can dream it, we can build it</h2>
        </main>
        <HomeHighlight
          images={data.allHighlight.nodes.map(node => node.path)}
          width={4}
        />
      </div>
      <HomeGallery />
      <Contact />
      <Helmet>
        <title>Incipio SRL. If you can dream it, we can build it</title>
      </Helmet>
    </>
  );
};

export default IndexPage;
