import LoginForm from "@/components/login/login";
import { cookies } from "next/headers";

const LoginPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;

  return (
    <main>
      <LoginForm initialToken={token} />
    </main>
  );
};

export default LoginPage;
