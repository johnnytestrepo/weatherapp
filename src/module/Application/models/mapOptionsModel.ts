import {MapCenter} from "./mapCenterModel";

export class MapOptions {
    constructor(
        public center: MapCenter,
        public zoom: number,
    ) {}
}