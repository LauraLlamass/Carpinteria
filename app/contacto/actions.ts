"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const initialDelay = 0;

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (initialDelay > 0) {
    await new Promise((resolve) => setTimeout(resolve, initialDelay));
  }

  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email");
  const message = getStringValue(formData, "message");

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (name.length < 2) {
    fieldErrors.name = "El nombre debe tener al menos 2 caracteres.";
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = "Introduce un email válido.";
  }

  if (message.length < 20) {
    fieldErrors.message = "El mensaje debe tener al menos 20 caracteres.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Revisa los campos marcados antes de enviar.",
      fieldErrors,
    };
  }

  return {
    status: "success",
    message:
      "Consulta recibida. Te responderemos con una primera valoración del proyecto.",
  };
}
