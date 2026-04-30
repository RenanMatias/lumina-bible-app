import { useActionState } from "react";
import { Stack, Heading, FormControl, TextInput, Radio, RadioGroup, Textarea, Button, Banner } from "@primer/react";

import { MainTemplate } from "templates/MainTemplate/index.jsx";

async function contactAction(prevState, formData) {
  const ticketObject = buildTicketObject(formData);
  const validationError = validateTicket(ticketObject);

  if (validationError) {
    return validationError;
  }

  return saveTicket(ticketObject);

  function buildTicketObject(formData) {
    return {
      type: formData.get("typeGroup"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      email: formData.get("email"),
    };
  }

  function validateTicket(ticketObject) {
    if (!ticketObject.type) {
      return { error_message: "Tipo de contato é obrigatório", field: "typeGroup", values: ticketObject };
    }

    if (!ticketObject.subject) {
      return { error_message: "Assunto é obrigatório", field: "subject", values: ticketObject };
    }

    if (!ticketObject.message) {
      return { error_message: "Mensagem é obrigatória", field: "message", values: ticketObject };
    }

    if (ticketObject.email && !ticketObject.email.includes("@")) {
      return { error_message: "E-mail inválido", field: "email", values: ticketObject };
    }

    return null;
  }

  async function saveTicket(ticketObject) {
    try {
      const response = await fetch("/api/v1/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketObject),
      });

      if (!response.ok) {
        const errorObject = await response.json().catch(() => null);

        return {
          error: true,
          message: errorObject?.message || "Não foi possível enviar a mensagem.",
          values: ticketObject,
        };
      }

      return { success: true };
    } catch (error) {
      return { error: true, message: error.message, values: ticketObject };
    }
  }
}

export default function StatusPage() {
  const [state, contactForm, isPending] = useActionState(contactAction, {});

  return (
    <MainTemplate>
      <form action={contactForm}>
        <Stack>
          <Heading as="h1" variant="large">
            Contato
          </Heading>
          {state?.error && <Banner title={state?.message} variant="critical" />}
          {state?.success && <Banner title="Mensagem enviada com sucesso!" variant="success" />}
          <RadioGroup required name="typeGroup">
            <RadioGroup.Label>Tipo de Contato</RadioGroup.Label>
            <FormControl>
              <Radio value="bug" defaultChecked={state?.values?.type === "bug"} />
              <FormControl.Label>Bug</FormControl.Label>
            </FormControl>
            <FormControl>
              <Radio value="feature_request" defaultChecked={state?.values?.type === "feature_request"} />
              <FormControl.Label>Sugestão</FormControl.Label>
            </FormControl>
            <FormControl>
              <Radio value="other" defaultChecked={state?.values?.type === "other"} />
              <FormControl.Label>Outros</FormControl.Label>
            </FormControl>
            {state?.field === "typeGroup" && (
              <FormControl.Validation variant="error">{state.error_message}</FormControl.Validation>
            )}
          </RadioGroup>
          <FormControl required>
            <FormControl.Label>Assunto</FormControl.Label>
            <TextInput block={true} name="subject" defaultValue={state?.values?.subject || ""} />
            {state?.field === "subject" && (
              <FormControl.Validation variant="error">{state.error_message}</FormControl.Validation>
            )}
          </FormControl>
          <FormControl required>
            <FormControl.Label>Mensagem</FormControl.Label>
            <Textarea cols={60} block={true} name="message" defaultValue={state?.values?.message || ""} />
            {state?.field === "message" && (
              <FormControl.Validation variant="error">{state.error_message}</FormControl.Validation>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <TextInput name="email" autoCapitalize="none" block={true} defaultValue={state?.values?.email || ""} />
            {state?.field === "email" && (
              <FormControl.Validation variant="error">{state.error_message}</FormControl.Validation>
            )}
          </FormControl>
          <Button type="submit" variant="primary" disabled={isPending} loading={isPending}>
            {isPending ? "Enviando..." : "Enviar"}
          </Button>
        </Stack>
      </form>
    </MainTemplate>
  );
}
