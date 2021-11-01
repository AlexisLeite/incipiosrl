import * as React from "react";
import "../styles/main.sass";
import { MdEmail, MdMap, MdOutlineSend, MdPhone } from "react-icons/md";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [length, setLength] = React.useState({ input: 0, textarea: 0 });
  return (
    <>
      <Helmet>
        <title>Medios de contacto con Incipio SRL</title>
      </Helmet>
      <div className="Stage" id="ContactStage">
        <div id="Contact">
          <div>
            <h3>Nuestros medios</h3>
            <div>
              <strong>
                <MdPhone />
              </strong>
              <a href="tel:24071813">2407 1813</a>
            </div>
            <div>
              <strong>
                <MdEmail />
              </strong>
              <a href="mailto:incipiosrl@incipiosrl.com.uy">
                incipiosrl@incipiosrl.com.uy
              </a>
            </div>
            <div>
              <strong>
                <MdMap />
              </strong>
              <a href="https://goo.gl/maps/yjWgpSTdGPSqj8oa7" target="_blank">
                {" "}
                Gaboto 1386 of. 103.
              </a>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              onSubmit={ev => {
                ev.preventDefault();
                const subject = document.getElementById(
                  "Subject"
                ) as HTMLInputElement;
                const phone = document.getElementById(
                  "Phone"
                ) as HTMLInputElement;
                const message = document.getElementById(
                  "Message"
                ) as HTMLInputElement;

                fetch("http://www.uyucode.net/api/mail", {
                  method: "POST",
                  body: JSON.stringify({
                    subject: subject.value,
                    body: `Teléfono: ${phone.value}. Mensaje: ${message.value}`,
                  }),
                });

                subject.value = "";
                phone.value = "";
                message.value = "";

                alert("Mensaje enviado con éxito");
              }}
            >
              <input
                id="Subject"
                type="text"
                minLength={5}
                required={true}
                placeholder="Dinos por qué escribes"
                onKeyDown={(ev: React.KeyboardEvent) => {
                  const target = ev.target as HTMLInputElement;
                  setTimeout(
                    () =>
                      setLength({
                        input: target.value.length,
                        textarea: length.textarea,
                      }),
                    0
                  );
                }}
              />
              <input
                id="Phone"
                type="text"
                required={true}
                pattern="[0-9]{5,15}"
                placeholder="Teléfono"
              />
              <textarea
                id="Message"
                required={true}
                minLength={5}
                placeholder="Mensaje"
                onKeyDown={(ev: React.KeyboardEvent) => {
                  const target = ev.target as HTMLInputElement;
                  setTimeout(() => {
                    setLength({
                      input: length.input,
                      textarea: target.value.length,
                    });
                  }, 0);
                }}
              ></textarea>
              {length.input >= 5 && length.textarea >= 5 && (
                <button type="submit">Enviar mensaje</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
