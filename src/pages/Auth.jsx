import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        return;
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user.user.email);

      if (user) {
        setError(null);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <form
        className="flex flex-col items-center justify-center space-y-4"
        onSubmit={signUp} // Handle form submission
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button className="px-4 py-2 bg-blue-400 rounded-xl" type="submit">
          Sign Up
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {isLoggedIn && (
        <button className="px-4 py-2 bg-red-400 rounded-xl" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Auth;
