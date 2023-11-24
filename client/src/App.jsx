import { Outlet } from "react-router-dom";
import { useState } from "react";

import { ApolloProvider } from "@apollo/client";
import client from './apollo';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";


function App() {
  const [sidebar, setSidebar] = useState(true);
  
   const showSidebar = () => setSidebar(!sidebar);
  return (
    <ApolloProvider client = {client}>
      <div className={`wrapper ${sidebar ? 'collapse' : ''}`}>
        <Header showSidebar={showSidebar} />
        <main >
          <Outlet />
          <Sidebar />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
