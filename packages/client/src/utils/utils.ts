export const highlightCode = (
    code: string,
    className: string = "default-inline"
) => code.replace(
    /`([^`]+)`/g, 
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
