
import React from "react";

interface AlgorithmDetailsProps {
  algorithm: string;
}

const AlgorithmDetails: React.FC<AlgorithmDetailsProps> = ({ algorithm }) => {
  return (
    <div className="glass-card p-4 rounded-lg flex flex-col">
      <h3 className="text-lg font-medium mb-4">Algorithm Details</h3>
      {algorithm === "bubble" && (
        <div className="text-sm text-muted-foreground">
          <p className="mb-2"><span className="font-medium">Bubble Sort</span> works by repeatedly swapping adjacent elements if they are in the wrong order.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Time Complexity: O(n²)</li>
            <li>Space Complexity: O(1)</li>
            <li>Best Case: O(n) when array is already sorted</li>
          </ul>
        </div>
      )}
      {algorithm === "selection" && (
        <div className="text-sm text-muted-foreground">
          <p className="mb-2"><span className="font-medium">Selection Sort</span> works by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Time Complexity: O(n²)</li>
            <li>Space Complexity: O(1)</li>
            <li>Best Case: O(n²) even if array is sorted</li>
          </ul>
        </div>
      )}
      {algorithm === "insertion" && (
        <div className="text-sm text-muted-foreground">
          <p className="mb-2"><span className="font-medium">Insertion Sort</span> builds the sorted array one item at a time by comparing each with the items before it.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Time Complexity: O(n²)</li>
            <li>Space Complexity: O(1)</li>
            <li>Best Case: O(n) when array is already sorted</li>
          </ul>
        </div>
      )}
      {algorithm === "quick" && (
        <div className="text-sm text-muted-foreground">
          <p className="mb-2"><span className="font-medium">Quick Sort</span> works by selecting a 'pivot' element and partitioning the array around the pivot.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Time Complexity: O(n log n) average, O(n²) worst case</li>
            <li>Space Complexity: O(log n)</li>
            <li>Divide and conquer algorithm</li>
          </ul>
        </div>
      )}
      {algorithm === "merge" && (
        <div className="text-sm text-muted-foreground">
          <p className="mb-2"><span className="font-medium">Merge Sort</span> works by dividing the array into two halves, sorting them, and then merging the sorted halves.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Time Complexity: O(n log n) in all cases</li>
            <li>Space Complexity: O(n)</li>
            <li>Stable sorting algorithm</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlgorithmDetails;
