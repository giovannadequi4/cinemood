import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const moveGradient = keyframes`
  0% { background-position: 0% 40%; }
  50% { background-position: 100% 60%; }
  100% { background-position: 0% 40%; }
`;

const float = keyframes`
  0% { transform: translate(-10%, -10%); }
  50% { transform: translate(10%, 10%); }
  100% { transform: translate(-10%, -10%); }
`;

const Background = () => {
  return (
    <>
      <Box
        position="fixed"
        inset={0}
        zIndex={0}
        bgGradient="linear(-45deg, #0b0c10, #101116, #1a1114, #220d12)"
        backgroundSize="250% 250%"
        animation={`${moveGradient} 35s ease-in-out infinite`}
      />

     <Box
        position="fixed"
        top="-20%"
        left="-20%"
        w="60vw"
        h="60vw"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(122,31,43,0.25), transparent 70%)"
        filter="blur(120px)"
        animation={`${float} 50s ease-in-out infinite`}
        zIndex={1}
        pointerEvents="none"
      />
    </>
  );
};

export default Background;