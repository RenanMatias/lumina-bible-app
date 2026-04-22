import { createRouter } from "next-connect";

import controller from "infra/controller.js";
import tickets from "models/tickets.js";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .post(controller.canRequest("create:ticket"), postHandler)
  .handler(controller.errorHandlers);

async function postHandler(request, response) {
  const type = request.body.type;
  const subject = request.body.subject;
  const message = request.body.message;
  const email = request.body.email;

  const ticketObject = { type, subject, message, email };

  const createdTicket = await tickets.create(ticketObject);

  return response.status(201).json(createdTicket);
}
