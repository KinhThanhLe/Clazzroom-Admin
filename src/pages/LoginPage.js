import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";


function LoginPage() {
  const [registerNeeded, setRegisterNeeded] = useState();
  const [loadedUser, setLoadeUser] = useState();
  const [forgotPw, setForgotPw] = useState(false);
  const [error, setError] = useState();
  const { login: loginToContext, redirect } = useContext(AuthContext);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  function login(method, data, errorHandler) {
    const url = "http://localhost:3001/api/users/login";
    setSending(true);
    axios
      .post(url, data)
      .then((res) => {
        loginToContext(res.data.data);
        console.log(res.data.data);
        navigate("/admin/classes");

      })
      .catch((error) => {
        if (!errorHandler) return;
        errorHandler(error);
      })
      .finally(() => {
        setSending(false);
      });
  }

  // const LoginButton = () => {
  //   const { loginWithRedirect } = useAuth0();
  //   return (
  //     <button
  //       className="btn btn-primary btn-block"
  //       onClick={() => loginWithRedirect()}
  //     >
  //       Log In
  //     </button>
  //   );
  // };

  function onSubmit(data) {
    login("basic", data, (error) => {
      setError(error.response.data.message);
    });
  }

  function handleCancelRegistor() {
    setRegisterNeeded(false);
    setLoadeUser({});
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  return (
    <>
      <div className="min-h-screen bg-indigo-50 py-20">
        <div className="w-4/12 bg-white shadow-sm rounded-xl p-12 mx-auto">
          {!registerNeeded && !forgotPw && (
            <>
              <h1 className="text-center text-blue-gray-900 font-extrabold text-3xl mt-5 mb-9">
                Sign in
              </h1>
              {error && (
                <h6 className="text-red-600 text-sm italic mb-5">{error}</h6>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-8">
                  <div>
                    <Input
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required!",
                        },
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Invalid email",
                        },
                      })}
                      variant="standard"
                      label="Email"
                    ></Input>
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <small className="text-red-600 italic mb-5">
                          {message}
                        </small>
                      )}
                    />
                  </div>
                  <div>
                    <Input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required!",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters!",
                        },
                      })}
                      variant="standard"
                      label="Password"
                      type="password"
                    ></Input>
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => (
                        <small className="text-red-600 italic mb-5">
                          {message}
                        </small>
                      )}
                    />

                  </div>
                  <Button
                    className="w-full text-center p-3 bg-blue-400 text-sm rounded-md font-semibold normal-case"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Processing..." : "Continue"}
                  </Button>
                </div>
              </form>



            </>
          )}

        </div>
      </div>
    </>
  );
}

export default LoginPage;
