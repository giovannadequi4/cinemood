import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const moveGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Background = () => {
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={0}
      background={`
        radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.6)),
        linear-gradient(-45deg, #140305, #1b0609, #26080d, #0f0203)
      `}
      backgroundSize="300% 300%"
      animation={`${moveGradient} 30s ease infinite`}
      _after={{
        content: '""',
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")
        `,
        opacity: 0.08,
        mixBlendMode: "soft-light",
      }}
    />
  );
};

export default Background;