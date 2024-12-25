import LoginForm from "@/components/login/login";
import { cookies } from "next/headers";

const LoginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  return (
    <main>
      <LoginForm initialToken={token} />
    </main>
  );
};

export default LoginPage;