import React, { useState, FormEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AuthModal.css";

interface AuthModalProps {
  onClose: () => void;
}

type AuthMode = "login" | "signup";

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setErr("");
    setSuccess("");
    setLoading(true);

    const res =
      mode === "login"
        ? await signIn(email, password)
        : await signUp(email, password, name);

    setLoading(false);

    if (res.error) {
      setErr(res.error);
    } else if (mode === "signup") {
      setSuccess("Account created. You can now sign in.");
      setMode("login");
    } else {
      onClose();
    }
  };

  const handleModeSwitch = (): void => {
    setMode(mode === "login" ? "signup" : "login");
    setErr("");
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-backdrop" onClick={onClose}></div>

      <div className="auth-modal">
        <button
          type="button"
          onClick={onClose}
          className="auth-modal-close"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        <h2 className="auth-modal-title">
          {mode === "login" ? "Welcome back" : "Join ApparelSpace"}
        </h2>

        <p className="auth-modal-subtitle">
          {mode === "login"
            ? "Sign in to your account."
            : "Create your account in seconds."}
        </p>

        <form onSubmit={submit} className="auth-form">
          {mode === "signup" && (
            <input
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Full name"
              required
              className="auth-input"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email address"
            required
            className="auth-input"
          />

          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            required
            className="auth-input"
          />

          {err && <p className="auth-error">{err}</p>}

          {success && <p className="auth-success">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="auth-footer-text">
          {mode === "login"
            ? "New to ApparelSpace?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={handleModeSwitch}
            className="auth-switch-btn"
          >
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;