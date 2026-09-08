import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed = 30, active = true): string {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    setDisplayed('');
    indexRef.current = 0;
    const id = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return displayed;
}
