import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { auth } from "./services/firebase";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [user, loading] = useAuthState(auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
    },
  ]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
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
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
