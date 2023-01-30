import path, { join } from "path";
import { Edge } from "edge.js";
import gmailTransport from "./gmail.js";

const send = (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
    from: "teona.piranishvili1@gmail.com",
  };

  return gmailTransport.sendMail(options);
};

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

export const sendEmailConfirmation = async (to, hash, name, backLink) => {
  const html = edge.renderSync("confirm-email", {
    link: `${backLink}?hash=${hash}`,
    name,
  });
  return send(to, "Email Confirmation", html);
};
