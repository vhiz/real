import LoginForm from "../components/LoginForm";
import SEO from "../components/Seo";

export default function Login() {
  return (
    <div className="flex h-full items-center justify-center">
      <SEO
        title={"Login Page"}
        description={"Create your account"}
        Url={"/login"}
        img={"https://img.lovepik.com/element/45009/2341.png_860.png"}
      />
      <div className="shadow-md bg-base-200 flex flex-col gap-y-2 w-[80vw] h-[44vh] rounded-md items-center p-4 lg:w-[40vw]">
        <h2 className="text-xl font-semibold">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
