import React, { useEffect, useState } from "react";

export function useWindowSize(): number {
  const [windowSize, setWindowSize] = useState<number>();

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    // window.addEventListener("resize", handleResize());

    // handleResize();

    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
