import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import client from "./apollo";
import Auth from "./utils/auth";

import { ApolloProvider, createHttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material";


const darkTheme = createTheme({ palette: { mode: "dark" } });

function App() {
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    if(Auth.loggedIn() === false || !Auth.loggedIn()){
      Auth.logout();
    }
  }, [])

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
