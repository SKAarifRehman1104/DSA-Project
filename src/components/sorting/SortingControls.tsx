
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortingControlsProps {
  arraySize: string;
  setArraySize: (size: string) => void;
  inputArray: string;
  setInputArray: (value: string) => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
  generateRandomArray: () => void;
  applyCustomArray: () => void;
  startSorting: () => void;
  isAnimating: boolean;
}

const SortingControls: React.FC<SortingControlsProps> = ({
  arraySize,
  setArraySize,
  inputArray,
  setInputArray,
  selectedAlgorithm,
  setSelectedAlgorithm,
  generateRandomArray,
  applyCustomArray,
  startSorting,
  isAnimating,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="glass-card p-4 rounded-lg">
        <label className="text-sm text-muted-foreground mb-2 block">
          Set array size:
        </label>
        <div className="flex gap-2">
          <Input
            type="number"
            min="2"
            max="15"
            value={arraySize}
            onChange={(e) => setArraySize(e.target.value)}
            placeholder="Enter array size (2-15)"
            disabled={isAnimating}
          />
          <Button 
            variant="outline" 
            onClick={generateRandomArray}
            disabled={isAnimating}
          >
            Generate
          </Button>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-lg">
        <label className="text-sm text-muted-foreground mb-2 block">
          Enter array elements (comma separated):
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
            disabled={isAnimating}
          />
          <Button 
            variant="outline" 
            onClick={applyCustomArray}
            disabled={isAnimating}
          >
            Apply
          </Button>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-lg">
        <label className="text-sm text-muted-foreground mb-2 block">
          Select sorting algorithm:
        </label>
        <Select
          value={selectedAlgorithm}
          onValueChange={setSelectedAlgorithm}
          disabled={isAnimating}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="bubble">Bubble Sort</SelectItem>
              <SelectItem value="selection">Selection Sort</SelectItem>
              <SelectItem value="insertion">Insertion Sort</SelectItem>
              <SelectItem value="quick">Quick Sort</SelectItem>
              <SelectItem value="merge">Merge Sort</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={startSorting} 
        disabled={isAnimating}
        className="w-full"
      >
        {isAnimating ? "Sorting..." : "Start Sorting"}
      </Button>
    </div>
  );
};

export default SortingControls;
