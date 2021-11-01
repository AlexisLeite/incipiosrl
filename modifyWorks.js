const fs = require("fs")
const path = require("path")

const works = fs.readdirSync(path.resolve(__dirname, "./src/trabajos"))
for (let work of works) {
  const desc = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `./src/trabajos/${work}/desc.json`))
  )
  desc.images = desc.imagenes.map(image => {
    image.src = image.src.replace("{rutaApp}", "")
    return image
  })
  ;[("\n", "\r", "<p>", "</p>")].forEach(del => {
    desc.excerpt = desc.excerpt.replace(del, "")
    desc.description = desc.description.replace(del, "")
  })
  desc.portada.src = desc.portada.src.replace("{rutaApp}", "")
  delete desc.descCorta
  delete desc.descLarga
  fs.writeFileSync(
    path.resolve(__dirname, `./src/trabajos/${work}/desc.json`),
    JSON.stringify(desc)
  )
}
