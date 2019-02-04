import { ElementHardware } from "./elementHardware.model";

export interface removedEltInterface {
  ID_RessourceHardwareConfiguration: number,
  removedElt: ElementHardware[],
  elementList: ElementHardware[]
}

export interface saveEltInterface {
  ID_RessourceHardwareConfiguration: number,
  elementList: ElementHardware[]
}
