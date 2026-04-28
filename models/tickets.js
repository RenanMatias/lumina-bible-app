import github from "../infra/github.js";
import { ValidationError } from "../infra/errors.js";

const VALID_TICKET_TYPES = ["bug", "feature_request", "other"];

async function create(ticketInput) {
  validateTicketInput(ticketInput);
  const { title, body, labels } = buildGithubIssuePayload(ticketInput);
  const createdIssue = await github.createIssue(title, body, labels);
  return createdIssue;
}

function validateTicketInput({ type, subject, message }) {
  if (!type || !VALID_TICKET_TYPES.includes(type)) {
    throw new ValidationError({
      message: "O campo type é obrigatório. Os valores aceitos são: bug, feature_request ou other.",
      action: 'Verifique se o campo "type" foi enviado e está com um valor válido (bug, feature_request ou other)',
    });
  }

  if (!subject) {
    throw new ValidationError({
      message: "O campo subject é obrigatório.",
      action: 'verifique se o campo "subject".',
    });
  }

  if (!message) {
    throw new ValidationError({
      message: "O campo message é obrigatório.",
      action: 'verifique se o campo "message".',
    });
  }
}

function buildGithubIssuePayload({ type, subject, message, email }) {
  return {
    title: subject,
    body: `**Email do remetente:** ${email}\n\n**Mensagem:**\n${message}`,
    labels: [type],
  };
}

const tickets = {
  create,
};

export default tickets;
