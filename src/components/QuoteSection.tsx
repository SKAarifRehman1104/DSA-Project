
import { useState, useEffect, useCallback } from "react";
import quotes from "@/data/quotes";

const QuoteSection = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  const getRandomQuote = useCallback(() => {
    const currentIndex = quotes.findIndex(
      (quote) => 
        quote.text === currentQuote.text && 
        quote.author === currentQuote.author
    );
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentIndex);
    
    return quotes[newIndex];
  }, [currentQuote]);

  const changeQuote = useCallback(() => {
    setFadeState("out");
    
    // After fade out completes, change the quote and fade in
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setFadeState("in");
    }, 500);
  }, [getRandomQuote]);

  useEffect(() => {
    // Change quote every 5 seconds
    const interval = setInterval(changeQuote, 5000);
    return () => clearInterval(interval);
  }, [changeQuote]);

  return (
    <div className="container mx-auto px-4">
      <div className="glass-card p-8 rounded-lg max-w-3xl mx-auto">
        <div 
          className={`transition-opacity duration-500 ${
            fadeState === "in" ? "opacity-100" : "opacity-0"
          }`}
        >
          <blockquote className="text-center">
            <p className="text-xl font-light italic mb-4 leading-relaxed text-gradient">
              "{currentQuote.text}"
            </p>
            <footer className="text-sm text-muted-foreground">
              — <cite>{currentQuote.author}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
