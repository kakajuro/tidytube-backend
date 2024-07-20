import { useState, useEffect } from "react";

function useIsLargeScreen() {

  const [isLargeScreen, setIsLargeScreen] = useState(false); 

  useEffect(() => {
    setIsLargeScreen(window.matchMedia("(min-width: 768px)").matches);

    const handleResize = (e:any) => {
      setIsLargeScreen(e.matches);
    };

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return {
    isLargeScreen
  }
};

export default useIsLargeScreen;