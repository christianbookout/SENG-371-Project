import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { LoginContainer } from "./LoginContainer";
import { LoginFormContainer } from "./LoginFormContainer";
import { LoginInput } from "./LoginInput";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/stocks");
  }, [user, loading]);

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
          className="w-100 h-12 bg-green-700 text-xl text-white rounded shadow-lg"
          onClick={register}
        >
          Register
        </button>
        <button
          className="w-100 h-12 bg-white text-xl rounded shadow-lg"
          onClick={signInWithGoogle}
        >
          <span className="text-red-600 mr-2">G</span>Register with Google
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
}
export default Register;
