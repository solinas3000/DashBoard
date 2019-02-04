import { DigitLine } from './digitLine.model';

export interface RessourceHardware {
    ID_RessourceHardware: number;
    Brand: string;
    Model: string;
    SerialNumber: string;
    Price: number;
    Owner: string;
    Status: string;
    Origin: string;
    Category: string;
    Type: string;
    TechnicalInfo: string;
    Comments: string;
    DateIn: string;
    DateImport: string;
    BarCode: string;
    Configuration: string;
    ModuleCommand: string;
    ModuleSpecific: string;
    RessourceConfigurationRack: DigitLine[];
    RessourceConfigurationPlayer: DigitLine[];
    Elements: number[]
}
