import * as ds from "./include/data_structures";
import { ShoppingData, Company, Store, Product } from "./types";
import * as locations from "./locations";
import { assert } from "console";

// TYPES

// DEFINITIONS

let data: ShoppingData = ShoppingData.read(); // all shopping data
let stores: Array<Store> = []; // stores to be read
let storesByName: Map<string, Store> = new Map(); // map stores by name
let companies: Array<Company> = []; // companies to be read
let companiesByName: Map<string, Store> = new Map(); // map companies by name

// FUNCTIONS

/**
 * Sets up the data required within a given radius from center
 * that may contribute to the given requirements.
 */
function loadData(
    center: string,
    radius: number,
    requirements: Map<string, number>,
) {
    companies = data.companies;
    for (let i = 0; i < companies.length; i++) {
        // for each company
        let company = companies[i];
        companiesByName[company.name] = company;
        for (let j = 0; j < company.stores.length; j++) {
            // for each store
            let store = company.stores[j];
            store.productsByName = new Map(); // map store by name for faster access
            for (let k = 0; k < store.products.length; k++) {
                // for each product
                store.productsByName.set(
                    store.products[k].name,
                    store.products[k],
                );
            }
            if (locations.distance(center, store.location) <= radius) {
                // store within radius
                let flag = false; // contributes requirement?
                for (let [key, val] of Array.from(requirements.entries())) {
                    // contributes requirement
                    if (store.productsByName.has(key)) {
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    // contributes requirement
                    stores.push(store);
                    storesByName[store.location] = store;
                }
            }
        }
    }
}

/**
 * Constructs the graph given data created by loadData().
 */
function constructGraph(): Array<Array<number>> {
    let graph: Array<Array<number>> = ds.Arr2d(stores.length, stores.length);
    for (let i = 0; i < stores.length; i++) {
        graph[i][i] = 0;
        for (let j = i + 1; j < stores.length; j++) {
            let q = locations.distance(stores[i].location, stores[j].location);
            graph[i][j] = q;
            graph[j][i] = q;
        }
    }
    return graph;
}

/**
 * Shortest path.
 */
function shortestPath(
    requirements: Map<string, number>,
    distanceToPrice: number,
) {
    assert(stores.length < 32); // input sizes cannot exceed maximum

    /**
     * Dijstra State: {time, store bitmask, requirement bitmask}
     */
    class DijkstraState {
        time: number;
        storeVis: number;
        reqVis: number;

        constructor(t: number, x: number, y: number) {
            this.storeVis = x;
            this.reqVis = y;
        }

        static compare(x: DijkstraState, y: DijkstraState) {
            if (x.time < y.time) {
                return -1;
            } else if (x.time > y.time) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    let pq = new ds.PriorityQueue<DijkstraState>(DijkstraState.compare);
    pq.push(new DijkstraState(0, 0, 0));
    while (!pq.empty()) {
        let curr = pq.top();
    }
}

// MAIN

function dataMain() {
    console.log(data);
    let req = new Map();
    req.set("a", 1);
    loadData("", 1, req);
    shortestPath(req, 0);
}
dataMain();
