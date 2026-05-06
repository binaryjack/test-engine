import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  if (!content) return null;

  // Regex to identify code blocks: ```[lang]\n[code]\n```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // Extract language and code content
          const match = part.match(/```(\w+)?\n?([\s\S]*?)\n?```/);
          const language = match?.[1] || 'javascript';
          const code = match?.[2] || '';
          
          return (
            <div key={index} className="my-3 rounded-lg overflow-hidden text-sm shadow-inner bg-slate-950">
              <SyntaxHighlighter
                language={language}
                style={atomDark}
                customStyle={{ 
                  margin: 0, 
                  padding: '1rem', 
                  background: 'transparent',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}
              >
                {code.trim()}
              </SyntaxHighlighter>
            </div>
          );
        }
        
        // Render normal text blocks
        return (
          <span key={index} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      })}
    </div>
  );
}
