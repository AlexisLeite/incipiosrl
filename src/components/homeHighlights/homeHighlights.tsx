import React, { ReactElement } from "react";
import { withPrefix } from "gatsby-link";
import { openImage } from "../imageViewer/imageViewer";
import "./HomeHighlights.sass";
import { onOrientationChange } from "./../../services/orientation";

interface HomeHighlightProps {
  images: string[];
  width: number;
}

export default function HomeHighlight({
  images,
}: HomeHighlightProps): ReactElement {
  const [translation, setTranslation] = React.useState<number>(5);
  const [start, setStart] = React.useState(0);
  const [animating, setAnimating] = React.useState(true);
  const [focused, setFocused] = React.useState("");
  const [orientation, setOrientation] = React.useState("landscape");
  React.useEffect(() => {
    const width = window.innerWidth;
    const velocity = 100;
    const sliceWidth = orientation === "landscape" ? 0.25 : 0.5;
    let lastTimestamp: number | undefined = undefined;

    function animation(timestamp: number) {
      if (animating) {
        const ellapsed = (timestamp - (lastTimestamp ?? timestamp)) / 1000;
        lastTimestamp = timestamp;

        let newTranslation =
          translation - velocity * (ellapsed > 0 ? ellapsed : 0.01);

        if (Math.abs(newTranslation) > width * sliceWidth * 2) {
          newTranslation = newTranslation + width * sliceWidth;
          setStart(start + 1 === images.length ? 0 : start + 1);
        }

        setTranslation(newTranslation);
      } else window.requestAnimationFrame(animation);
    }

    window.requestAnimationFrame(animation);
  }, [translation, animating]);
  React.useEffect(() => {
    return onOrientationChange(orientation => {
      setOrientation(orientation);
      console.log(orientation);
    });
  }, []);
  const orderedImages: string[] = [];
  for (let i = start; i < images.length; i++) orderedImages.push(images[i]);
  for (let i = 0; i < start; i++) orderedImages.push(images[i]);
  orderedImages.push(images[start]);
  return (
    <div style={{ width: "100vw" }}>
      <div className="slices" style={{}}>
        <div>
          {orderedImages.map((image, i) => {
            const scale = image === focused ? "scale(1.5)" : "";
            return (
              <div
                key={i}
                onMouseEnter={() => {
                  setAnimating(false);
                  setFocused(image);
                }}
                onMouseLeave={() => {
                  setAnimating(true);
                  setFocused("");
                }}
                style={{
                  transform: `translateX(${translation}px)`,
                  zIndex: scale !== "" ? 10000 : "auto",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    backgroundImage: `url("${withPrefix(image)}")`,
                    transform: scale,
                    transition: "transform .15s",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    openImage({
                      image: withPrefix(image),
                      images: orderedImages.filter(
                        current => current !== image
                      ),
                    })
                  }
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
