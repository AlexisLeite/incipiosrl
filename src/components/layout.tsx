import React, { ReactElement } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import Nav from "./nav/nav";
import ImageViewer from "./imageViewer/imageViewer";
import { CallbackSensor } from "../services/orientation";

interface Props {
  children: any;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <div>
      <Nav />
      <ImageViewer />
      <CallbackSensor />
      {children}
      <footer>
        <small>
          <a href="http://www.uyucode.net">Diseño: www.uyucode.net</a>
        </small>
      </footer>
    </div>
  );
}
