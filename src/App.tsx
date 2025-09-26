import { useAuth } from "./context/AuthContext";
import { PrivateRouter, PublicRouter } from "./routes/section";
import '@/global.css';


function App() {

  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? (
    <PrivateRouter />
  ) : (
    <PublicRouter />
  );
}

export default App
