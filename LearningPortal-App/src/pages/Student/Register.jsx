import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function StudentRegisterPage() {
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSuccess) navigate("/student/courseplayer");
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmPasswordError(null);
    if (credentials.password !== credentials.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    const updatedCredentials = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      role: "student",
    };
    register(updatedCredentials)
      .unwrap()
      .then(() => {
        navigate("/student/courseplayer");
      })
      .catch(() => {});
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="../assets/image/learningportal.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required=""
                className="login-input rounded-t-md"
                placeholder="Student Name"
                value={credentials.name}
                onChange={handleInputChange}
              />
            </div>
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
                className="login-input "
                placeholder="Email address"
                value={credentials.email}
                onChange={handleInputChange}
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
                className="login-input"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                required=""
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={
                isLoading ||
                credentials.password !== credentials.confirmPassword
              }
            >
              Create Account
            </button>
          </div>
          {confirmPasswordError && (
            <div className="text-red-500">{confirmPasswordError}</div>
          )}
          {isError && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </section>
  );
}
