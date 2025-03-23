
import { useRef, useEffect } from "react";
import AnimatedCard from "@/components/AnimatedCard";
import { 
  ListTree, 
  BarChart3, 
  ArrowRightLeft,
  Crown, 
  Layers, 
  SortDesc 
} from "lucide-react";

const FeaturesGrid = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsContainerRef.current) return;
      
      const cards = cardsContainerRef.current.querySelectorAll('.animated-card');
      const { left, top, width, height } = cardsContainerRef.current.getBoundingClientRect();
      
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2 - left;
        const cardCenterY = cardRect.top + cardRect.height / 2 - top;
        
        const distanceX = mouseX - cardCenterX;
        const distanceY = mouseY - cardCenterY;
        
        const maxRotation = 10;
        const maxDistance = Math.max(width, height) / 2;
        
        const rotateY = maxRotation * (distanceX / maxDistance) * -0.5;
        const rotateX = maxRotation * (distanceY / maxDistance) * 0.5;
        
        cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const shine = cardElement.querySelector('.card-shine') as HTMLElement;
        if (shine) {
          const shineMoveX = (distanceX / maxDistance) * 100 + 50;
          const shineMoveY = (distanceY / maxDistance) * 100 + 50;
          shine.style.background = `radial-gradient(circle at ${shineMoveX}% ${shineMoveY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
        }
      });
    };
    
    // Add the DSA-themed background elements
    const createDsaBackgroundElements = () => {
      if (!cardsContainerRef.current) return;
      
      // Create background nodes and connections
      const bgContainer = document.createElement('div');
      bgContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden z-0';
      
      // Create nodes that resemble a graph data structure
      const nodes = Array.from({ length: 12 }, (_, i) => {
        const node = document.createElement('div');
        const size = 4 + Math.random() * 8;
        node.className = 'absolute rounded-full';
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        node.style.background = i % 3 === 0 ? 
          'linear-gradient(90deg, #FF6B6B, #FFE66D)' : 
          i % 3 === 1 ? 
          'linear-gradient(90deg, #4ECDC4, #556270)' :
          'linear-gradient(90deg, #F3A183, #EC6F66)';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.opacity = '0.15';
        node.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        node.style.zIndex = '0';
        
        return { element: node, x: Math.random() * 100, y: Math.random() * 100 };
      });
      
      nodes.forEach(({ element }) => bgContainer.appendChild(element));
      
      // Create connections between some nodes
      nodes.forEach((node, i) => {
        if (i < nodes.length - 1) {
          const line = document.createElement('div');
          line.className = 'absolute bg-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20';
          line.style.height = '1px';
          line.style.zIndex = '0';
          line.style.opacity = '0.1';
          line.style.transformOrigin = 'left center';
          
          const x1 = node.x;
          const y1 = node.y;
          const x2 = nodes[i + 1].x;
          const y2 = nodes[i + 1].y;
          
          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
          
          line.style.width = `${distance}%`;
          line.style.left = `${x1}%`;
          line.style.top = `${y1}%`;
          line.style.transform = `rotate(${angle}deg)`;
          
          bgContainer.appendChild(line);
        }
      });
      
      cardsContainerRef.current.appendChild(bgContainer);
      
      return bgContainer;
    };
    
    const container = cardsContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      const bgElements = createDsaBackgroundElements();
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        bgElements?.remove();
      };
    }
  }, []);

  const algorithmCards = [
    {
      title: "Array Visualization",
      description: "Understand how arrays work with visual representations of insertion, deletion, and traversal operations.",
      icon: <Layers size={24} className="text-[#FF6B6B]" />,
      to: "/array",
      delay: 100,
      bgColor: "from-[#FF6B6B]/20 to-[#FFE66D]/10"
    },
    {
      title: "Linked List",
      description: "Visualize linked list operations like insertion and deletion at different positions.",
      icon: <ListTree size={24} className="text-[#4ECDC4]" />,
      to: "/linked-list",
      delay: 200,
      bgColor: "from-[#4ECDC4]/20 to-[#556270]/10"
    },
    {
      title: "Stack & Queue",
      description: "Explore LIFO and FIFO data structures with interactive push and pop operations.",
      icon: <BarChart3 size={24} className="text-[#FFE66D]" />,
      to: "/stack-queue",
      delay: 300,
      bgColor: "from-[#FFE66D]/20 to-[#F3A183]/10"
    },
    {
      title: "Search Algorithms",
      description: "Compare linear and binary search techniques with step-by-step visualization.",
      icon: <ArrowRightLeft size={24} className="text-[#F3A183]" />,
      to: "/search",
      delay: 400,
      bgColor: "from-[#F3A183]/20 to-[#FF6B6B]/10"
    },
    {
      title: "Sorting Algorithms",
      description: "Visualize different sorting techniques including bubble, merge, quick, and insertion sort.",
      icon: <SortDesc size={24} className="text-[#556270]" />,
      to: "/sorting",
      delay: 500,
      bgColor: "from-[#556270]/20 to-[#4ECDC4]/10"
    },
    {
      title: "N-Queen Problem",
      description: "Explore this classic backtracking algorithm through visual representation.",
      icon: <Crown size={24} className="text-[#EC6F66]" />,
      to: "/n-queen",
      delay: 600,
      bgColor: "from-[#EC6F66]/20 to-[#F3A183]/10"
    }
  ];

  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-32 h-32 rounded-full bg-[#FF6B6B]/5 animate-float"></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 rounded-full bg-[#4ECDC4]/5 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-[#FFE66D]/5 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {algorithmCards.map((card, index) => (
          <AnimatedCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            to={card.to}
            delay={card.delay}
            bgColor={card.bgColor}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
