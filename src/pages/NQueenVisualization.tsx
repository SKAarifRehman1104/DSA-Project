
import { useState, useEffect, useRef } from "react";
import Visualizer from "@/components/Visualizer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { highlightElement } from "@/utils/animations";
import { toast } from "sonner";

const NQueenVisualization = () => {
  const [size, setSize] = useState<number>(4);
  const [inputSize, setInputSize] = useState<string>("4");
  const [board, setBoard] = useState<number[][]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<number[][][]>([]);
  const [currentSolution, setCurrentSolution] = useState<number>(0);
  const cellRefs = useRef<(HTMLDivElement | null)[][]>([]);

  useEffect(() => {
    document.title = "N-Queen Visualization | DSA Visualizer";
    initializeBoard(size);
  }, []);

  useEffect(() => {
    // Initialize cellRefs when board changes
    cellRefs.current = Array(board.length)
      .fill(null)
      .map(() => Array(board.length).fill(null));
  }, [board]);

  const initializeBoard = (n: number) => {
    const newBoard = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0));
    setBoard(newBoard);
    setSolutions([]);
    setCurrentSolution(0);
  };

  const handleSizeChange = () => {
    const n = parseInt(inputSize);
    if (isNaN(n) || n < 1) {
      toast.error("Please enter a valid board size");
      return;
    }

    if (n > 12) {
      toast.error("Maximum board size is 12 for performance reasons");
      return;
    }

    setSize(n);
    initializeBoard(n);
    toast.success(`Board size set to ${n}x${n}`);
  };

  const isSafe = (board: number[][], row: number, col: number) => {
    // Check row
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 1) return false;
    }

    // Check upper diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }

    // Check lower diagonal
    for (let i = row, j = col; i < board.length && j >= 0; i++, j--) {
      if (board[i][j] === 1) return false;
    }

    return true;
  };

  const solveNQueensUtil = async (
    col: number,
    tempBoard: number[][],
    allSolutions: number[][][],
    animate: boolean = false
  ): Promise<boolean> => {
    if (col >= size) {
      // Deep copy the solution and add it to allSolutions
      allSolutions.push(tempBoard.map(row => [...row]));
      return true;
    }

    let foundSolution = false;

    for (let row = 0; row < size; row++) {
      // Check if placing a queen is safe
      if (isSafe(tempBoard, row, col)) {
        // Place queen
        tempBoard[row][col] = 1;
        
        // If animating, update the board and highlight the placed queen
        if (animate) {
          setBoard([...tempBoard.map(row => [...row])]);
          await new Promise(resolve => setTimeout(resolve, 300));
          
          if (cellRefs.current[row] && cellRefs.current[row][col]) {
            highlightElement(cellRefs.current[row][col]!, "#22c55e", 300);
          }
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Recursively place queens in remaining columns
        const result = await solveNQueensUtil(col + 1, tempBoard, allSolutions, animate);
        foundSolution = foundSolution || result;

        // Backtrack: remove the queen
        tempBoard[row][col] = 0;
        
        // If animating, update the board and highlight the removed queen
        if (animate) {
          setBoard([...tempBoard.map(row => [...row])]);
          
          if (cellRefs.current[row] && cellRefs.current[row][col]) {
            highlightElement(cellRefs.current[row][col]!, "#ef4444", 300);
          }
          
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    }

    return foundSolution;
  };

  const findAllSolutions = async () => {
    const allSolutions: number[][][] = [];
    const tempBoard = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));
    
    await solveNQueensUtil(0, tempBoard, allSolutions, false);
    return allSolutions;
  };

  const startVisualization = async () => {
    if (isAnimating) return;
    
    try {
      setIsAnimating(true);
      initializeBoard(size);
      
      // First find all solutions without animation
      const allSolutions = await findAllSolutions();
      
      if (allSolutions.length === 0) {
        toast.error(`No solution exists for ${size}-Queens problem`);
        setIsAnimating(false);
        return;
      }
      
      setSolutions(allSolutions);
      setCurrentSolution(0);
      
      // Display the first solution
      setBoard(allSolutions[0].map(row => [...row]));
      
      // Now demonstrate the process with animation
      const animTempBoard = Array(size)
        .fill(0)
        .map(() => Array(size).fill(0));
      
      const animationSolutions: number[][][] = [];
      await solveNQueensUtil(0, animTempBoard, animationSolutions, true);
      
      // Show the first solution after animation is complete
      setBoard(allSolutions[0].map(row => [...row]));
      
      toast.success(`Found ${allSolutions.length} solution${allSolutions.length !== 1 ? 's' : ''} for ${size}-Queens problem`);
    } catch (error) {
      console.error("Error during visualization:", error);
      toast.error("Error during visualization");
    } finally {
      setIsAnimating(false);
    }
  };

  const showSolution = (index: number) => {
    if (index >= 0 && index < solutions.length) {
      setCurrentSolution(index);
      setBoard(solutions[index].map(row => [...row]));
    }
  };

  const showNextSolution = () => {
    const nextIndex = (currentSolution + 1) % solutions.length;
    showSolution(nextIndex);
  };

  const showPrevSolution = () => {
    const prevIndex = (currentSolution - 1 + solutions.length) % solutions.length;
    showSolution(prevIndex);
  };

  return (
    <Visualizer
      title="N-Queen Problem Visualization"
      description="Visualize the classic N-Queen problem using backtracking algorithm."
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-muted-foreground">Board Size (N)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={inputSize}
                onChange={(e) => setInputSize(e.target.value)}
                placeholder="Enter board size"
                min={1}
                max={12}
                className="w-36"
                disabled={isAnimating}
              />
              <Button 
                variant="outline" 
                onClick={handleSizeChange}
                disabled={isAnimating}
              >
                Set Size
              </Button>
            </div>
          </div>
          
          <div className="flex items-end">
            <Button 
              onClick={startVisualization}
              disabled={isAnimating}
            >
              {isAnimating ? "Visualizing..." : "Start Visualization"}
            </Button>
          </div>
        </div>
        
        {solutions.length > 0 && (
          <div className="flex justify-center gap-4 items-center">
            <Button 
              variant="outline" 
              onClick={showPrevSolution}
              disabled={isAnimating || solutions.length <= 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Solution {currentSolution + 1} of {solutions.length}
            </span>
            <Button 
              variant="outline" 
              onClick={showNextSolution}
              disabled={isAnimating || solutions.length <= 1}
            >
              Next
            </Button>
          </div>
        )}
        
        <div className="flex justify-center py-8">
          <div 
            className="glass-card rounded-lg overflow-hidden grid"
            style={{
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              width: `${Math.min(500, size * 50)}px`,
              height: `${Math.min(500, size * 50)}px`,
            }}
          >
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`chess-cell flex items-center justify-center transition-all duration-300 ${
                    (rowIndex + colIndex) % 2 === 0 
                      ? "bg-black/40" 
                      : "bg-black/10"
                  }`}
                  style={{
                    width: `${Math.min(50, 500 / size)}px`,
                    height: `${Math.min(50, 500 / size)}px`,
                  }}
                  ref={(el) => {
                    if (cellRefs.current[rowIndex]) {
                      cellRefs.current[rowIndex][colIndex] = el;
                    }
                  }}
                >
                  {cell === 1 && (
                    <div className="text-2xl queen-icon animate-pulse-soft" style={{ fontSize: `${Math.min(32, 400 / size)}px` }}>
                      ♕
                    </div>
                  )}
                </div>
              ))
            ))}
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">About N-Queen Problem</h3>
          <p className="text-sm text-muted-foreground">
            The N-Queen problem is a classic chess puzzle where you need to place N queens on an N×N chessboard so that no two queens attack each other. A queen can attack any piece in the same row, column, or diagonal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Algorithm</div>
              <div className="text-xs text-muted-foreground">Backtracking</div>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Time Complexity</div>
              <div className="text-xs text-muted-foreground">O(N!)</div>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Space Complexity</div>
              <div className="text-xs text-muted-foreground">O(N²)</div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mt-4">
            <div className="font-medium mb-1">Solutions Count for Common Board Sizes:</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="glass-card px-2 py-1 rounded">1×1: 1 solution</span>
              <span className="glass-card px-2 py-1 rounded">4×4: 2 solutions</span>
              <span className="glass-card px-2 py-1 rounded">5×5: 10 solutions</span>
              <span className="glass-card px-2 py-1 rounded">6×6: 4 solutions</span>
              <span className="glass-card px-2 py-1 rounded">7×7: 40 solutions</span>
              <span className="glass-card px-2 py-1 rounded">8×8: 92 solutions</span>
            </div>
          </div>
        </div>
      </div>
    </Visualizer>
  );
};

export default NQueenVisualization;
