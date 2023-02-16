import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { LoginContainer } from "./LoginContainer";
import { LoginFormContainer } from "./LoginFormContainer";
import { LoginInput } from "./LoginInput";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/stocks");
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
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="w-100 h-12 bg-green-700 text-xl text-white rounded shadow-lg"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button
          className="w-100 h-12 bg-white text-xl rounded shadow-lg"
          onClick={signInWithGoogle}
        >
          <p><span className="text-red-600 mr-2">G</span>  Login with Google</p>
        </button>
        <div className="w-100 text-center text-xs underline hover:text-gray-600">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className="w-100 justify-self-end text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="underline hover:text-gray-600">
            Register
          </Link>{" "}
          now.
        </div>
      </LoginFormContainer>
    </LoginContainer>
  );
}
export default Login