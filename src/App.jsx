import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SearchProvider } from "./context/SearchContext";
import { initSmoothScroll } from "./lib/smoothScroll";
import SearchPage from "./pages/SearchPage";
import GameDetailsPage from "./pages/GameDetail";
import FavoritesPage from "./pages/FavoritesPage";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => lenis.destroy();
  }, []);

  return (
    <SearchProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><SearchPage /></AnimatedPage>} />
          <Route path="/game/:id" element={<AnimatedPage><GameDetailsPage /></AnimatedPage>} />
          <Route path="/favorites" element={<AnimatedPage><FavoritesPage /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </SearchProvider>
  );
}

export default App;