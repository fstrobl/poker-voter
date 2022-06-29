import s from "./Header.module.css";
import { useUser } from "../../../utils/useUser";
import { supabase } from "../../../../client";

export default function Header() {
  const { userDetails, authenticatedState } = useUser();
  console.log("ud", userDetails);

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <header className={s.header}>
      <span>Poker Voter</span>
      {authenticatedState === "authenticated" && userDetails && (
        <nav className={s.nav}>
          <span>{userDetails.name}</span>
          <span onClick={handleLogout}>Log out</span>
        </nav>
      )}
      {authenticatedState === "authenticated" && !userDetails && <span onClick={handleLogout}>Log out</span>}
    </header>
  );
}
