import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // easing (quanto menor, mais delay)
      const ease = 0.08;

      pos.current.x += (mouse.current.x - pos.current.x) * ease;
      pos.current.y += (mouse.current.y - pos.current.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `
          translate(${pos.current.x}px, ${pos.current.y}px)
          translate(-50%, -50%)
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <Box
      ref={glowRef}
      position="fixed"
      top={0}
      left={0}
      width="140px"
      height="90px"
      pointerEvents="none"
      zIndex={1}
      borderRadius="50%"
      background="radial-gradient(circle, rgba(255,210,210,0.12), transparent 70%)"
      filter="blur(20px)"
      opacity={0.6}
    />
  );
};

export default CursorGlow;