import React, { ReactElement } from "react";
import "./imageViewer.sass";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";

interface Props {}

type State = {
  image: any;
  images: any[];
  currentIndex?: 0;
};

let listeners: ((state: State) => void)[] = [];

export function openImage(props: State) {
  listeners.forEach(listener => listener(props));
}

export function Image({
  image,
  images,
  ...props
}: {
  image: string;
  images: string[];
  [key: string]: any;
}) {
  return (
    <div className="ImageViewerImage">
      <img
        src={image}
        {...props}
        onClick={ev => {
          props.onClick && props.onClick(ev);
          openImage({ image, images });
        }}
      />
    </div>
  );
}

export default function ImageViewer({}: Props): ReactElement {
  const [state, setState] = React.useState<State>({
    image: undefined,
    images: [],
  });
  const [index, setIndex] = React.useState<number>(0);
  React.useEffect(() => {
    const handle = (props: State) => {
      let found = false;
      for (let index in props.images)
        if (props.images[index] === props.image) {
          setIndex(parseInt(index));
          found = true;
          break;
        }

      if (!found) {
        props.images.unshift(props.image);
        setIndex(0);
      }

      setState(props);
    };
    listeners.push(handle);
    return () => {
      listeners = [];
    };
  }, []);
  return state.image ? (
    <div id="ImageViewer">
      <div
        className="Image"
        onClick={() => setState({ image: undefined, images: [] })}
      >
        <img src={state.images[index]} />
      </div>

      <AiFillLeftCircle
        className="Left"
        onClick={() => {
          setIndex(index === 0 ? state.images.length - 1 : index - 1);
        }}
      />
      <AiFillRightCircle
        className="Right"
        onClick={() => {
          setIndex(index === state.images.length - 1 ? 0 : index + 1);
        }}
      />
    </div>
  ) : (
    <></>
  );
}
