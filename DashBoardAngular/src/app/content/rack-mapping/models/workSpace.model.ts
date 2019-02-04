import { DigitLine } from './digitLine.model';

export interface Workspace {
    ID_RessourceStudio: number;
    RessourceStudio_Code: string;
    RessourceStudio_Name: string;
    RessourceStudio_Active: boolean;
    RessourceStudio_CreationDate: string;
    RessourceStudio_LastModificationDate: string;
    lineDigits: DigitLine[] | number[];
}
