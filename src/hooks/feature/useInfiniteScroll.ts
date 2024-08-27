import { useEffect, useRef, useState } from 'react';

const useInfiniteScroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];

      setIsVisible(entry.isIntersecting);
    });
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return { isVisible, targetRef, setIsVisible };
};

export default useInfiniteScroll;
