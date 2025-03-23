
import { useState, useEffect, useRef } from "react";
import Visualizer from "@/components/Visualizer";
import { toast } from "sonner";
import AlgorithmDetails from "@/components/sorting/AlgorithmDetails";
import SortingControls from "@/components/sorting/SortingControls";
import ArrayVisualization from "@/components/sorting/ArrayVisualization";
import { highlightElement } from "@/utils/animations";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort
} from "@/utils/sortingAlgorithms";

const SortingVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [inputArray, setInputArray] = useState("");
  const [arraySize, setArraySize] = useState("5");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [isAnimating, setIsAnimating] = useState(false);
  const arrayItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.title = "Sorting Visualization | DSA Visualizer";
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    let size = 5; // Default size
    
    // Try to parse the user input size
    const userSize = parseInt(arraySize);
    if (!isNaN(userSize) && userSize > 1) {
      // Limit the size to a reasonable range (2-15)
      size = Math.min(Math.max(userSize, 2), 15);
    } else {
      // If input is invalid, reset to default and notify user
      setArraySize("5");
      if (arraySize !== "") {
        toast.warning("Using default size of 5. Please enter a number between 2 and 15.");
      }
    }
    
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 90) + 10
    ); // Random values between 10 and 99
    setArray(newArray);
    setInputArray(newArray.join(", "));
  };

  const parseInputArray = () => {
    if (inputArray.trim() === "") {
      toast.error("Please enter values for the array");
      return false;
    }

    try {
      const parsed = inputArray
        .split(",")
        .map((item) => {
          const num = parseInt(item.trim());
          if (isNaN(num)) throw new Error("Invalid number");
          return num;
        })
        .filter((num) => !isNaN(num));

      if (parsed.length < 2) {
        toast.error("Please enter at least 2 numbers");
        return false;
      }

      if (parsed.length > 15) {
        toast.error("Please enter at most 15 numbers for better visualization");
        return false;
      }

      setArray(parsed);
      return true;
    } catch (error) {
      toast.error("Invalid input. Please enter numbers separated by commas");
      return false;
    }
  };

  const applyCustomArray = () => {
    if (!isAnimating) {
      parseInputArray();
    }
  };

  const startSorting = async () => {
    if (isAnimating) return;
    if (!parseInputArray()) return;

    setIsAnimating(true);
    
    try {
      switch (selectedAlgorithm) {
        case "bubble":
          await bubbleSort([...array], setArray, arrayItemsRef.current);
          break;
        case "selection":
          await selectionSort([...array], setArray, arrayItemsRef.current);
          break;
        case "insertion":
          await insertionSort([...array], setArray, arrayItemsRef.current);
          break;
        case "quick":
          const arrCopy = [...array];
          await quickSort(arrCopy, 0, arrCopy.length - 1, setArray, arrayItemsRef.current);
          break;
        case "merge":
          await mergeSort(array, 0, array.length - 1, setArray, arrayItemsRef.current);
          break;
        default:
          await bubbleSort([...array], setArray, arrayItemsRef.current);
      }
      
      // Highlight the sorted array
      for (let i = 0; i < array.length; i++) {
        if (arrayItemsRef.current[i]) {
          highlightElement(arrayItemsRef.current[i]!, "#22c55e", 300);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      toast.success("Sorting complete!");
    } catch (error) {
      toast.error("Error during sorting visualization");
      console.error(error);
    } finally {
      setIsAnimating(false);
    }
  };

  const setArrayRefs = (refs: React.RefObject<(HTMLDivElement | null)[]>) => {
    arrayItemsRef.current = refs.current || [];
  };

  return (
    <Visualizer
      title="Sorting Algorithms Visualization"
      description="Visualize different sorting techniques with step-by-step animation."
    >
      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SortingControls 
            arraySize={arraySize}
            setArraySize={setArraySize}
            inputArray={inputArray}
            setInputArray={setInputArray}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            generateRandomArray={generateRandomArray}
            applyCustomArray={applyCustomArray}
            startSorting={startSorting}
            isAnimating={isAnimating}
          />
          
          <AlgorithmDetails algorithm={selectedAlgorithm} />
        </div>
        
        <ArrayVisualization 
          array={array} 
          setArrayItemsRef={setArrayRefs} 
        />
      </div>
    </Visualizer>
  );
};

export default SortingVisualization;
