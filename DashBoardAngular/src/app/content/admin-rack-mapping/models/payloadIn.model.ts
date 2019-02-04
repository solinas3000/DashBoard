export interface updateRhIn {
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

//------------------------------------------//

export interface removeWorkSpIn {
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

export interface addWorkSpIn {
  ID_RessourceStudio: number;
  RessourceStudio_CreationDate: Date;
  RessourceStudio_LastModificationDate: string;
  RessourceStudio_Code: string;
  RessourceStudio_Name: string;
  RessourceStudio_Active: boolean;
}

//------------------------------------------//

export interface removeWorkSpsIn {
  req: Req[];
}

interface Req {
  RessourceStudio_Code: string;
  RessourceStudio_Name: string;
  lineDigits: LineDigit[];
}

//------------------------------------------//

export interface updateWorkspaceIn {
  ID_RessourceStudio: number;
  RessourceStudio_CreationDate: Date;
  RessourceStudio_Code: string;
  RessourceStudio_Name: string;
  RessourceStudio_Active: boolean;
}

//------------------------------------------//

interface RessourceHardwarePlayer {
  ID_RessourceHardware: number;
}

export interface removeLineDigitIn {
  ID_RessourceHardwareConfiguration: number;
  RessourceHardwareRack: RessourceHardwareRack;
  RessourceHardwarePlayer: RessourceHardwarePlayer;
}

//------------------------------------------//

interface ReqPR {
  ID_line: number;
  position: number;
  ID_rack: number;
  nameRack: string;
}

export interface updatePositionInRackIn {
  req: ReqPR[];
}

//------------------------------------------//

interface RessourceHardware {
  ID_RessourceHardware: number;
}

interface ElementList {
  ID_RessourceHardwareConfigurationElement: number;
  RessourceHardwareConfiguration: number;
  Position: number;
  RessourceHardware: RessourceHardware;
}

export interface savePositionElementsIn {
  ID_RessourceHardwareConfiguration: number;
  elementList: ElementList[];
}

//------------------------------------------//

interface RessourceHardwarePlayerC {
  BarCode: string;
}

interface RessourceHardwareConfiguration {
  ID_RessourceHardwareConfiguration: number;
  RessourceHardwarePlayer: RessourceHardwarePlayerC;
}

interface NewPlayer {
  ID_RessourceHardware: number;
  RessourceConfigurationPlayer: any[];
}

export interface changePlayerIn {
  RessourceHardwareConfiguration: RessourceHardwareConfiguration;
  newPlayer: NewPlayer;
}

//------------------------------------------//

interface RessourceHardwareCE {
  BarCode: string;
}

interface RessourceHardwareConfigurationElement {
  ID_RessourceHardwareConfigurationElement: number;
  RessourceHardware: RessourceHardwareCE;
}

interface NewRh {
  ID_RessourceHardware: number;
}

export interface changeElementIn {
  RessourceHardwareConfigurationElement: RessourceHardwareConfigurationElement;
  newRh: NewRh;
}

//------------------------------------------//

interface RemovedElt {
  ID_RessourceHardwareConfigurationElement: number;
}

export interface removeEltsAndSavePositionEltsIn {
  ID_RessourceHardwareConfiguration: number;
  removedElt: RemovedElt[];
  elementList: ElementList[];
}

//------------------------------------------//

export interface removePlayerIn {
  ID_RessourceHardware: number;
  BarCode: string;
}

//------------------------------------------//

export interface createRessourceHardwareIn extends updateRhIn {}

//------------------------------------------//


export interface RessourceHardwareRackR {
  ID_RessourceHardware: number;
  BarCode: string;
}

export interface RessourceHardwarePlayerR {
  ID_RessourceHardware: number;
}

export interface Line {
  ID_RessourceHardwareConfiguration: number;
  RessourceHardwareRack: RessourceHardwareRackR;
  RessourceHardwarePlayer: RessourceHardwarePlayerR;
}

export interface LineList {
  line: Line;
}

export interface removeRackIn {
  lineList: LineList[];
}

//------------------------------------------//


export interface Line {
  Position: number;
  ID_RessourceHardwareConfiguration: number;
  ID_RessourceStudio: number;
  InstalledDate: Date;
  RessourceHardwareRack: RessourceHardwareRackR;
}

export interface LineToAdd {
  type: string;
  line: Line;
}

export interface RacksPosition {
  ID_line: number;
  position: number;
  ID_rack: number;
  nameRack: string;
}

export interface createLineAndSavePositionIn {
  lineToAdd: LineToAdd[];
  racksPosition: RacksPosition[];
}
