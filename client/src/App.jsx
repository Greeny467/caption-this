import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { ApolloProvider, createHttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const httpLink = createHttpLink({
  uri: 'https://caption-this-production.up.railway.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [sidebar, setSidebar] = useState(false);
  
   const showSidebar = () => setSidebar(!sidebar);


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
