import { DigitLine } from './digitLine.model';

export interface RackForWorkSp {
    name: string;
    lineList: {
        position: number;
        line: DigitLine;
    }[];
}

