import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { AppProvider } from "../context/AppContext";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Results from "../pages/Results";

export default function NavProvider() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}