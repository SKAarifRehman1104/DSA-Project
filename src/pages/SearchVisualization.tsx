
import { useState, useEffect, useRef } from "react";
import Visualizer from "@/components/Visualizer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { highlightElement } from "@/utils/animations";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

const SearchVisualization = () => {
  const [activeTab, setActiveTab] = useState("linear");
  const [array, setArray] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [newArrayValue, setNewArrayValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const arrayElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.title = "Search Visualization | DSA Visualizer";
    // Initialize with some sorted values for binary search
    const initialArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    setArray(initialArray);
  }, []);

  const handleSetNewArray = () => {
    if (newArrayValue.trim() === "" || isAnimating) return;
    
    try {
      // Parse the input array
      const newArray = newArrayValue.split(",").map((item) => {
        const num = parseInt(item.trim());
        if (isNaN(num)) throw new Error("Invalid input");
        return num;
      });
      
      if (activeTab === "binary") {
        // Sort the array for binary search
        newArray.sort((a, b) => a - b);
      }
      
      setArray(newArray);
      setNewArrayValue("");
      toast.success("Array updated successfully");
    } catch (error) {
      toast.error("Please enter valid numbers separated by commas");
    }
  };

  const handleLinearSearch = async () => {
    if (searchValue.trim() === "" || isAnimating || array.length === 0) return;
    
    const target = parseInt(searchValue);
    if (isNaN(target)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setIsAnimating(true);
    
    // Perform linear search with animation
    let foundIndex = -1;
    
    for (let i = 0; i < array.length; i++) {
      if (arrayElementsRef.current[i]) {
        highlightElement(arrayElementsRef.current[i]!, "#3b82f6");
      }
      
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      if (array[i] === target) {
        foundIndex = i;
        if (arrayElementsRef.current[i]) {
          highlightElement(arrayElementsRef.current[i]!, "#22c55e");
        }
        break;
      }
      
      // Reset color if not found
      if (arrayElementsRef.current[i]) {
        highlightElement(arrayElementsRef.current[i]!, "#ff5a5a", 300);
      }
    }
    
    if (foundIndex !== -1) {
      toast.success(`Found ${target} at index ${foundIndex}`);
    } else {
      toast.error(`${target} not found in the array`);
    }
    
    setIsAnimating(false);
  };

  const handleBinarySearch = async () => {
    if (searchValue.trim() === "" || isAnimating || array.length === 0) return;
    
    const target = parseInt(searchValue);
    if (isNaN(target)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setIsAnimating(true);
    
    // Perform binary search with animation
    let left = 0;
    let right = array.length - 1;
    let foundIndex = -1;
    
    while (left <= right) {
      // Highlight the current search range
      for (let i = left; i <= right; i++) {
        if (arrayElementsRef.current[i]) {
          highlightElement(arrayElementsRef.current[i]!, "#3b82f6", 300);
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      const mid = Math.floor((left + right) / 2);
      
      // Highlight the middle element
      if (arrayElementsRef.current[mid]) {
        highlightElement(arrayElementsRef.current[mid]!, "#f97316");
      }
      
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      if (array[mid] === target) {
        foundIndex = mid;
        if (arrayElementsRef.current[mid]) {
          highlightElement(arrayElementsRef.current[mid]!, "#22c55e");
        }
        break;
      } else if (array[mid] < target) {
        left = mid + 1;
        
        // Gray out the left half
        for (let i = 0; i < mid; i++) {
          if (arrayElementsRef.current[i]) {
            highlightElement(arrayElementsRef.current[i]!, "#333333", 300);
          }
        }
      } else {
        right = mid - 1;
        
        // Gray out the right half
        for (let i = mid + 1; i < array.length; i++) {
          if (arrayElementsRef.current[i]) {
            highlightElement(arrayElementsRef.current[i]!, "#333333", 300);
          }
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
    
    if (foundIndex !== -1) {
      toast.success(`Found ${target} at index ${foundIndex}`);
    } else {
      toast.error(`${target} not found in the array`);
    }
    
    setIsAnimating(false);
  };

  return (
    <Visualizer
      title="Search Algorithms Visualization"
      description="Compare linear and binary search algorithms with step-by-step visualization."
    >
      <Tabs defaultValue="linear" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="linear">Linear Search</TabsTrigger>
          <TabsTrigger value="binary">Binary Search</TabsTrigger>
        </TabsList>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">New Array (comma separated)</label>
              <Input
                value={newArrayValue}
                onChange={(e) => setNewArrayValue(e.target.value)}
                placeholder="e.g., 10, 20, 30, 40"
                className="w-64"
                disabled={isAnimating}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={handleSetNewArray}
                disabled={isAnimating}
              >
                Set Array
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">Search Value</label>
              <Input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter a number"
                className="w-36"
                disabled={isAnimating}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={activeTab === "linear" ? handleLinearSearch : handleBinarySearch}
                disabled={isAnimating || array.length === 0}
              >
                Search
              </Button>
            </div>
            
            <div className="flex flex-col space-y-2 w-full max-w-xs">
              <label className="text-sm text-muted-foreground">Animation Speed</label>
              <div className="flex items-center gap-2">
                <span className="text-xs">Slow</span>
                <Slider
                  value={[animationSpeed]}
                  min={100}
                  max={1000}
                  step={100}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                  disabled={isAnimating}
                  className="flex-1"
                />
                <span className="text-xs">Fast</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-6 px-4">
          <div className="text-sm text-muted-foreground mb-4 text-center">
            {activeTab === "linear" ? "Linear Search" : "Binary Search"} Visualization
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
        
        <TabsContent value="linear" className="mt-8">
          <div className="glass-card p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">About Linear Search</h3>
            <p className="text-sm text-muted-foreground">
              Linear search checks each element of the array one by one until it finds the target value or reaches the end of the array. It works on both sorted and unsorted arrays but has a time complexity of O(n).
            </p>
            <div className="mt-4">
              <div className="glass-card p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Time Complexity</div>
                <div className="text-xs text-muted-foreground">
                  <ul className="list-disc list-inside">
                    <li>Best case: O(1) - Target is the first element</li>
                    <li>Average case: O(n/2)</li>
                    <li>Worst case: O(n) - Target is the last element or not present</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="binary" className="mt-8">
          <div className="glass-card p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">About Binary Search</h3>
            <p className="text-sm text-muted-foreground">
              Binary search is a divide-and-conquer algorithm that works on sorted arrays. It repeatedly divides the search interval in half until the target value is found or the interval is empty.
            </p>
            <div className="mt-4">
              <div className="glass-card p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Time Complexity</div>
                <div className="text-xs text-muted-foreground">
                  <ul className="list-disc list-inside">
                    <li>Best case: O(1) - Target is the middle element</li>
                    <li>Average case: O(log n)</li>
                    <li>Worst case: O(log n) - Target is not present</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <div className="text-sm font-medium mb-1 text-accent">Note</div>
              <div className="text-xs text-muted-foreground">
                Binary search requires a sorted array. If you enter an unsorted array, it will be automatically sorted in ascending order.
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Visualizer>
  );
};

export default SearchVisualization;
