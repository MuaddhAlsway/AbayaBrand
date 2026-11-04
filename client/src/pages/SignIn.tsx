import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Link, useSearchParams } from "react-router-dom";
import heroImage from "../assets/Hero01.webp";
import "../styles/auth.css";
import { hasClerk } from "../config/clerk";

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/account";

  return (
    <main className="auth">
      <div className="auth__container">
        <div className="auth__visual">
          <img src={heroImage} alt="ABAYA editorial" loading="lazy" />
          <div className="auth__visual-overlay">
            <span className="auth__brand">ABAYA</span>
            <span className="auth__brand-arabic" lang="ar">
              عباية
            </span>
          </div>
        </div>
        <div className="auth__form">
          <span className="auth__eyebrow">YOUR ABAYA ACCOUNT</span>
          <h1 className="auth__title">Welcome back.</h1>
          <p className="auth__subtitle">Sign in to continue your experience.</p>
          {hasClerk ? (
            <ClerkSignIn
              routing="path"
              path="/sign-in"
              signUpUrl={`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`}
              afterSignInUrl={redirectUrl}
            />
          ) : (
            <p className="auth__note">
              Authentication is not configured. Set VITE_CLERK_PUBLISHABLE_KEY to
              enable sign-in.
            </p>
          )}
          <p className="auth__switch">
            New to ABAYA? <Link to="/sign-up">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
