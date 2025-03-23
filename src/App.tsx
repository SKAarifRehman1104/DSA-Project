
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

// Lazy load visualization pages
const ArrayVisualization = lazy(() => import("./pages/ArrayVisualization"));
const LinkedListVisualization = lazy(() => import("./pages/LinkedListVisualization"));
const StackQueueVisualization = lazy(() => import("./pages/StackQueueVisualization"));
const SearchVisualization = lazy(() => import("./pages/SearchVisualization"));
const SortingVisualization = lazy(() => import("./pages/SortingVisualization"));
const NQueenVisualization = lazy(() => import("./pages/NQueenVisualization"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center animate-pulse">
              <div className="text-2xl font-light">Loading...</div>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/array" element={<Layout><ArrayVisualization /></Layout>} />
            <Route path="/linked-list" element={<Layout><LinkedListVisualization /></Layout>} />
            <Route path="/stack-queue" element={<Layout><StackQueueVisualization /></Layout>} />
            <Route path="/search" element={<Layout><SearchVisualization /></Layout>} />
            <Route path="/sorting" element={<Layout><SortingVisualization /></Layout>} />
            <Route path="/n-queen" element={<Layout><NQueenVisualization /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
