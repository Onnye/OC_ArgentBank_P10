import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { restoreSession } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    restoreSession(dispatch); // Restaurer l'état de l'utilisateur au démarrage
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
