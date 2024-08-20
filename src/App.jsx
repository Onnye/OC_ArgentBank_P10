import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { restoreSession } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(restoreSession()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Affiche un loader pendant que la session est restaurée
  }

  return (
    <div className="app-container">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
