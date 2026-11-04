import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Link, useSearchParams } from "react-router-dom";
import heroImage from "../assets/Hero02.webp";
import "../styles/auth.css";
import { hasClerk } from "../config/clerk";

export default function SignUp() {
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
          <span className="auth__eyebrow">JOIN ABAYA</span>
          <h1 className="auth__title">Join ABAYA.</h1>
          <p className="auth__subtitle">
            Create your account and make every detail yours.
          </p>
          {hasClerk ? (
            <ClerkSignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              afterSignUpUrl={redirectUrl}
            />
          ) : (
            <p className="auth__note">
              Authentication is not configured. Set VITE_CLERK_PUBLISHABLE_KEY to
              enable sign-up.
            </p>
          )}
          <p className="auth__switch">
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
