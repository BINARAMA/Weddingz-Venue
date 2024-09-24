import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      console.log('ScrollToTop: Route changed to', pathname);
      window.scrollTo(0, 0);
    });
    
  return null;
};

export default ScrollToTop;
