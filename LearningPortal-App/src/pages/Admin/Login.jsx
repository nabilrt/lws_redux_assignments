import lwsLogo from "../../assets/learningportal.svg";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
export default function AdminLoginPage() {
  const [login, { isError, isLoading, error }] = useLoginMutation();
  let navigate = useNavigate();
  const handleLogin = (formData) => {
    login({
      email: formData.get("email"),
      password: formData.get("password"),
    })
      .unwrap()
      .then(() => {
        navigate("/admin/dashboard");
      })
      .catch(() => {
        console.error("Couldn't");
      });
  };
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={lwsLogo} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Admin Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={handleLogin} method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required=""
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required=""
                className="login-input rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={isLoading}
            >
              Sign in
            </button>
            {isError && <div className="text-red-500">{error}</div>}
          </div>
        </form>
      </div>
    </section>
  );
}
