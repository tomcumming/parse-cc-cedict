import {readFileSync} from 'fs';

export type Definition = {
    simplified: string;
    traditional: string;
    pronunciation: string;
    definitions: string[];
};

export const lineRegex = /(\S+)\s+(\S+)\s+\[([^\]]*)\]\s+\/(.*)\/$/;

export function parse(contents: string, ignoreErrors = false): Definition[] {
    const definitions: Definition[] = [];
    const lines = contents.split('\n');
    lines.forEach((line, i) => {
        if(line.startsWith('#') || line === '') return; // skip comments and blanks
        const match = lineRegex.exec(line);
        if(match !== null)
            definitions.push({
                simplified: match[1],
                traditional: match[2],
                pronunciation: match[3],
                definitions: match[4].split('/')
            });
        else
            throw new Error('Invalid line format (' + (i + 1) + '):' + line);
    });
    return definitions;
}

export function parseFile(filename: string, ignoreErrors = false): Definition[] {
    const contents = readFileSync(filename, 'utf-8');
    return parse(contents, ignoreErrors);
}