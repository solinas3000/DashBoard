import { updateRhIn, removeWorkSpIn, addWorkSpIn, removeWorkSpsIn, updateWorkspaceIn, removeLineDigitIn, updatePositionInRackIn, savePositionElementsIn, changePlayerIn, changeElementIn, removeEltsAndSavePositionEltsIn, removePlayerIn, createRessourceHardwareIn, removeRackIn, createLineAndSavePositionIn } from "./payloadIn.model";
import { removeWorkSpOut, updateRhOut, addWorkSpOut, removeWorkSpsOut, updateWorkspaceOut, updatePositionInRackOut, savePositionElementsOut, changePlayerOut, changeElementOut, removeEltsAndSavePositionEltsOut, removePlayerOut, createRessourceHardwareOut, removeLineDigitOut, removeRackOut, createLineAndSavePositionOut } from "./payloadOut.model";


export interface RackMappingHistory {
  ID_RessourceRackMappingHistory: number,
  Agent: string,
  LastModified: string,
  ActionPath: string,
  PayloadIn:  any | createLineAndSavePositionIn | removeRackIn | updateRhIn | removeWorkSpIn | addWorkSpIn | removeWorkSpsIn | updateWorkspaceIn | removeLineDigitIn | updatePositionInRackIn | savePositionElementsIn | changePlayerIn | changeElementIn | removeEltsAndSavePositionEltsIn | removePlayerIn | createRessourceHardwareIn,
  PayloadOut:  any | createLineAndSavePositionOut | removeRackOut |updateRhOut | removeWorkSpOut | addWorkSpOut | removeWorkSpsOut | updateWorkspaceOut | removeLineDigitOut | updatePositionInRackOut | savePositionElementsOut | changePlayerOut | changeElementOut | removeEltsAndSavePositionEltsOut | removePlayerOut | createRessourceHardwareOut ,
}

export interface preRackMappingHistory {
  ID_RessourceRackMappingHistory: number,
  Agent: string,
  LastModified: string,
  ActionPath: string,
  PayloadIn:  any,
  PayloadOut:  any
}


export interface Meta {
  page: number;
  max_results: number;
  total: number;
}

export interface preServerData {
  _items: preRackMappingHistory[];
  _meta: Meta;
}

export interface ServerData {
  _items: RackMappingHistory[];
  _meta: Meta;
}
