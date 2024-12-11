import RegisterForm from "@/components/register/register";
import { cookies } from "next/headers";

const RegisterPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  return (
    <main>
      <RegisterForm initialToken={token} />
    </main>
  );
};

export default RegisterPage;