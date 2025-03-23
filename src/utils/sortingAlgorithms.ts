
import { highlightElement } from "@/utils/animations";

export const bubbleSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  arrayItemsRef: (HTMLDivElement | null)[]
) => {
  let swapped;
  
  for (let i = 0; i < arr.length; i++) {
    swapped = false;
    
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Highlight current elements being compared
      if (arrayItemsRef[j] && arrayItemsRef[j + 1]) {
        highlightElement(arrayItemsRef[j]!, "#3b82f6", 500);
        highlightElement(arrayItemsRef[j + 1]!, "#3b82f6", 500);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        
        // Update the UI
        setArray([...arr]);
        
        // Animate the swap
        if (arrayItemsRef[j] && arrayItemsRef[j + 1]) {
          highlightElement(arrayItemsRef[j]!, "#22c55e", 500);
          highlightElement(arrayItemsRef[j + 1]!, "#ef4444", 500);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    if (!swapped) break;
  }
  
  return arr;
};

export const selectionSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  arrayItemsRef: (HTMLDivElement | null)[]
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    
    // Highlight current minimum
    if (arrayItemsRef[minIndex]) {
      highlightElement(arrayItemsRef[minIndex]!, "#3b82f6", 500);
    }
    
    for (let j = i + 1; j < arr.length; j++) {
      // Highlight element being compared
      if (arrayItemsRef[j]) {
        highlightElement(arrayItemsRef[j]!, "#f97316", 300);
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (arr[j] < arr[minIndex]) {
        // Reset old minimum
        if (arrayItemsRef[minIndex] && minIndex !== i) {
          highlightElement(arrayItemsRef[minIndex]!, "transparent", 300);
        }
        
        minIndex = j;
        
        // Highlight new minimum
        if (arrayItemsRef[minIndex]) {
          highlightElement(arrayItemsRef[minIndex]!, "#3b82f6", 300);
        }
      } else if (arrayItemsRef[j] && j !== minIndex) {
        // Reset compared element
        highlightElement(arrayItemsRef[j]!, "transparent", 300);
      }
    }
    
    if (minIndex !== i) {
      // Swap elements
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      
      // Update the UI
      setArray([...arr]);
      
      // Animate the swap
      if (arrayItemsRef[i] && arrayItemsRef[minIndex]) {
        highlightElement(arrayItemsRef[i]!, "#22c55e", 500);
        highlightElement(arrayItemsRef[minIndex]!, "#ef4444", 500);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return arr;
};

export const insertionSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  arrayItemsRef: (HTMLDivElement | null)[]
) => {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    
    // Highlight current element
    if (arrayItemsRef[i]) {
      highlightElement(arrayItemsRef[i]!, "#3b82f6", 500);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    while (j >= 0 && arr[j] > current) {
      // Highlight element being compared
      if (arrayItemsRef[j]) {
        highlightElement(arrayItemsRef[j]!, "#f97316", 300);
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      arr[j + 1] = arr[j];
      j--;
      
      // Update the UI
      setArray([...arr]);
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    arr[j + 1] = current;
    
    // Update the UI
    setArray([...arr]);
    
    // Highlight inserted element
    if (arrayItemsRef[j + 1]) {
      highlightElement(arrayItemsRef[j + 1]!, "#22c55e", 500);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  return arr;
};

export const quickSort = async (
  arr: number[],
  low: number,
  high: number,
  setArray: (arr: number[]) => void,
  arrayItemsRef: (HTMLDivElement | null)[]
) => {
  if (low < high) {
    const pivotIndex = await partition(arr, low, high, setArray, arrayItemsRef);
    await quickSort(arr, low, pivotIndex - 1, setArray, arrayItemsRef);
    await quickSort(arr, pivotIndex + 1, high, setArray, arrayItemsRef);
  }
  return arr;
};

const partition = async (
  arr: number[],
  low: number,
  high: number,
  setArray: (arr: number[]) => void,
  arrayItemsRef: (HTMLDivElement | null)[]
) => {
  const pivot = arr[high];
  
  // Highlight pivot
  if (arrayItemsRef[high]) {
    highlightElement(arrayItemsRef[high]!, "#a855f7", 500);
  }
  
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // Highlight current element
    if (arrayItemsRef[j]) {
      highlightElement(arrayItemsRef[j]!, "#3b82f6", 300);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (arr[j] <= pivot) {
      i++;
      
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
      
      // Update the UI
      setArray([...arr]);
      
      // Animate the swap
      if (arrayItemsRef[i] && arrayItemsRef[j] && i !== j) {
        highlightElement(arrayItemsRef[i]!, "#22c55e", 500);
        highlightElement(arrayItemsRef[j]!, "#ef4444", 500);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Swap pivot to its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Update the UI
  setArray([...arr]);
  
  // Animate the swap
  if (arrayItemsRef[i + 1] && arrayItemsRef[high] && i + 1 !== high) {
    highlightElement(arrayItemsRef[i + 1]!, "#22c55e", 500);
    highlightElement(arrayItemsRef[high]!, "#ef4444", 500);
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return i + 1;
};

export const mergeSort = async (
  arr: number[],
  left: number,
  right: number,
  setArray: (arr: number[]) => void,
  arrayItemsRef: (HTMLDivElement | null)[]
) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    // Highlight current range
    for (let i = left; i <= right; i++) {
      if (arrayItemsRef[i]) {
        highlightElement(arrayItemsRef[i]!, "#3b82f6", 300);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await mergeSort(arr, left, mid, setArray, arrayItemsRef);
    await mergeSort(arr, mid + 1, right, setArray, arrayItemsRef);
    await merge(arr, left, mid, right, setArray, arrayItemsRef);
  }
  
  return arr;
};

const merge = async (
  arr: number[],
  left: number,
  mid: number,
  right: number,
  setArray: (arr: number[]) => void,
  arrayItemsRef: (HTMLDivElement | null)[]
) => {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  
  const L = new Array(n1);
  const R = new Array(n2);
  
  // Populate left and right arrays
  for (let i = 0; i < n1; i++) L[i] = arr[left + i];
  for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
  
  let i = 0, j = 0, k = left;
  
  while (i < n1 && j < n2) {
    // Highlight elements being compared
    if (arrayItemsRef[left + i] && arrayItemsRef[mid + 1 + j]) {
      highlightElement(arrayItemsRef[left + i]!, "#f97316", 300);
      highlightElement(arrayItemsRef[mid + 1 + j]!, "#f97316", 300);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    
    // Update the UI and highlight merged element
    setArray([...arr]);
    if (arrayItemsRef[k]) {
      highlightElement(arrayItemsRef[k]!, "#22c55e", 300);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    k++;
  }
  
  // Copy remaining elements
  while (i < n1) {
    arr[k] = L[i];
    
    // Update the UI and highlight merged element
    setArray([...arr]);
    if (arrayItemsRef[k]) {
      highlightElement(arrayItemsRef[k]!, "#22c55e", 300);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    
    // Update the UI and highlight merged element
    setArray([...arr]);
    if (arrayItemsRef[k]) {
      highlightElement(arrayItemsRef[k]!, "#22c55e", 300);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    j++;
    k++;
  }
  
  return arr;
};
