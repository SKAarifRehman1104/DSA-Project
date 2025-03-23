
import { useState, useEffect, useRef } from "react";
import quotes from "@/data/quotes";

const QuoteDisplay = () => {
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const [isAnimating, setIsAnimating] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for fade out animation to complete before changing quote
      setTimeout(() => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(newQuote);
        setIsAnimating(false);
      }, 500);
      
    }, 10000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    if (quoteRef.current) {
      // Create floating particles that resemble data nodes
      const particles = Array.from({ length: 8 }, (_, i) => {
        const particle = document.createElement('div');
        const size = 4 + Math.random() * 8; // Varying sizes
        
        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = i % 2 === 0 ? 
          'linear-gradient(90deg, #FF6B6B, #FFE66D)' : 
          'linear-gradient(90deg, #4ECDC4, #556270)';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${3 + Math.random() * 5}s ease-in-out infinite`;
        particle.style.opacity = '0';
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particle.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
        
        return particle;
      });
      
      particles.forEach(p => quoteRef.current?.appendChild(p));
      
      // Add animated "connection lines" between particles to simulate data structure connections
      const createConnections = () => {
        const connections = document.querySelectorAll('.connection-line');
        connections.forEach(conn => conn.remove());
        
        if (!quoteRef.current) return;
        
        const rect = quoteRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const line = document.createElement('div');
        line.className = 'connection-line absolute';
        line.style.width = '100%';
        line.style.height = '100%';
        line.style.top = '0';
        line.style.left = '0';
        line.style.background = 'radial-gradient(circle at center, transparent 30%, rgba(255, 168, 76, 0.05) 70%)';
        line.style.animation = 'pulse 4s ease-in-out infinite';
        line.style.pointerEvents = 'none';
        
        quoteRef.current.appendChild(line);
      };
      
      createConnections();
      const connectionInterval = setInterval(createConnections, 4000);
      
      return () => {
        particles.forEach(p => p.remove());
        clearInterval(connectionInterval);
        document.querySelectorAll('.connection-line').forEach(conn => conn.remove());
      };
    }
  }, []);

  return (
    <div 
      ref={quoteRef}
      className={`p-4 rounded-lg max-w-xl mx-auto mb-8 h-36 flex flex-col justify-center transform transition-all duration-1000 hover:scale-105 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/20 via-[#FFE66D]/10 to-[#4ECDC4]/20 opacity-30 pointer-events-none"></div>
      
      <div className="overflow-hidden relative z-10">
        <p className="italic text-gradient line-clamp-2 font-medium">&ldquo;{quote.text}&rdquo;</p>
        <p className="text-right text-sm mt-2 text-[#FF6B6B]">— {quote.author}</p>
      </div>
      
      {/* Animated border effect on hover */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
      
      {/* Data structure visualization effect */}
      <div className="dsa-nodes-effect absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default QuoteDisplay;
