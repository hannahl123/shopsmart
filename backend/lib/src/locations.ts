import * as fs from "fs";
import * as cmath from "./include/math";

/**
 * LocationData maps address to coordinate.
 */
class LocationData {
    pairs: Array<[string, number, number]> = [];
    static read(): LocationData {
        return JSON.parse(fs.readFileSync("../sample_data/address_to_gps.json", "utf8"));
    }
}
// map for access coordinate by address
let gpsMap: Map<string,[number, number]> = new Map();

/**
 * Setup necessary data before the library works.
 */
function setupLocations() {
    let locData: LocationData = LocationData.read();
    for (let i = 0; i < locData.pairs.length; i++) {
        let [name, long, lat] = locData.pairs[i];
        gpsMap.set(name, [long, lat]);
    }
}
setupLocations();

/**
 * Temporary distance solution.
 */
function distanceLazy(address1: string, address2: string): number {
    let gps1 = gpsMap.get(address1);
    let gps2 = gpsMap.get(address2);
    if (!gps1) {gps1 = [0, 0];}
    if (!gps2) {gps2 = [0, 0]}
    return Math.sqrt(
        cmath.sq(gps1[0]-gps2[0]) + cmath.sq(gps1[1]-gps2[1])
    );
}

/**
 * Returns the distance between two addresses.
 */
export function distance(address1: string, address2: string): number {
    return distanceLazy(address1, address2);
}
