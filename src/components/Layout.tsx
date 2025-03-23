
import React, { useEffect } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Add page transition effect on component mount
  useEffect(() => {
    // Fade in the content
    const content = document.getElementById("page-content");
    if (content) {
      content.classList.add("animate-fade-in");
    }

    // Animate elements with the 'animate-on-scroll' class when they become visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main id="page-content" className="container mx-auto pt-20 pb-12 px-4">
        {children}
      </main>
      <footer className="border-t border-white/10 py-6">
        <div className="container mx-auto mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DSA Visualizer • Designed with precision and simplicity</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
