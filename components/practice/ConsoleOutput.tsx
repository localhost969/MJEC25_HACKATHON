import React, { useState, useEffect, useRef } from 'react';
import { CommandLineIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface ConsoleOutputProps {
  output: string[];
  isRunning: boolean;
}

const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ output, isRunning }) => {
  const [typedOutput, setTypedOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [cursor, setCursor] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for console output
  useEffect(() => {
    if (isRunning && currentLine < output.length) {
      const timer = setTimeout(() => {
        setTypedOutput(prev => [...prev, output[currentLine]]);
        setCurrentLine(prev => prev + 1);
        
        // Scroll to bottom
        if (consoleRef.current) {
          consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
      }, Math.random() * 200 + 100); // Random timing for more realistic effect
      
      return () => clearTimeout(timer);
    }
  }, [isRunning, currentLine, output]);

  // Blinking cursor effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(timer);
  }, []);

  // Reset output if new run
  useEffect(() => {
    if (isRunning && output.length > 0 && currentLine === 0) {
      setTypedOutput([]);
    }
  }, [isRunning, output, currentLine]);

  return (
    <div className="mt-4 border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-800 text-white px-3 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <CommandLineIcon className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Console Output</span>
        </div>
        <button 
          className="text-gray-400 hover:text-white"
          onClick={() => {
            if (consoleRef.current) {
              consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
            }
          }}
        >
          <ArrowDownIcon className="h-4 w-4" />
        </button>
      </div>
      
      <div 
        ref={consoleRef}
        className="bg-gray-900 text-white p-3 font-mono text-sm whitespace-pre-wrap overflow-y-auto"
        style={{ height: '200px', scrollBehavior: 'smooth' }}
      >
        {/* Console header */}
        <div className="text-gray-500 mb-2">
          &gt; Running your code...
        </div>
        
        {/* Typed output */}
        {typedOutput.map((line, idx) => (
          <div key={idx} className={line.includes('Passed') ? 'text-green-400' : 
                                  line.includes('Failed') ? 'text-red-400' : 
                                  line.includes('Error') ? 'text-yellow-400' : 
                                  'text-gray-300'}>
            {line}
          </div>
        ))}
        
        {/* Blinking cursor */}
        {isRunning && currentLine < output.length && (
          <span className={`inline-block w-2 h-4 ${cursor ? 'bg-white' : 'bg-transparent'}`}></span>
        )}
        
        {/* Completion message */}
        {currentLine >= output.length && output.length > 0 && (
          <div className="text-gray-500 mt-2 pt-2 border-t border-gray-700">
            &gt; Execution completed
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsoleOutput; 