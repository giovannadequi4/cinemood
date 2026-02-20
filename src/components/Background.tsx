import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const moveGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Background = () => {
  return (
    <>
      <Box
        position="fixed"
        inset={0}
        zIndex={0}
        bgGradient="linear-gradient(-45deg, #000000, #1a202c, #285e61, #322659)"
        backgroundSize="400% 400%"
        animation={`${moveGradient} 20s ease infinite`}
      />

      <Box
        position="fixed"
        inset={0}
        zIndex={1}
        backdropFilter="blur(60px)"
        bg="rgba(0,0,0,0.3)"
        pointerEvents="none"
      />
    </>
  );
};

export default Background;
