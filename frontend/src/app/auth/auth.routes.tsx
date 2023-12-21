import path from "path";
import { element } from "prop-types";
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Register from '../login/Register';
import LogIn from "../login/LogIn";

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />} >
    <Element />
  </Suspense>
);

const AuthRoutes = () => {
  return (
    <Routes>
      {/*PUBLIC*/}
      < Route path={"/login"} element={< PublicRoute element={LogIn} />} />

      {/*PUBLIC*/}
      <Route path={"/register"} element={< PublicRoute element={Register} />} />

      {/*DEFAULT*/}
      <Route path={"/login"} element={< PublicRoute element={LogIn} />} />

      {/* DEFAULT */}
      <Route path='*' element={< Navigate to="/store" />} />
    </Routes>
  );
};

export default AuthRoutes;
