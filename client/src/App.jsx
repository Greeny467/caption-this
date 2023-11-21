import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
