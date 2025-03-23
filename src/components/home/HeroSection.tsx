
import { useEffect, useRef } from "react";
import QuoteDisplay from "./QuoteDisplay";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create floating code lines that react to hover
    const codeContainer = document.createElement('div');
    codeContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden z-0';
    
    // Add code snippets that will float in the background
    const codeSnippets = [
      'function quickSort(arr) {',
      '  if (arr.length <= 1) return arr;',
      '  const pivot = arr[0];',
      '  const left = arr.filter((x, i) => i > 0 && x < pivot);',
      '  const right = arr.filter(x => x > pivot);',
      '  return [...quickSort(left), pivot, ...quickSort(right)];',
      '}',
      'class Node {',
      '  constructor(value) {',
      '    this.value = value;',
      '    this.next = null;',
      '  }',
      '}',
      'function binarySearch(arr, target) {',
      '  let left = 0, right = arr.length - 1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (arr[mid] === target) return mid;',
      '    if (arr[mid] < target) left = mid + 1;',
      '    else right = mid - 1;',
      '  }',
      '  return -1;',
      '}'
    ];
    
    // Create and position code lines
    codeSnippets.forEach((snippet, index) => {
      const codeLine = document.createElement('div');
      codeLine.className = 'code-line absolute text-[0.65rem] font-mono whitespace-nowrap opacity-15 transition-all duration-500';
      codeLine.innerText = snippet;
      
      // Randomize positions
      const top = 5 + Math.random() * 90; // Random vertical position
      const left = Math.random() * 80; // Random horizontal position
      const rot = (Math.random() - 0.5) * 5; // Slight random rotation
      
      codeLine.style.top = `${top}%`;
      codeLine.style.left = `${left}%`;
      codeLine.style.transform = `rotate(${rot}deg)`;
      codeLine.style.color = index % 3 === 0 ? '#FF6B6B' : index % 3 === 1 ? '#4ECDC4' : '#FFE66D';
      codeLine.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
      
      // Add floating animation with random duration and delay
      codeLine.style.animation = `float ${5 + Math.random() * 8}s ease-in-out infinite`;
      codeLine.style.animationDelay = `${Math.random() * 5}s`;
      
      codeContainer.appendChild(codeLine);
    });
    
    sectionRef.current.appendChild(codeContainer);
    
    // Add hover interaction effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Make code lines react to mouse movement
      const codeLines = document.querySelectorAll('.code-line');
      codeLines.forEach((line) => {
        const lineElement = line as HTMLElement;
        const lineRect = lineElement.getBoundingClientRect();
        const lineCenterX = lineRect.left + lineRect.width / 2 - rect.left;
        const lineCenterY = lineRect.top + lineRect.height / 2 - rect.top;
        
        // Calculate distance between mouse and code line
        const deltaX = mouseX - lineCenterX;
        const deltaY = mouseY - lineCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Move lines away from cursor - stronger effect for closer lines
        if (distance < 300) {
          const power = (1 - distance / 300) * 40; // Max movement of 40px
          const moveX = (deltaX / distance) * power * -1; // Move away
          const moveY = (deltaY / distance) * power * -1; // Move away
          
          lineElement.style.transform += ` translate(${moveX}px, ${moveY}px)`;
          lineElement.style.opacity = '0.6'; // Highlight when affected
          lineElement.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
        } else {
          lineElement.style.opacity = '0.15';
          lineElement.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
        }
      });
    };
    
    sectionRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
        codeContainer.remove();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 mb-12 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating array visualization */}
        <div className="absolute left-0 top-1/4 flex space-x-2 animate-float opacity-20" style={{ animationDelay: '0.5s' }}>
          {[40, 25, 60, 10, 45, 30].map((height, idx) => (
            <div 
              key={idx} 
              className="w-4 bg-gradient-to-t from-[#4ECDC4] to-[#556270] rounded-t-sm" 
              style={{ height: `${height}px`, animationDelay: `${idx * 0.2}s` }}
            ></div>
          ))}
        </div>
        
        {/* Linked list visualization */}
        <div className="absolute right-0 bottom-1/4 opacity-20">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFE66D] flex items-center justify-center text-xs font-bold">
                  {idx}
                </div>
                {idx < 3 && (
                  <div className="w-6 h-0.5 bg-[#FFE66D]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Binary tree nodes */}
        <div className="absolute left-1/4 bottom-1/3 opacity-20">
          <div className="relative w-40 h-40">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFE66D]"></div>
            <div className="absolute top-12 left-1/4 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFE66D]"></div>
            <div className="absolute top-12 left-3/4 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFE66D]"></div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20 text-[#FF6B6B] text-xs font-medium mb-6 animate-pulse-soft">
          Interactive Learning
        </div>
        <h1 className="text-5xl font-medium tracking-tight mb-8 text-gradient leading-relaxed">
          Visualize <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] bg-clip-text text-transparent animate-float inline-block">Data Structures</span> & Algorithms
        </h1>
        <p className="text-xl text-muted-foreground mb-10 animate-on-scroll delay-100">
          Learn DSA concepts through interactive visualizations and step-by-step animations. Perfect for beginners and experienced programmers alike.
        </p>
        
        <QuoteDisplay />
      </div>
    </section>
  );
};

export default HeroSection;
