import { useRef, useEffect, RefObject } from "react"

type CallbackFunction = () => void;

export const useOutsideClick = (callback: CallbackFunction): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback, ref]);

  return ref;
}
