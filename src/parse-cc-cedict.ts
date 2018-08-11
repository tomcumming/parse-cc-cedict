import {readFileSync} from 'fs';

export type Definition = {
    simplified: string;
    traditional: string;
    pronunciation: string;
    definitions: string[];
};

export const lineRegex = /(\S+)\s+(\S+)\s+\[([^\]]*)\]\s+\/(.*)\/\s*$/;

export function parse(contents: string): Definition[] {
    const definitions: Definition[] = [];
    const lines = contents.split('\n');
    lines.forEach((line, i) => {
        if(line.startsWith('#') || line === '') return; // skip comments and blanks
        const match = lineRegex.exec(line);
        if(match !== null)
            definitions.push({
                traditional: match[1],
                simplified: match[2],
                pronunciation: match[3],
                definitions: match[4].split('/')
            });
        else
            process.stderr.write(`Invalid line format ${i + 1}: ${line}\n`);
    });
    return definitions;
}

export function parseFile(filename: string): Definition[] {
    const contents = readFileSync(filename, 'utf-8');
    return parse(contents);
}
