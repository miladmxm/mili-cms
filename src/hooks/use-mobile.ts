import { useEffect, useEffectEvent, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const window = global.window || { innerWidth: 1 };

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < MOBILE_BREAKPOINT,
  );

  const setIsMobileEvent = useEffectEvent((state: boolean) => {
    setIsMobile(state);
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobileEvent(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
