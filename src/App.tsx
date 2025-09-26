import { LinearProgress } from "@mui/material";
import { useAuth } from "./context/AuthContext";
import { PrivateRouter, PublicRouter } from "./routes/section";
import '@/global.css';


function App() {
  const { isAuthenticated } = useAuth();
  const auth = isAuthenticated();

  if (auth === null) {
    // Enquanto verifica o token no AuthContext
    return <LinearProgress />;
    // ou algum Spinner bonito
  }

  return auth ? <PrivateRouter /> : <PublicRouter />;
}


export default App
