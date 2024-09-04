const transporter = require("./nodemailer.config");
const jwt = require("jsonwebtoken");

export const mailBienvenida = async (email, username) => {
  const info = await transporter.sendMail({
    from: '"RollingPuppies Team" <noreply@rollingPuppies.com>',
    to: email,
    subject: "Bienvenido a la comunidad Rolling Puppies",
    html: `
    <div style="display: flex; justify-content: center; ">
      <div style="width: 50%; background-color: #FEF5EA;">
        <div>
            <h1 style="font-size: 2.5rem; text-align: center; background-color: #1c7373; color: #FFF; margin: 0;padding: 1rem 2rem;">${username}, te damos la bienvenida a la comunidad RollingPuppies</h1>
            <p style="font-size: 1.8rem; text-align: justify; line-height: 1.6rem; padding: 1.2rem 2rem;">Ya puedes agendar citas con nuestros profecionales para que tus mascotas tengan el mejor cuidado posible. No olvides de completar tu información personal y agregar a tus mascotas en el panel de usuarios</p>
            <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 2rem;">
                <a style="width: 50%; padding: 1rem 2rem; font-size: 1.5rem; background-color: #ce1d49; color: #FFF; font-weight: 700; border: 0; text-align: center;" href="#">Ir a RollingPuppies</a>
            </div>
        </div>
        <footer style="background-color: #252525; padding: 1rem 2rem;">
            <p style="margin: 0; color:#FFF">Esta notificación se ha enviado a ${mail}; Accede a la <a href="#" style="display: inline;">configuración</a> de envío de notificaciones para actualizar la dirección.</p>
            <p style="margin: 0; padding-top: 0.5rem; color:#FFF"><span style="font-weight: 700;">@ComunidadRollingPuppies</span>. Todos los derechos reservados. 2024</p>
        </footer>
      </div>
    </div>

    `,
  });
};

export const mailRetrievePassword = async (email, username) => {
  try {
    const userData = await usuarioModel.findOne({ email: email });
    if (!userData) {
      return {
        msg: "ERROR. El email no corresponde con un usuario registrado",
      };
    }
    const payload = {
      _id: usuario._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
  } catch {
    console.log(error);
  }

  const info = await transporter.sendMail({
    from: '"RollingPuppies Team" <noreply@rollingPuppies.com>',
    to: email,
    subject: "Recuperación de contraseña",
    html: `
     <div style="display: flex; justify-content: center">
      <div style="background-color: #fef5ea">
        <div>
          <h1
            style="
              font-size: 2.5rem;

              text-align: center;
              background-color: #1c7373;
              color: #fff;
              margin: 0;
              padding: 1rem 2rem;
            "
          >
            RollingPuppies
          </h1>
          <p
            style="
              font-size: 1.6rem;

              text-align: center;
              line-height: 1.8rem;
              margin: 2rem 0 0 0;
            "
          >
            Hola ${username},
          </p>
          <p
            style="
              margin: 0.5rem;

              font-size: 1.6rem;
              text-align: center;
              line-height: 1.8rem;
            "
          >
            Hemos recibido una solicitud para restablecer la contraseña de tu
            cuenta.
          </p>
          <p
            style="
              font-size: 1.6rem;

              text-align: center;
              line-height: 1.8rem;
            "
          >
            Si solicitaste restablecer tu contraseña, haz click en el enlace de
            abajo.
          </p>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 2rem;
            "
          >
            <a
              style="
                width: 50%;

                padding: 1rem 2rem;
                font-size: 1.5rem;
                background-color: #ce1d49;
                color: #fff;
                font-weight: 700;
                border: 0;
                text-align: center;
              "
              href=" http://localhost:5173/recuperar-contraseña?${token}"
              >Ir a RollingPuppies</a
            >
          </div>
          <div style="background-color: #dfd7cd; padding: 2rem 0.5rem">
            <p style="text-align: center">
              <span
                style="
                  display: block;

                  color: #b3261e;
                  font-weight: 800;
                  font-size: 1.2rem;
                  margin-bottom: 1rem;
                "
                >IMPORTANTE</span
              >
              Una vez confirmada, la nueva contraseña será válida para acceder
              al sitio web de RollingPuppies.
            </p>
            <p style="text-align: center">
              Si no hiciste esta solicitud, por favor, ignorar este correo
              electrónico.
            </p>
          </div>
        </div>
        <footer style="background-color: #252525; padding: 1rem 2rem">
          <p style="margin: 0; padding-top: 0.5rem; color: #fff">
            <span style="font-weight: 700">@ComunidadRollingPuppies</span>.
            Todos los derechos reservados. 2024
          </p>
        </footer>
      </div>
    </div>

    `,
  });
};
