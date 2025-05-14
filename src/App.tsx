import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import VotePage from "./pages/VotePage";

function App() {
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
  }>(null);

  return (
    <>
      {user ? (
        <VotePage user={user} />
      ) : (
        <LoginPage onLoginSuccess={(userData) => setUser(userData)} />
      )}
    </>
  );
}

export default App;
