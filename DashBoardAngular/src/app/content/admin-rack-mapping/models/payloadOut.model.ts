interface RH {
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
}

export interface updateRhOut {
  oldRH: RH;
  newRH: RH;
}

//------------------------------------------//

export interface removeWorkSpOut {
  ID_RessourceStudio: number;
  RessourceStudio_Name: string;
  lineDigits: LineDigit[];
}

interface RessourceHardwareRack {
  BarCode: string;
  ID_RessourceHardware: number;
}

interface LineDigit {
  RessourceHardwareRack: RessourceHardwareRack;
}

//------------------------------------------//

export interface addWorkSpOut {
  ID_RessourceStudio: number;
  RessourceStudio_CreationDate: Date;
  RessourceStudio_LastModificationDate: string;
  RessourceStudio_Code: string;
  RessourceStudio_Name: string;
  RessourceStudio_Active: boolean;
}

//------------------------------------------//

export interface removeWorkSpsOut {
  RessourceStudio_Code: string;
  RessourceStudio_Name: string;
  lineDigits: LineDigit[];
}

//------------------------------------------//

export interface updateWorkspaceOut {
  ID_RessourceStudio: number;
  RessourceStudio_CreationDate: string;
  RessourceStudio_LastModificationDate: string;
  RessourceStudio_Code: string;
  RessourceStudio_Name: string;
  RessourceStudio_Active: boolean;
}

//------------------------------------------//

export interface updatePositionInRackOut {
  BarCode: string;
  ID_RessourceHardwareConfiguration: number;
}

//------------------------------------------//

interface ListElt {
  ID_RessourceHardwareConfigurationElement: number;
  ID_RessourceHardware: number;
  Position: number;
}

export interface savePositionElementsOut {
  BarCode: string;
  ID_RessourceHardwareConfiguration: number;
  listElt: ListElt[];
}

//------------------------------------------//

export interface changePlayerOut extends RH {}

//------------------------------------------//

export interface changeElementOut extends RH {}

//------------------------------------------//

export interface ListEltE {
  ID_RessourceHardwareConfigurationElement: number;
  ID_RessourceHardware: number;
  Position: number;
}

export interface removeEltsAndSavePositionEltsOut {
  BarCode: string;
  ID_RessourceHardwareConfiguration: number;
  listElt: ListEltE[];
}

//------------------------------------------//

export interface removePlayerOut extends RH {}

//------------------------------------------//

export interface createRessourceHardwareOut extends RH {}

//------------------------------------------//

export interface removeLineDigitOut {
  BarCode: string;
  ID_RessourceHardwareConfiguration: number;
}

//------------------------------------------//

export interface removeRackOut {
  BarCode: string;
  ID_RessourceHardwareConfiguration: number;
}


//------------------------------------------//

export interface createLineAndSavePositionOut {
  BarCode: string;
  ID_RessourceHardwareConfiguration: number;
}
