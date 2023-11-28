import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { ApolloProvider } from "@apollo/client";
import client from './apollo';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({ palette: { mode: "dark" } });

function App() {
  const [sidebar, setSidebar] = useState(false);
  
   const showSidebar = () => setSidebar(!sidebar);

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ApolloProvider client = {client}>
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
    </ApolloProvider>
  );
}

export default App;
