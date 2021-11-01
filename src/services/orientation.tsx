type Orientation = "portrait" | "landscape";
type OrientationCallback = (orientation: Orientation) => void;
import React from "react";

let callbacks: OrientationCallback[] = [];
let lastOrientation: Orientation;

export function onOrientationChange(cb: OrientationCallback) {
  callbacks.push(cb);

  cb(lastOrientation);

  return () => {
    callbacks = callbacks.filter(callback => callback !== cb);
  };
}

export function CallbackSensor() {
  React.useEffect(() => {
    function handleResize() {
      const orientation: Orientation =
        window.innerWidth >= window.innerHeight ? "landscape" : "portrait";

      if (orientation !== lastOrientation) {
        lastOrientation = orientation;
        callbacks.forEach(cb => cb(orientation));
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <></>;
}
