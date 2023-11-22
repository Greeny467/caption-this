import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({ palette: { mode: "dark" } });

function App() {
  const [sidebar, setSidebar] = useState(true);
  
   const showSidebar = () => setSidebar(!sidebar);
  return (
    <ThemeProvider theme={darkTheme}>
    <div className={`wrapper ${sidebar ? 'collapse' : ''}`}>
      <Header showSidebar={showSidebar} />
      <main >
        <Outlet />
        <Sidebar />
      </main>
      <Footer />
    </div>
    </ThemeProvider>
  );
}

export default App;
