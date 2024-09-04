const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PSW,
  },
});

export const mailBienvenida = async (mail, username) =>{
  const info = await transporter.sendMail({
    from: '"RollingPuppies Team" <noreply@rollingPuppies.com>',
    to: mail,
    subject: "Bienvenido a la comunidad Rolling Puppies",
    html: 
    `
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
}