import React, { ReactElement } from "react"

export default function Img(props: any): ReactElement {
  const width = props.width + "px"
  const height = props.height + "px"
  return (
    <div style={{ width, height, display: "inline-block" }}>
      <img {...props} />
    </div>
  )
}
