import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
