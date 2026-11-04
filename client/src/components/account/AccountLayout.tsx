import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";
import "../../styles/account.css";

export default function AccountLayout() {
  return (
    <main className="account">
      <div className="account__container">
        <AccountSidebar />
        <div className="account__content">
          <Outlet />
        </div>
      </div>
    </main>
  );
}