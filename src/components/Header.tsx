import React from "react";
import { CircleUserRound } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="header" role="banner">
      <div className="profile-icon flex-center" aria-hidden="true">
        <CircleUserRound size={26} />
      </div>
      <h1>Profile Manager</h1>
      <p>Create and view your profile card</p>
    </header>
  );
};

export default Header;