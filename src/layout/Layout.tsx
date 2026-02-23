import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Background from "../components/Background";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";
import Loading from "../pages/Loading";

const Layout = () => {
  const { loading } = useApp();

  return (
    <>
      <Background />

      <Box position="relative" zIndex={2} minH="100vh" p={6} w="100%">
        <Header />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="80vh"
          p={6}
        >
          {loading ? (
            <Loading />
          ) : (
            <Box flex="1" display="flex" justifyContent="center">
              <Outlet />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Layout;