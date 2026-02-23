import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { AppProvider } from "../context/AppContext";
import Layout from "../layout/Layout";
import Search from "../pages/Search";
import Results from "../pages/Results";
import LandingPage from "../pages/LandingPage";

export default function NavProvider() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} /> 
            <Route path="/search" element={<Search />} />
            <Route path="/results" element={<Results />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}