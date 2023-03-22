import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import { LoginContainer } from "./LoginContainer";
import { LoginFormContainer } from "./LoginFormContainer";
import { LoginInput } from "./LoginInput";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/buy");
  }, [user, loading]);
  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="w-100 h-12 bg-black text-xl text-white"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account?
          <Link to="/register" className="underline hover:text-gray-600">
            Register
          </Link>
          now.
        </div>
      </LoginFormContainer>
    </LoginContainer>
  );
};
export default Reset;
