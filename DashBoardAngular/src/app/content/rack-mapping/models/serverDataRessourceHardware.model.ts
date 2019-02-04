import { RessourceHardware } from './ressourceHardware.model';

export interface ServerDataRessourceHardware {
    _items: RessourceHardware[];
    _meta: meta;
}

interface meta {
    page: number;
    max_results: number;
    total: number;
}
