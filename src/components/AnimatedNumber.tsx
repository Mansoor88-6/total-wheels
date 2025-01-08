import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";

const AnimatedValue = styled(Typography)`
  font-size: 2.5rem !important;
  font-weight: 600 !important;
  background: linear-gradient(45deg, #00a2ff, #0077ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 8px 0 !important;
`;

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatValue?: (value: number) => string;
}

function AnimatedNumber({
  value,
  duration = 500,
  formatValue = (v) => v.toFixed(1),
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <AnimatedValue>{formatValue(displayValue)}</AnimatedValue>;
}

export default AnimatedNumber;
