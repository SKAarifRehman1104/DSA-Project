import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Brain, Zap, LineChart } from 'lucide-react';

// Compact StatBlock component
const StatBlock = ({ value, description, icon, color, delay }: { 
  value: string, 
  description: string,
  icon: React.ReactNode,
  color: string,
  delay: number
}) => {
  return (
    <motion.div 
      className="p-4 rounded-lg w-full bg-gradient-to-br from-black/40 to-black/10 border border-white/10 shadow-lg transform transition-all duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ background: `color-mix(in srgb, ${color} 20%, transparent)` }}
        >
          {icon}
        </div>
        <div>
          <div 
            className="text-2xl font-bold mb-1" 
            style={{ 
              background: `linear-gradient(90deg, white, ${color}, white)`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 2s infinite'
            }}
          >
            {value}
          </div>
          <div className="text-sm text-white/70 leading-tight">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// New AlgorithmVisualizer component to replace NetworkVisualizer
const AlgorithmVisualizer = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  useEffect(() => {
    // Initial animation setup runs once
    const animationTimeout = setTimeout(() => {
      setHoveredNode(Math.floor(Math.random() * 6));
      
      // Change random node highlight every 3 seconds
      const interval = setInterval(() => {
        setHoveredNode(Math.floor(Math.random() * 6));
      }, 3000);
      
      return () => clearInterval(interval);
    }, 1000);
    
    return () => clearTimeout(animationTimeout);
  }, []);
  
  // Create array of nodes for visualization
  const nodes = [
    { color: 'hsl(var(--vibrant-red))', label: 'Array' },
    { color: 'hsl(var(--vibrant-yellow))', label: 'Queue' },
    { color: 'hsl(var(--vibrant-teal))', label: 'Stack' },
    { color: 'hsl(var(--vibrant-red))', label: 'Tree' },
    { color: 'hsl(var(--vibrant-yellow))', label: 'Graph' },
    { color: 'hsl(var(--vibrant-teal))', label: 'Hash' }
  ];
  
  return (
    <div 
      ref={canvasRef} 
      className="relative w-full h-32 rounded-lg p-3 flex items-center justify-center"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.05)"
      }}
      onMouseLeave={() => setHoveredNode(null)}
    >
      {/* Main visualization with nodes and connections */}
      <div className="flex justify-between items-center w-full max-w-md relative">
        {/* Draw connection lines between nodes */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {nodes.map((_, i) => (
            <g key={`connections-${i}`}>
              {/* Connect each node to the next 2 nodes with curved lines */}
              {[1, 2].map(offset => {
                const targetIndex = (i + offset) % nodes.length;
                const isHighlighted = 
                  hoveredNode === i || 
                  hoveredNode === targetIndex;
                
                return (
                  <motion.path
                    key={`connection-${i}-${targetIndex}`}
                    d={`M ${50 + i * 70} 60 Q ${50 + i * 35 + targetIndex * 35} ${i % 2 === 0 ? 20 : 100} ${50 + targetIndex * 70} 60`}
                    stroke={isHighlighted ? nodes[i].color : "rgba(255, 255, 255, 0.1)"}
                    strokeWidth={isHighlighted ? 2 : 1}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isHighlighted ? 0.8 : 0.3,
                      strokeDasharray: isHighlighted ? "5 5" : "0 0" 
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut",
                      repeatType: "reverse",
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                );
              })}
            </g>
          ))}
        </svg>
        
        {/* Render the nodes */}
        {nodes.map((node, index) => {
          const isActive = hoveredNode === index;
          
          return (
            <motion.div
              key={`node-${index}`}
              className="relative z-10 flex flex-col items-center"
              onMouseEnter={() => setHoveredNode(index)}
              whileHover={{ scale: 1.15 }}
              layout
            >
              <motion.div 
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer mb-2"
                style={{ 
                  backgroundColor: `color-mix(in srgb, ${node.color} 20%, transparent)`,
                  border: `2px solid ${isActive ? node.color : 'rgba(255, 255, 255, 0.1)'}`,
                }}
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                  boxShadow: isActive ? `0 0 15px ${node.color}` : "none"
                }}
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <span 
                  className="text-xs font-mono" 
                  style={{ color: isActive ? node.color : 'rgba(255, 255, 255, 0.7)' }}
                >
                  {index + 1}
                </span>
                
                {/* Active node "ripple" effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: `2px solid ${node.color}` }}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeOut" 
                    }}
                  />
                )}
              </motion.div>
              
              {/* Node label */}
              <motion.div 
                className="text-xs text-center"
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  y: isActive ? -3 : 0
                }}
              >
                {node.label}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Floating code snippets that appear when nodes are hovered */}
      <AnimatePresence>
        {hoveredNode !== null && (
          <motion.div
            className="absolute top-0 left-0 right-0 pointer-events-none flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="text-[9px] bg-black/30 rounded px-2 py-1 font-mono max-w-xs text-center"
              style={{ color: nodes[hoveredNode].color }}
            >
              {hoveredNode === 0 && "array[i] = value // O(1) access"}
              {hoveredNode === 1 && "queue.enqueue(item) // FIFO structure"}
              {hoveredNode === 2 && "stack.push(item) // LIFO structure"}
              {hoveredNode === 3 && "tree.insert(value) // Hierarchical data"}
              {hoveredNode === 4 && "graph.addEdge(v1, v2) // Network structure"}
              {hoveredNode === 5 && "hashTable.put(key, value) // O(1) lookup"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main BenefitsSection component
const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { 
      id: 'learning', 
      label: 'Enhanced Learning', 
      icon: <Brain className="w-4 h-4" />,
      content: 'Visual learning enhances understanding and retention of complex concepts. Our interactive visualizations make abstract data structures and algorithms concrete and tangible.',
      color: 'hsl(var(--vibrant-red))'
    },
    { 
      id: 'performance', 
      label: 'Better Performance', 
      icon: <Zap className="w-4 h-4" />,
      content: 'Interacting with visual representations of algorithms helps you grasp execution patterns and optimize for efficiency, leading to better implementation skills.',
      color: 'hsl(var(--vibrant-yellow))'
    },
    { 
      id: 'metrics', 
      label: 'Measurable Results', 
      icon: <LineChart className="w-4 h-4" />,
      content: 'Studies show that students using visual learning tools perform up to 3x better in understanding complex algorithms and data structures.',
      color: 'hsl(var(--vibrant-teal))'
    }
  ];
  
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container px-4 mx-auto">
        <div 
          className="rounded-xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Left side: Tabs and content */}
            <div className="flex-1">
              <motion.h2 
                className="text-2xl font-bold mb-4 text-gradient relative inline-block"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Why Visualize DSA?
                <div className="absolute -bottom-1 left-0 h-0.5 w-1/2 bg-gradient-to-r from-accent to-transparent" />
              </motion.h2>
              
              {/* Tabs */}
              <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-none pb-2 h-10">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                      activeTab === index 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <span style={{ color: activeTab === index ? tab.color : 'inherit' }}>
                      {tab.icon}
                    </span>
                    {tab.label}
                    {activeTab === index && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: tab.color }}
                        initial={false}
                      />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground mb-6"
                >
                  {tabs[activeTab].content}
                </motion.div>
              </AnimatePresence>
              
              <AlgorithmVisualizer />
            </div>
            
            {/* Right side: Stats */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4">
                <StatBlock
                  value="80%"
                  description="Improved learning retention with visualization techniques"
                  icon={<Brain className="h-5 w-5" style={{ color: "hsl(var(--vibrant-red))" }} />}
                  color="hsl(var(--vibrant-red))"
                  delay={0.2}
                />
                <StatBlock
                  value="3x"
                  description="Faster problem-solving with visual understanding of algorithms"
                  icon={<Zap className="h-5 w-5" style={{ color: "hsl(var(--vibrant-yellow))" }} />}
                  color="hsl(var(--vibrant-yellow))"
                  delay={0.4}
                />
                <StatBlock
                  value="100%"
                  description="Interactive experience for better conceptual understanding"
                  icon={<LineChart className="h-5 w-5" style={{ color: "hsl(var(--vibrant-teal))" }} />}
                  color="hsl(var(--vibrant-teal))"
                  delay={0.6}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BenefitsSection;
