import React, { useState, useEffect } from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, onChange }) => {
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  
  // Update line numbers whenever code changes
  useEffect(() => {
    const lines = code.split('\n');
    setLineNumbers(Array.from({ length: lines.length }, (_, i) => String(i + 1)));
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      // Insert 2 spaces for tab
      const newText = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newText);
      
      // Move cursor position after the inserted tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden h-[400px] flex-grow flex flex-col">
      {/* Editor header */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center justify-between">
        <div className="flex items-center">
          <CodeBracketIcon className="h-4 w-4 text-gray-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">
            {language === 'javascript' ? 'JavaScript (Node.js)' : 'Python 3'}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Press Tab to indent, Shift+Enter to run
        </div>
      </div>
      
      {/* Editor content */}
      <div className="flex-grow flex overflow-hidden bg-gray-50">
        {/* Line numbers */}
        <div className="bg-gray-100 text-gray-500 text-right p-2 pr-3 font-mono text-sm select-none border-r border-gray-300 overflow-y-hidden">
          {lineNumbers.map((num, i) => (
            <div key={i} className="leading-6">{num}</div>
          ))}
        </div>
        
        {/* Code input */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 font-mono text-sm resize-none focus:outline-none leading-6 bg-white"
          spellCheck="false"
          style={{ 
            tabSize: 2,
            overflowY: 'auto',
            whiteSpace: 'pre',
            caretColor: '#3b82f6'
          }}
          placeholder="Write your solution here..."
        />
      </div>
    </div>
  );
};

export default CodeEditor; 