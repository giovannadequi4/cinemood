import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";
import CursorGlow from "../components/CursorGlow";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";
import Loading from "../pages/Loading";
import ErrorState from "../pages/ErrorState";

const MotionBox = motion(Box);

const Layout = () => {
  const { loading, error } = useApp();
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <>
      <Background />
      <CursorGlow />

      <Box position="relative" zIndex={2} minH="100vh" p={6} w="100%">
        <Header />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="80vh"
          p={6}
          w="100%"
        >
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorState />
          ) : (
            <MotionBox
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.25 }}
              flex="1"
              display="flex"
              justifyContent="center"
              w="100%"
            >
              <Outlet />
            </MotionBox>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Layout;