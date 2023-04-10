import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { LoginContainer } from "./LoginContainer";
import { LoginFormContainer } from "./LoginFormContainer";
import { LoginInput } from "./LoginInput";
import { store } from "../../store";

const Register = () => {
  const user = useContext(store).state.user;
  const { dispatch } = useContext(store);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function register(event){
    event.stopPropagation();
    console.log("register called")
    dispatch({
      type: "CREATE_USER",
      payload: { name, email, password },
    });
  };

  // useEffect(() => {
  //   // if (loading) return;
  //   // if (user) navigate("/buy");
  // }, [user, navigate]);
  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <LoginInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="w-100 h-12 rounded bg-green-700 text-xl text-white shadow-lg"
          onClick={(e) => register(e)}
        >
          Register
        </button>
        <div className="w-100 text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="underline hover:text-gray-600">
            Login
          </Link>{" "}
          now.
        </div>
      </LoginFormContainer>
    </LoginContainer>
  );
};
export default Register;
