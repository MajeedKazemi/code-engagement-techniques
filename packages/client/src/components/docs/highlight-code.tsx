import * as monaco from "monaco-editor";
import React from "react";

const getColorizedText = async (part:string, language = 'python') => {
    const colorized = await monaco.editor.colorize(
      part.replace(/^[\t ]+/gm, ''),  
      language, 
      {}
    );
    return colorized;
  }

  interface HighlightedPartProps {
    part: string;
  }
  
 export const HighlightedPart: React.FC<HighlightedPartProps> = ({ part }) => {
    const [highlightedCode, setHighlightedCode] = React.useState('');
    
    React.useEffect(() => {
      let isCancelled = false;
      getColorizedText(part).then(result => {
        if (!isCancelled) {
          setHighlightedCode(result)
        }
      });
      return () => {
        isCancelled = true;
      };
    }, [part]);
  
    return (
      <span 
        className="highlighted-code-part"
        style={{overflowWrap: 'break-word', wordWrap: 'break-word', maxWidth: '100%', fontFamily: 'Consolas, monospace', fontSize: '16px'}}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    );
  }
  
