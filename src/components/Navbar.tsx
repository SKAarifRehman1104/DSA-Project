
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Code, Layers, Clock, Search, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: <Code className="w-4 h-4" /> },
    { name: "Array", path: "/array", icon: <Layers className="w-4 h-4" /> },
    { name: "Linked List", path: "/linked-list", icon: <ChevronUp className="w-4 h-4" /> },
    { name: "Stack & Queue", path: "/stack-queue", icon: <Layers className="w-4 h-4" /> },
    { name: "Search", path: "/search", icon: <Search className="w-4 h-4" /> },
    { name: "Sorting", path: "/sorting", icon: <Layers className="w-4 h-4" /> },
    { name: "N-Queen", path: "/n-queen", icon: <Clock className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tighter text-gradient relative group"
        >
          <span className="relative z-10 inline-block">
            DSA <span className="font-light">Visualizer</span>
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent/50 group-hover:w-full transition-all duration-300"></span>
          <span className="absolute -inset-x-2 -inset-y-1 z-0 scale-x-0 rounded-lg bg-white/5 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              onHoverStart={() => setHoveredLink(link.path)}
              onHoverEnd={() => setHoveredLink(null)}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.random() * 0.3 }}
            >
              <Link
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors relative py-1.5 px-2 rounded-md flex items-center gap-1.5 overflow-hidden group",
                  location.pathname === link.path
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {link.icon}
                  <span>{link.name}</span>
                </span>
                
                {/* Background hover effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                
                {/* Active indicator */}
                {location.pathname === link.path && (
                  <motion.span 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" 
                    layoutId="navbar-active-indicator"
                  />
                )}
                
                {/* Hover particles animation for active link */}
                {(hoveredLink === link.path || location.pathname === link.path) && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-accent/60"
                        initial={{ x: "50%", y: "100%", opacity: 0 }}
                        animate={{ 
                          y: "-100%", 
                          x: `${50 + (Math.random() * 40 - 20)}%`,
                          opacity: [0, 1, 0],
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.2, 
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden text-white p-2 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            className="md:hidden backdrop-blur-xl bg-black/90 border-b border-white/10 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="container mx-auto flex flex-col space-y-2 px-4"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-base py-2 px-4 rounded-md transition-colors flex items-center gap-2",
                      location.pathname === link.path
                        ? "text-white bg-white/10 border-l-2 border-accent"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
