import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Chat from "./components/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat/>,
    },
  ]);

  return (
    <div className="app">
      <>
        <Header />
        <AppBody>
          <Sidebar />
          <React.StrictMode>
            <RouterProvider router={router} />
            {/** Chat */}
          </React.StrictMode>
        </AppBody>
      </>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
