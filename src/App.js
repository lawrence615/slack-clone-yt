import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>This is the Homepage</div>,
    },
  ]);

  return (
    <div className="app">
      <Header/>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
