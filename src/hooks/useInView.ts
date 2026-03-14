import { useState, useEffect, useRef, MutableRefObject } from 'react';

/**
 * useInView Hook
 * Detects when an element enters the viewport using Intersection Observer
 */
export const useInView = (options?: IntersectionObserverInit & { triggerOnce?: boolean }): [MutableRefObject<any>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options?.triggerOnce !== false) {
          observer.unobserve(entry.target);
        }
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView];
};
