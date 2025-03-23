
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface AnimatedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  delay?: number;
  bgColor?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  icon,
  to,
  delay = 0,
  bgColor = "from-accent/10 to-transparent"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  // 3D effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMousePosition({ x, y });
    }
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Generate dynamic data structure shapes based on route
  const generateDsaBackground = () => {
    if (!isHovered) return null;
    
    // Different background shapes based on the card type
    let elements = null;
    
    if (to.includes('array')) {
      elements = (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="flex space-x-1">
            {[40, 25, 60, 30, 45, 20].map((height, idx) => (
              <div 
                key={idx} 
                className="w-3 bg-gradient-to-t from-[#FF6B6B] to-[#FFE66D] rounded-t-sm animate-pulse" 
                style={{ height: `${height}px`, animationDelay: `${idx * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      );
    } else if (to.includes('linked-list')) {
      elements = (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="flex items-center">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#556270] flex items-center justify-center">
                </div>
                {idx < 2 && (
                  <div className="w-4 h-0.5 bg-[#4ECDC4]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (to.includes('stack') || to.includes('queue')) {
      elements = (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-16 h-20 border-2 border-[#FFE66D] rounded-md flex flex-col-reverse">
            {[1, 2, 3].map((_, idx) => (
              <div 
                key={idx} 
                className="w-full h-5 bg-gradient-to-r from-[#FFE66D] to-[#F3A183] border-t border-white/20"
              ></div>
            ))}
          </div>
        </div>
      );
    } else if (to.includes('search')) {
      elements = (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div 
                key={idx} 
                className={`w-5 h-5 rounded-full ${idx === 2 ? 'bg-[#F3A183] animate-pulse' : 'bg-[#F3A183]/50'}`}
              ></div>
            ))}
          </div>
        </div>
      );
    } else if (to.includes('sorting')) {
      elements = (
        <div className="absolute inset-0 flex items-end justify-center opacity-10 pointer-events-none">
          <div className="flex items-end space-x-1 h-16">
            {[30, 60, 20, 50, 40, 10].map((height, idx) => (
              <div 
                key={idx} 
                className="w-3 bg-gradient-to-t from-[#556270] to-[#4ECDC4]"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      );
    } else if (to.includes('n-queen')) {
      elements = (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="grid grid-cols-4 grid-rows-4 w-20 h-20 border border-[#EC6F66]">
            {Array.from({ length: 16 }).map((_, idx) => (
              <div 
                key={idx} 
                className={`border border-[#EC6F66]/30 ${idx === 5 || idx === 10 ? 'flex items-center justify-center' : ''}`}
              >
                {(idx === 5 || idx === 10) && (
                  <div className="w-2 h-2 rounded-full bg-[#EC6F66]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return elements;
  };

  return (
    <Link
      ref={cardRef}
      to={to}
      className={cn(
        "relative flex flex-col items-start p-6 rounded-lg animate-on-scroll animated-card dsa-hover-effect",
        delay > 0 ? `delay-[${delay}ms]` : ""
      )}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: isHovered ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)",
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg) scale3d(1.05, 1.05, 1.05)`
          : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
        boxShadow: isHovered 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px 2px rgba(255, 107, 107, 0.2)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced card shine effect - visible on hover */}
      <div 
        className="card-shine absolute inset-0 w-full h-full pointer-events-none rounded-lg overflow-hidden"
        style={{ 
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(circle at ${50 + (mousePosition.x * 0.04)}% ${50 + (mousePosition.y * 0.04)}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
          transition: "opacity 0.3s ease"
        }}
      />
      
      {/* Background gradient that moves with mouse */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${bgColor} pointer-events-none rounded-lg`}
        style={{ 
          opacity: isHovered ? 0.3 : 0,
          transition: "opacity 0.3s ease",
          transform: isHovered 
            ? `perspective(1000px) translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`
            : "perspective(1000px) translateX(0) translateY(0)",
        }}
      />
      
      {/* DSA-themed background visualizations */}
      {generateDsaBackground()}
      
      {/* Content with 3D depth */}
      <div
        className={cn(
          "bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10 text-white p-3 rounded-lg mb-4 z-10",
          isHovered ? "shadow-lg" : ""
        )}
        style={{
          transform: isHovered ? "translateZ(30px) scale(1.1)" : "translateZ(0) scale(1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isHovered ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)" : "none",
        }}
      >
        {icon}
      </div>

      <h3 
        className="text-xl font-medium mb-2 z-10" 
        style={{
          transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
          transition: "transform 0.3s ease, text-shadow 0.3s ease",
          textShadow: isHovered ? "0 0 5px rgba(255, 255, 255, 0.2)" : "none",
        }}
      >
        {title}
      </h3>
      
      <p 
        className="text-muted-foreground text-sm mb-4 z-10"
        style={{
          transform: isHovered ? "translateZ(15px)" : "translateZ(0)",
          transition: "transform 0.3s ease",
        }}
      >
        {description}
      </p>

      <div
        className={cn(
          "mt-auto flex items-center text-sm group z-10",
          isHovered ? "translate-x-1 text-[#FF6B6B]" : "text-muted-foreground"
        )}
        style={{
          transform: isHovered ? "translateZ(25px)" : "translateZ(0)",
          transition: "transform 0.3s ease, color 0.3s ease",
        }}
      >
        <span>Explore</span>
        <ChevronRight
          size={16}
          className={cn(
            "ml-1 transition-transform duration-300",
            isHovered ? "translate-x-1" : ""
          )}
        />
      </div>
      
      {/* Interactive border glow effect */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{ 
          opacity: isHovered ? 1 : 0,
          boxShadow: `0 0 20px 3px rgba(255, 107, 107, ${isHovered ? 0.4 : 0})`,
          transition: "opacity 0.3s ease, box-shadow 0.3s ease",
        }}
      />
      
      {/* Floating particles effect (only visible on hover) */}
      {isHovered && (
        <>
          <div className="absolute w-2 h-2 rounded-full bg-[#FF6B6B]/20 animate-float" 
               style={{ top: '25%', left: '15%', animationDelay: '0s' }} />
          <div className="absolute w-3 h-3 rounded-full bg-[#4ECDC4]/30 animate-float" 
               style={{ top: '45%', right: '10%', animationDelay: '0.5s' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#FFE66D]/20 animate-float" 
               style={{ bottom: '20%', left: '30%', animationDelay: '1s' }} />
        </>
      )}
    </Link>
  );
};

export default AnimatedCard;
