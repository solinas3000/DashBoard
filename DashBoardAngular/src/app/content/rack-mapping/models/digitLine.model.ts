import { ElementHardware } from './elementHardware.model';
import { RessourceHardware } from './ressourceHardware.model';


export class DigitLine {
    RessourceHardwarePlayer: RessourceHardware;
    ID_RessourceHardwareConfiguration: number;
    Position: number;
    Installed: boolean;
    InstalledDate: string;
    RemovedDate: string;
    ID_RessourceStudio: number;
    RessourceHardwareRack: RessourceHardware;
    RessourceStudio: RessourceStudio;
    Elements: ElementHardware[];
}

interface RessourceStudio {
    ID_RessourceStudio: number;
    RessourceStudio_Code: string;
    RessourceStudio_Name: string;
    RessourceStudio_Active: boolean;
}
