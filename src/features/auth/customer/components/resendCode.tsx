import { useEffect, useEffectEvent, useRef, useState } from "react";

import SmallTextButton from "@/components/ui/smallTextButton";

const formatter = new Intl.NumberFormat("fa", {
  minimumIntegerDigits: 2,
});

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${formatter.format(minutes)}:${formatter.format(seconds)}`;
}

const DEFAULT_TIMER = 2 * 60;

const ResendCode = ({ onClick }: { onClick: () => void }) => {
  const [timer, setTimer] = useState<number>(DEFAULT_TIMER);
  const timerRef = useRef<NodeJS.Timeout>(null);
  const canResend = timer === 0;

  const minusTimer = () => {
    setTimer((t) => {
      if (t - 1 === 0 && timerRef.current) {
        clearInterval(timerRef.current);
      }

      return t - 1;
    });
  };

  const minusTimerEffect = useEffectEvent(minusTimer);
  useEffect(() => {
    timerRef.current = setInterval(minusTimerEffect, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleClick = () => {
    if (!canResend) return;
    onClick();
    setTimer(DEFAULT_TIMER);
    timerRef.current = setInterval(minusTimer, 1000);
  };

  return (
    <SmallTextButton
      onClick={handleClick}
      disabled={!canResend}
      className="me-0 ms-auto"
    >
      {canResend ? "ارسال دوباره" : <span>{formatTime(timer)}</span>}
    </SmallTextButton>
  );
};

export default ResendCode;
