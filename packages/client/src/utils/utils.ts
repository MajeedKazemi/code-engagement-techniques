export const highlightPsudo = (
  code: string,
  className: string = "default-inline"
) => code.replace(
 /`([^`]+)`|'([^']+)'/g, 
 (match, p1, p2) => {
     const content = p1 || p2;
     const classList = content.split(/[{}]+/).map((part:string) => {
         return part;
     });
     if (!classList[0]){
         return `<span class="${className}"></span>`
     }
     let word = classList[0];
     if (!classList[1]){
         return `<span class="${className}">${word}</span>`
     }
     let newClassName = classList[1];
     return `<span class="${newClassName}">${word}</span>`;
 }
);


import { editor, languages } from 'monaco-editor/esm/vs/editor/editor.api';

export const highlightCode = (
  code: string
) => {

  // Now you are ready to tokenize code
  const result: string[] = [];

  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let lineTokens = editor.tokenize(lines[i], 'python')[0];
    let line = lines[i];

    let startOffset = 0;
    for (let token of lineTokens) {
      let endOffset = token.offset;

      result.push('<span class="' + token.type.replace(/\./g, ' ') + '">');
      result.push(line.substring(startOffset, endOffset));
      result.push('</span>');

      startOffset = endOffset;
    }
    result.push('<br/>');
  }

  return result.join('');
};

export const highlightCodeBlock = (
    code: string,
    className: string = "default-indent"
) => code.replace(/{indentation}/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");

export const highlightCodeBlockCode = (
    code: string,
    className: string = "default-indent"
) => code.replace(/{indentation}/g, "&nbsp;&nbsp;&nbsp;");

