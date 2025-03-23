
import React from "react";
import { cn } from "@/lib/utils";

interface VisualizerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const Visualizer: React.FC<VisualizerProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center animate-on-scroll">
        <h1 className="text-3xl font-medium tracking-tight mb-2 text-gradient">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className={cn("glass-card p-6 rounded-lg", className)}>
        {children}
      </div>
    </div>
  );
};

export default Visualizer;
