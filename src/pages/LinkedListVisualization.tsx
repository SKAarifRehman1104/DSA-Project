
import { useState, useEffect, useRef } from "react";
import Visualizer from "@/components/Visualizer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { highlightElement, fadeIn, fadeOut } from "@/utils/animations";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Node {
  value: number;
  id: string;
}

const LinkedListVisualization = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.title = "Linked List Visualization | DSA Visualizer";
    // Initialize with some values
    const initialNodes = [23, 47, 89, 12].map((value) => ({
      value,
      id: Math.random().toString(36).substr(2, 9),
    }));
    setNodes(initialNodes);
  }, []);

  const animateOperation = async (callback: () => void, delay: number = 800) => {
    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    callback();
    setIsAnimating(false);
  };

  const handleAddToFront = () => {
    if (inputValue.trim() === "" || isAnimating) return;
    
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    const newNode = { value, id: Math.random().toString(36).substr(2, 9) };
    setNodes([newNode, ...nodes]);
    setInputValue("");
    
    // Animate the new node
    setTimeout(() => {
      if (nodesRef.current[0]) {
        highlightElement(nodesRef.current[0]!, "#22c55e");
      }
    }, 100);
    
    toast.success(`Added ${value} to the front`);
  };

  const handleAddToEnd = () => {
    if (inputValue.trim() === "" || isAnimating) return;
    
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    const newNode = { value, id: Math.random().toString(36).substr(2, 9) };
    setNodes([...nodes, newNode]);
    setInputValue("");
    
    // Animate the new node
    setTimeout(() => {
      const newIndex = nodes.length;
      if (nodesRef.current[newIndex]) {
        highlightElement(nodesRef.current[newIndex]!, "#22c55e");
      }
    }, 100);
    
    toast.success(`Added ${value} to the end`);
  };

  const handleAddAtIndex = () => {
    if (inputValue.trim() === "" || indexValue.trim() === "" || isAnimating) return;
    
    const value = parseInt(inputValue);
    const index = parseInt(indexValue);
    
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    if (isNaN(index) || index < 0 || index > nodes.length) {
      toast.error(`Index must be between 0 and ${nodes.length}`);
      return;
    }
    
    setIsAnimating(true);
    
    // Animate traversal to the insertion point
    const traverseAndInsert = async () => {
      for (let i = 0; i < index; i++) {
        if (nodesRef.current[i]) {
          highlightElement(nodesRef.current[i]!, "#3b82f6");
        }
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const newNode = { value, id: Math.random().toString(36).substr(2, 9) };
      const newNodes = [...nodes];
      newNodes.splice(index, 0, newNode);
      setNodes(newNodes);
      setInputValue("");
      setIndexValue("");
      
      // Highlight the inserted node
      setTimeout(() => {
        if (nodesRef.current[index]) {
          highlightElement(nodesRef.current[index]!, "#22c55e");
        }
        setIsAnimating(false);
      }, 300);
      
      toast.success(`Inserted ${value} at index ${index}`);
    };
    
    traverseAndInsert();
  };

  const handleDeleteFromFront = () => {
    if (nodes.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate the deletion
    if (nodesRef.current[0]) {
      highlightElement(nodesRef.current[0]!, "#ef4444");
    }
    
    setTimeout(() => {
      const deletedValue = nodes[0].value;
      setNodes(nodes.slice(1));
      setIsAnimating(false);
      toast.success(`Removed ${deletedValue} from the front`);
    }, 600);
  };

  const handleDeleteFromEnd = () => {
    if (nodes.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate the deletion
    const lastIndex = nodes.length - 1;
    if (nodesRef.current[lastIndex]) {
      highlightElement(nodesRef.current[lastIndex]!, "#ef4444");
    }
    
    setTimeout(() => {
      const deletedValue = nodes[lastIndex].value;
      setNodes(nodes.slice(0, lastIndex));
      setIsAnimating(false);
      toast.success(`Removed ${deletedValue} from the end`);
    }, 600);
  };

  const handleDeleteAtIndex = () => {
    if (indexValue.trim() === "" || isAnimating || nodes.length === 0) return;
    
    const index = parseInt(indexValue);
    
    if (isNaN(index) || index < 0 || index >= nodes.length) {
      toast.error(`Index must be between 0 and ${nodes.length - 1}`);
      return;
    }
    
    setIsAnimating(true);
    
    // Animate traversal to the deletion point
    const traverseAndDelete = async () => {
      for (let i = 0; i < index; i++) {
        if (nodesRef.current[i]) {
          highlightElement(nodesRef.current[i]!, "#3b82f6");
        }
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Highlight the node to be deleted
      if (nodesRef.current[index]) {
        highlightElement(nodesRef.current[index]!, "#ef4444");
      }
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const deletedValue = nodes[index].value;
      const newNodes = [...nodes];
      newNodes.splice(index, 1);
      setNodes(newNodes);
      setIndexValue("");
      setIsAnimating(false);
      
      toast.success(`Removed ${deletedValue} from index ${index}`);
    };
    
    traverseAndDelete();
  };

  const handleSearch = () => {
    if (inputValue.trim() === "" || isAnimating || nodes.length === 0) return;
    
    const searchValue = parseInt(inputValue);
    if (isNaN(searchValue)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setIsAnimating(true);
    
    // Simulate linked list traversal with animation
    let foundIndex = -1;
    const search = async () => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodesRef.current[i]) {
          highlightElement(nodesRef.current[i]!, "#3b82f6");
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (nodes[i].value === searchValue) {
          foundIndex = i;
          if (nodesRef.current[i]) {
            highlightElement(nodesRef.current[i]!, "#22c55e");
          }
          break;
        }
      }
      
      if (foundIndex !== -1) {
        toast.success(`Found ${searchValue} at index ${foundIndex}`);
      } else {
        toast.error(`${searchValue} not found in the linked list`);
      }
      
      setIsAnimating(false);
      setInputValue("");
    };
    
    search();
  };

  return (
    <Visualizer
      title="Linked List Visualization"
      description="Visualize linked list operations like insertion and deletion at different positions."
    >
      <div className="flex flex-col space-y-8">
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
          
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-muted-foreground">Index</label>
            <Input
              type="number"
              value={indexValue}
              onChange={(e) => setIndexValue(e.target.value)}
              placeholder="Enter index"
              className="w-36"
              disabled={isAnimating}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Button 
            variant="outline" 
            onClick={handleAddToFront}
            disabled={isAnimating}
          >
            Add to Front
          </Button>
          <Button 
            variant="outline" 
            onClick={handleAddToEnd}
            disabled={isAnimating}
          >
            Add to End
          </Button>
          <Button 
            variant="outline" 
            onClick={handleAddAtIndex}
            disabled={isAnimating}
          >
            Add at Index
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDeleteFromFront}
            disabled={isAnimating || nodes.length === 0}
          >
            Delete from Front
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDeleteFromEnd}
            disabled={isAnimating || nodes.length === 0}
          >
            Delete from End
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDeleteAtIndex}
            disabled={isAnimating || nodes.length === 0}
          >
            Delete at Index
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSearch}
            disabled={isAnimating || nodes.length === 0}
          >
            Search
          </Button>
        </div>
        
        <div className="py-10 px-4">
          <div className="text-sm text-muted-foreground mb-4 text-center">
            Linked List Visualization
          </div>
          
          <div className="flex flex-wrap justify-center items-center">
            {nodes.map((node, index) => (
              <div key={node.id} className="flex items-center">
                <div
                  ref={(el) => (nodesRef.current[index] = el)}
                  className="glass-card w-16 h-16 flex items-center justify-center relative transition-all duration-300"
                >
                  <span className="text-lg font-medium">{node.value}</span>
                  <span className="absolute -bottom-6 text-xs text-muted-foreground">
                    {index}
                  </span>
                </div>
                {index < nodes.length - 1 && (
                  <ArrowRight className="mx-2 text-muted-foreground" size={20} />
                )}
              </div>
            ))}
            {nodes.length === 0 && (
              <div className="text-muted-foreground italic">
                Linked list is empty
              </div>
            )}
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg mt-8">
          <h3 className="text-lg font-medium mb-2">About Linked Lists</h3>
          <p className="text-sm text-muted-foreground">
            Linked lists consist of nodes where each node contains a data field and a reference to the next node. Unlike arrays, linked lists allow efficient insertions and deletions but have O(n) access time.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Access</div>
              <div className="text-xs text-muted-foreground">O(n)</div>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Insertion</div>
              <div className="text-xs text-muted-foreground">O(1) at known position</div>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Deletion</div>
              <div className="text-xs text-muted-foreground">O(1) at known position</div>
            </div>
          </div>
        </div>
      </div>
    </Visualizer>
  );
};

export default LinkedListVisualization;
