import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContainer } from "./LoginContainer";
import { LoginFormContainer } from "./LoginFormContainer";
import { LoginInput } from "./LoginInput";
import { store } from "../../store";

const Register = () => {
  const navigate = useNavigate();
  const user = useContext(store).state.user;
  const { dispatch } = useContext(store);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (email && name && password) {
      await dispatch({
        type: "CREATE_USER",
        payload: { fullname: name, email: email, password: password },
      }).then(navigate("/buy"));
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/buy");
    }
  }, [user]);

  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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
          className="w-100 hover: h-12 rounded bg-green-700 bg-green-600 text-xl text-white shadow-lg"
          onClick={() => register()}
        >
          Register
        </button>
        <button
          className="w-100 h-12 rounded bg-white text-xl shadow-lg"
          // onClick={signInWithGoogle}
        >
          <span className="mr-2 text-red-600">G</span>Register with Google
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
