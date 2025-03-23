
import { useState, useEffect, useRef } from "react";
import Visualizer from "@/components/Visualizer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { highlightElement } from "@/utils/animations";
import { toast } from "sonner";

const ArrayVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const arrayElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.title = "Array Visualization | DSA Visualizer";
    // Initialize with some values
    setArray([12, 45, 23, 67, 89, 34]);
  }, []);

  const handleAddElement = () => {
    if (inputValue.trim() === "" || isAnimating) return;
    
    const newValue = parseInt(inputValue);
    if (isNaN(newValue)) {
      toast.error("Please enter a valid number");
      return;
    }

    const newArray = [...array, newValue];
    setArray(newArray);
    setInputValue("");
    
    // Animate the new element
    setIsAnimating(true);
    setTimeout(() => {
      const newElementIndex = newArray.length - 1;
      if (arrayElementsRef.current[newElementIndex]) {
        highlightElement(arrayElementsRef.current[newElementIndex]!, "#22c55e");
      }
      setIsAnimating(false);
    }, 100);
    
    toast.success(`Added ${newValue} to the array`);
  };

  const handleInsertAtIndex = () => {
    if (inputValue.trim() === "" || indexValue.trim() === "" || isAnimating) return;
    
    const newValue = parseInt(inputValue);
    const index = parseInt(indexValue);
    
    if (isNaN(newValue)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    if (isNaN(index) || index < 0 || index > array.length) {
      toast.error(`Index must be between 0 and ${array.length}`);
      return;
    }
    
    const newArray = [...array];
    newArray.splice(index, 0, newValue);
    setArray(newArray);
    setInputValue("");
    setIndexValue("");
    
    // Animate the inserted element
    setIsAnimating(true);
    setTimeout(() => {
      if (arrayElementsRef.current[index]) {
        highlightElement(arrayElementsRef.current[index]!, "#22c55e");
      }
      setIsAnimating(false);
    }, 100);
    
    toast.success(`Inserted ${newValue} at index ${index}`);
  };

  const handleRemoveAtIndex = () => {
    if (indexValue.trim() === "" || isAnimating || array.length === 0) return;
    
    const index = parseInt(indexValue);
    
    if (isNaN(index) || index < 0 || index >= array.length) {
      toast.error(`Index must be between 0 and ${array.length - 1}`);
      return;
    }
    
    // Animate the element before removing
    setIsAnimating(true);
    if (arrayElementsRef.current[index]) {
      highlightElement(arrayElementsRef.current[index]!, "#ef4444", 600);
    }
    
    setTimeout(() => {
      const removedValue = array[index];
      const newArray = [...array];
      newArray.splice(index, 1);
      setArray(newArray);
      setIndexValue("");
      setIsAnimating(false);
      toast.success(`Removed ${removedValue} from index ${index}`);
    }, 700);
  };

  const handleSearch = () => {
    if (inputValue.trim() === "" || isAnimating || array.length === 0) return;
    
    const searchValue = parseInt(inputValue);
    if (isNaN(searchValue)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setIsAnimating(true);
    
    // Simulate linear search with animation
    let foundIndex = -1;
    const search = async () => {
      for (let i = 0; i < array.length; i++) {
        if (arrayElementsRef.current[i]) {
          highlightElement(arrayElementsRef.current[i]!, "#3b82f6");
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (array[i] === searchValue) {
          foundIndex = i;
          if (arrayElementsRef.current[i]) {
            highlightElement(arrayElementsRef.current[i]!, "#22c55e");
          }
          break;
        }
      }
      
      if (foundIndex !== -1) {
        toast.success(`Found ${searchValue} at index ${foundIndex}`);
      } else {
        toast.error(`${searchValue} not found in the array`);
      }
      
      setIsAnimating(false);
      setInputValue("");
    };
    
    search();
  };

  return (
    <Visualizer
      title="Array Visualization"
      description="Understand array operations with visual representations of insertion, deletion, and searching."
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
          
          <div className="flex flex-wrap gap-2 items-end">
            <Button 
              variant="outline" 
              onClick={handleAddElement}
              disabled={isAnimating}
            >
              Add to End
            </Button>
            <Button 
              variant="outline" 
              onClick={handleInsertAtIndex}
              disabled={isAnimating}
            >
              Insert at Index
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRemoveAtIndex}
              disabled={isAnimating}
            >
              Remove at Index
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSearch}
              disabled={isAnimating}
            >
              Search
            </Button>
          </div>
        </div>
        
        <div className="py-10 px-4">
          <div className="text-sm text-muted-foreground mb-4 text-center">
            Array Visualization
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {array.map((value, index) => (
              <div
                key={index}
                ref={(el) => (arrayElementsRef.current[index] = el)}
                className="glass-card w-16 h-16 flex items-center justify-center relative transition-all duration-300"
              >
                <span className="text-lg font-medium">{value}</span>
                <span className="absolute -bottom-6 text-xs text-muted-foreground">
                  {index}
                </span>
              </div>
            ))}
            {array.length === 0 && (
              <div className="text-muted-foreground italic">
                Array is empty
              </div>
            )}
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg mt-8">
          <h3 className="text-lg font-medium mb-2">About Arrays</h3>
          <p className="text-sm text-muted-foreground">
            Arrays store elements in contiguous memory locations, allowing for O(1) time complexity for accessing elements by index. However, insertion and deletion operations may require O(n) time as elements must be shifted.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Access</div>
              <div className="text-xs text-muted-foreground">O(1)</div>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Insertion</div>
              <div className="text-xs text-muted-foreground">O(n)</div>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Deletion</div>
              <div className="text-xs text-muted-foreground">O(n)</div>
            </div>
          </div>
        </div>
      </div>
    </Visualizer>
  );
};

export default ArrayVisualization;
