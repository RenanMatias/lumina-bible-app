import { useActionState } from "react";
import { Stack, Heading, FormControl, TextInput, Radio, RadioGroup, Textarea, Button, Banner } from "@primer/react";
import { MainTemplate } from "templates/MainTemplate/index.jsx";

async function contactAction(prevState, formData) {
  const values = {
    typeGroup: formData.get("typeGroup"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    email: formData.get("email"),
  };

  if (!values.typeGroup) {
    return { error: "Tipo de contato é obrigatório", field: "typeGroup", values };
  }

  if (!values.subject) {
    return { error: "Assunto é obrigatório", field: "subject", values };
  }

  if (!values.message) {
    return { error: "Mensagem é obrigatória", field: "message", values };
  }

  console.log(values.email && !values.email.includes("@"));

  if (values.email && !values.email.includes("@")) {
    return { error: "E-mail inválido", field: "email", values };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { success: true };
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
          {state?.success && <Banner title="Mensagem enviada com sucesso!" variant="success" />}
          <RadioGroup required name="typeGroup">
            <RadioGroup.Label>Tipo de Contato</RadioGroup.Label>
            <FormControl>
              <Radio value="bug" defaultChecked={state?.values?.typeGroup === "bug"} />
              <FormControl.Label>Bug</FormControl.Label>
            </FormControl>
            <FormControl>
              <Radio value="feature_request" defaultChecked={state?.values?.typeGroup === "feature_request"} />
              <FormControl.Label>Sugestão</FormControl.Label>
            </FormControl>
            <FormControl>
              <Radio value="other" defaultChecked={state?.values?.typeGroup === "other"} />
              <FormControl.Label>Outros</FormControl.Label>
            </FormControl>
            {state?.field === "typeGroup" && (
              <FormControl.Validation variant="error">{state.error}</FormControl.Validation>
            )}
          </RadioGroup>
          <FormControl required>
            <FormControl.Label>Assunto</FormControl.Label>
            <TextInput block={true} name="subject" defaultValue={state?.values?.subject || ""} />
            {state?.field === "subject" && (
              <FormControl.Validation variant="error">{state.error}</FormControl.Validation>
            )}
          </FormControl>
          <FormControl required>
            <FormControl.Label>Mensagem</FormControl.Label>
            <Textarea cols={60} block={true} name="message" defaultValue={state?.values?.message || ""} />
            {state?.field === "message" && (
              <FormControl.Validation variant="error">{state.error}</FormControl.Validation>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <TextInput name="email" autoCapitalize="none" block={true} defaultValue={state?.values?.email || ""} />
            {state?.field === "email" && <FormControl.Validation variant="error">{state.error}</FormControl.Validation>}
          </FormControl>
          <Button type="submit" variant="primary" disabled={isPending} loading={isPending}>
            {isPending ? "Enviando..." : "Enviar"}
          </Button>
        </Stack>
      </form>
    </MainTemplate>
  );
}
