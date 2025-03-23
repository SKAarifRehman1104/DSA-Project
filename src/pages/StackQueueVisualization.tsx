
import { useState, useEffect, useRef } from "react";
import Visualizer from "@/components/Visualizer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { highlightElement, fadeIn, fadeOut } from "@/utils/animations";
import { toast } from "sonner";
import { ArrowDown, ArrowRight } from "lucide-react";

interface Item {
  value: number;
  id: string;
}

const StackQueueVisualization = () => {
  const [activeTab, setActiveTab] = useState("stack");
  const [stackItems, setStackItems] = useState<Item[]>([]);
  const [queueItems, setQueueItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const stackItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const queueItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.title = "Stack & Queue Visualization | DSA Visualizer";
    // Initialize with some values
    const initialStackItems = [10, 20, 30].map((value) => ({
      value,
      id: Math.random().toString(36).substr(2, 9),
    }));
    const initialQueueItems = [40, 50, 60].map((value) => ({
      value,
      id: Math.random().toString(36).substr(2, 9),
    }));
    setStackItems(initialStackItems);
    setQueueItems(initialQueueItems);
  }, []);

  const handleStackPush = () => {
    if (inputValue.trim() === "" || isAnimating) return;
    
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    const newItem = { value, id: Math.random().toString(36).substr(2, 9) };
    setStackItems([...stackItems, newItem]);
    setInputValue("");
    
    // Animate the new item
    setTimeout(() => {
      const newIndex = stackItems.length;
      if (stackItemsRef.current[newIndex]) {
        highlightElement(stackItemsRef.current[newIndex]!, "#22c55e");
      }
    }, 100);
    
    toast.success(`Pushed ${value} to the stack`);
  };

  const handleStackPop = () => {
    if (stackItems.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate the pop operation
    const lastIndex = stackItems.length - 1;
    if (stackItemsRef.current[lastIndex]) {
      highlightElement(stackItemsRef.current[lastIndex]!, "#ef4444");
    }
    
    setTimeout(() => {
      const poppedValue = stackItems[lastIndex].value;
      setStackItems(stackItems.slice(0, lastIndex));
      setIsAnimating(false);
      toast.success(`Popped ${poppedValue} from the stack`);
    }, 600);
  };

  const handleQueueEnqueue = () => {
    if (inputValue.trim() === "" || isAnimating) return;
    
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    const newItem = { value, id: Math.random().toString(36).substr(2, 9) };
    setQueueItems([...queueItems, newItem]);
    setInputValue("");
    
    // Animate the new item
    setTimeout(() => {
      const newIndex = queueItems.length;
      if (queueItemsRef.current[newIndex]) {
        highlightElement(queueItemsRef.current[newIndex]!, "#22c55e");
      }
    }, 100);
    
    toast.success(`Enqueued ${value} to the queue`);
  };

  const handleQueueDequeue = () => {
    if (queueItems.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate the dequeue operation
    if (queueItemsRef.current[0]) {
      highlightElement(queueItemsRef.current[0]!, "#ef4444");
    }
    
    setTimeout(() => {
      const dequeuedValue = queueItems[0].value;
      setQueueItems(queueItems.slice(1));
      setIsAnimating(false);
      toast.success(`Dequeued ${dequeuedValue} from the queue`);
    }, 600);
  };

  return (
    <Visualizer
      title="Stack & Queue Visualization"
      description="Explore LIFO and FIFO data structures with interactive push, pop, enqueue, and dequeue operations."
    >
      <Tabs defaultValue="stack" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="stack">Stack</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stack" className="space-y-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">Value</label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a number"
                className="w-36"
                disabled={isAnimating}
              />
            </div>
            
            <div className="flex gap-2 items-end">
              <Button 
                variant="outline" 
                onClick={handleStackPush}
                disabled={isAnimating}
              >
                Push
              </Button>
              <Button 
                variant="outline" 
                onClick={handleStackPop}
                disabled={isAnimating || stackItems.length === 0}
              >
                Pop
              </Button>
            </div>
          </div>
          
          <div className="py-10 px-4">
            <div className="text-sm text-muted-foreground mb-4 text-center">
              Stack Visualization (LIFO: Last In, First Out)
            </div>
            
            <div className="flex flex-col-reverse items-center space-y-reverse space-y-3">
              {stackItems.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  <div
                    ref={(el) => (stackItemsRef.current[index] = el)}
                    className="glass-card w-64 h-12 flex items-center justify-center relative transition-all duration-300"
                  >
                    <span className="text-lg font-medium">{item.value}</span>
                    {index === stackItems.length - 1 && (
                      <span className="absolute -right-16 text-xs text-accent">
                        ← Top
                      </span>
                    )}
                    {index === 0 && (
                      <span className="absolute -right-20 text-xs text-muted-foreground">
                        ← Bottom
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {stackItems.length === 0 && (
                <div className="text-muted-foreground italic">
                  Stack is empty
                </div>
              )}
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-lg mt-8">
            <h3 className="text-lg font-medium mb-2">About Stacks</h3>
            <p className="text-sm text-muted-foreground">
              A stack is a Last In, First Out (LIFO) data structure where elements are inserted and removed from the same end, called the top. Common operations include push (add to top) and pop (remove from top).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="glass-card p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Time Complexity</div>
                <div className="text-xs text-muted-foreground">Push: O(1), Pop: O(1)</div>
              </div>
              <div className="glass-card p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Applications</div>
                <div className="text-xs text-muted-foreground">Function calls, Undo operations, Expression evaluation</div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="queue" className="space-y-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">Value</label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a number"
                className="w-36"
                disabled={isAnimating}
              />
            </div>
            
            <div className="flex gap-2 items-end">
              <Button 
                variant="outline" 
                onClick={handleQueueEnqueue}
                disabled={isAnimating}
              >
                Enqueue
              </Button>
              <Button 
                variant="outline" 
                onClick={handleQueueDequeue}
                disabled={isAnimating || queueItems.length === 0}
              >
                Dequeue
              </Button>
            </div>
          </div>
          
          <div className="py-10 px-4">
            <div className="text-sm text-muted-foreground mb-4 text-center">
              Queue Visualization (FIFO: First In, First Out)
            </div>
            
            <div className="flex items-center justify-center space-x-2 relative">
  {queueItems.map((item, index) => (
    <div key={item.id} className="relative flex flex-col items-center">
      <div
        ref={(el) => (queueItemsRef.current[index] = el)}
        className="glass-card w-16 h-16 flex items-center justify-center transition-all duration-300"
      >
        <span className="text-lg font-medium">{item.value}</span>
      </div>
      {/* Align "Front" and "Rear" Labels Below the Blocks */}
      {index === 0 && (
        <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-red-500">
          Front
        </span>
      )}
      {index === queueItems.length - 1 && (
        <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
          Rear
        </span>
      )}
    </div>
  ))}
</div>

          </div>
          
          <div className="glass-card p-4 rounded-lg mt-8">
            <h3 className="text-lg font-medium mb-2">About Queues</h3>
            <p className="text-sm text-muted-foreground">
              A queue is a First In, First Out (FIFO) data structure where elements are inserted at the rear and removed from the front. Common operations include enqueue (add to rear) and dequeue (remove from front).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="glass-card p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Time Complexity</div>
                <div className="text-xs text-muted-foreground">Enqueue: O(1), Dequeue: O(1)</div>
              </div>
              <div className="glass-card p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Applications</div>
                <div className="text-xs text-muted-foreground">Job scheduling, Print spooling, Breadth-first search</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Visualizer>
  );
};

export default StackQueueVisualization;
