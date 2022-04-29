import { useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";

import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

export default function App() {
  const [controller] = useMaterialUIController();
  const { direction, sidenavColor } = controller;
  const { pathname } = useLocation();

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <>
      <CssBaseline />
      <Sidenav color={sidenavColor} brandName="HJW" routes={routes} />
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}
