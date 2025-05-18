import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your coding quiz assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('help') || input.includes('hi') || input.includes('hello')) {
      return "I'm here to help you with your coding quizzes! You can ask me about programming concepts, quiz topics, or request study resources.";
    } else if (input.includes('python') || input.includes('java') || input.includes('c++')) {
      return `I see you're interested in ${input.split(' ').find(word => ['python', 'java', 'c++'].includes(word.toLowerCase()))} quizzes. Would you like me to recommend some topics or explain any concepts?`;
    } else if (input.includes('quiz') && (input.includes('difficult') || input.includes('hard'))) {
      return "For difficult quiz questions, I recommend focusing on topics like algorithms, data structures, and optimization problems. Would you like me to suggest some practice problems?";
    } else {
      return "I'm here to help with your coding quizzes! You can ask me about specific programming concepts, request practice problems, or get explanations for quiz answers.";
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h3 className="font-semibold">AI Quiz Assistant</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'ai'
                  ? 'bg-white border border-gray-200 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-60">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about the quizzes..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
