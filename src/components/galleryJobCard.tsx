import React, { ReactElement } from "react";
import { Work } from "./job/job";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Conf } from "./conf";
import { withPrefix } from "gatsby-link";

interface Props {
  job: Work;
}

export default function GalleryJobCard({ job }: Props): ReactElement {
  return (
    <AniLink
      {...Conf.transitionProps}
      className="Portada"
      to={`/trabajos/${job.nombre}`}
    >
      <div className="JobImage">
        <img src={withPrefix(job.portada.src)} alt={job.portada.alt} />
      </div>

      <h2>{job.titulo}</h2>
      <p>{job.excerpt}</p>
      <span className="LeerMas">Leer más...</span>
      <p className="CantidadFotos">20 imágenes, 0 videos.</p>
    </AniLink>
  );
}
