import { useEffect } from "react";

const useEscapeKey = (callback) => {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key !== "Escape" || typeof callback !== "function") return;
      event.preventDefault();
      callback();
    }
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);
};

export default useEscapeKey;
