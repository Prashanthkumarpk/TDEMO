import { useState, useEffect, useRef, RefObject } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '-50px' }
): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}
