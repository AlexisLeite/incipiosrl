import { withPrefix } from "gatsby-link"
import React, { ReactElement } from "react"
import { Slide } from "react-slideshow-image"

interface HighlightSliceProps {
  images: string[]
}

export default function HighlightSlice({
  images,
}: HighlightSliceProps): ReactElement {
  return (
    <Slide easing="ease" id="Highlights">
      {images.map(image => (
        <div className="each-slide">
          <div style={{ backgroundImage: withPrefix(`url(${image})`) }}>
            <img src={withPrefix(image)} />
          </div>
        </div>
      ))}
    </Slide>
  )
}
