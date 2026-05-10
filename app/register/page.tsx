import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-background bg-surface p-8 text-primary">
          <h1 className="font-serif text-3xl font-semibold">Crear cuenta</h1>


          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
