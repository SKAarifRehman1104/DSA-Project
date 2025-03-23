
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ArrayVisualizationProps {
  array: number[];
  setArrayItemsRef: (refs: React.RefObject<(HTMLDivElement | null)[]>) => void;
  onArrayUpdate?: (newArray: number[]) => void;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ 
  array, 
  setArrayItemsRef,
  onArrayUpdate 
}) => {
  const arrayItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [customArrayInput, setCustomArrayInput] = useState<string>("");
  
  // Set the refs to the parent component
  React.useEffect(() => {
    setArrayItemsRef(arrayItemsRef);
  }, [array.length, setArrayItemsRef]);

  const handleCustomArraySubmit = () => {
    try {
      // Parse the input string to an array of numbers
      const parsedArray = customArrayInput
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "")
        .map(item => {
          const num = Number(item);
          if (isNaN(num)) {
            throw new Error(`Invalid number: ${item}`);
          }
          return num;
        });

      if (parsedArray.length === 0) {
        toast.error("Please enter at least one number");
        return;
      }

      if (parsedArray.length > 50) {
        toast.error("Maximum array size is 50 elements");
        return;
      }

      // Call the onArrayUpdate callback if provided
      if (onArrayUpdate) {
        onArrayUpdate(parsedArray);
        setCustomArrayInput("");
        toast.success("Array updated successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid input");
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4 text-center">Visualization</h3>
      
      {/* Custom array input */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 items-center">
        <Input
          value={customArrayInput}
          onChange={(e) => setCustomArrayInput(e.target.value)}
          placeholder="Enter comma-separated numbers (e.g., 5, 3, 8, 1)"
          className="flex-grow"
        />
        <Button 
          onClick={handleCustomArraySubmit}
          variant="outline" 
          className="whitespace-nowrap"
        >
          Set Custom Array
        </Button>
      </div>
      
      <div className="flex justify-center items-end h-64 gap-3">
        {array.map((value, index) => (
          <div
            key={index}
            className="array-bar glass-card flex flex-col justify-end items-center transition-all duration-300 relative transform hover:scale-110"
            style={{
              height: `${Math.max(30, (value / Math.max(...array)) * 220)}px`,
              width: `${Math.max(30, Math.min(60, 600 / array.length))}px`,
              transform: "perspective(800px) rotateX(10deg)",
              transformStyle: "preserve-3d",
              boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.5)"
            }}
            ref={(el) => (arrayItemsRef.current[index] = el)}
          >
            <span 
              className="text-xs font-medium absolute bottom-2 left-0 right-0 text-center"
              style={{
                textShadow: "0px 0px 2px rgba(0,0,0,0.8)"
              }}
            >
              {value}
            </span>
            
            {/* 3D reflection effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
              style={{ opacity: 0.2 }}
            ></div>
          </div>
        ))}
        {array.length === 0 && (
          <div className="text-muted-foreground">
            Enter array values to visualize
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayVisualization;
