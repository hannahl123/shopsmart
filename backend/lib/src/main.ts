import * as ds from "./include/data_structures";
import { ShoppingData, Company, Store, Product } from "./types";
import * as locations from "./locations";
import { assert } from "console";
import * as cmath from "./include/math"

// TYPES

// DEFINITIONS

let data: ShoppingData = ShoppingData.read(); // all shopping data
let stores: Array<Store> = []; // stores to be read
let storesByName: Map<string, Store> = new Map(); // map stores by name
let companies: Array<Company> = []; // companies to be read
let companiesByName: Map<string, Company> = new Map(); // map companies by name

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
        companiesByName.set(company.name, company);
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
                    storesByName.set(store.location, store);
                }
            }
        }
    }
}

/**
 * Constructs the graph given data created by loadData().
 */
function constructGraph(center: string): Array<Array<number>> {
    let ns = stores.length;
    let graph: Array<Array<number>> = ds.Arr2d(ns+1, ns+1);
    for (let i = 0; i < ns; i++) {
        graph[i][i] = 0;
        graph[ns][i] = graph[i][ns] = locations.distance(stores[i].location, center);
        for (let j = i + 1; j < ns; j++) {
            let q = locations.distance(stores[i].location, stores[j].location);
            graph[i][j] = q;
            graph[j][i] = q;
        }
    }
    return graph;
}

/**
 * For shortest path function.
 * Dijstra State: {time, store bitmask, requirement bitmask}
 */
class DijkstraState {
    time: number;
    at: number = -1;
    storeVis: number;
    reqVis: number;
    prevStatePtr: DijkstraState | null = null;

    constructor(t: number, at1: number, x: number, y: number,
        prev: DijkstraState | null = null
    ) {
        this.time = t;
        this.storeVis = x;
        this.reqVis = y;
        this.at = at1;
        this.prevStatePtr = prev;
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

/**
 * Shortest path.
 */
function shortestPath_dijkstra(
    graph: Array<Array<number>>,
    requirements: Map<string, number>,
    distanceToPrice: number,
): [DijkstraState | null, Array<Array<Array<DijkstraState | null>>>] {
    // input sizes cannot exceed maximum
    let ns = stores.length;
    let nr = requirements.size;
    if (ns+nr >= 32) {
        console.log("Max number of stores + requirements exceeded");
        assert(false);
    }
    console.log("ns: "+ns+", nr: "+nr);

    let priceAtStore = ds.Arr2d(ns, nr, 0);
    for (let si = 0; si < ns; si++) {
        let store = stores[si];
        let ri = 0;
        for (let [req, quant] of Array.from(requirements.entries())) {
            let prod = store.productsByName.get(req);
            if (prod) {priceAtStore[si][ri] = prod.price*quant;}
            else {priceAtStore[si][ri] = Infinity;}
            ri++;
        }
    }

    const HOME = ns;
    let dist: Array<Array<Array<number>>> = ds.Arr3d(ns+1, 1<<ns, 1<<nr, Infinity);
    let path: Array<Array<Array<DijkstraState | null>>> = ds.Arr3d(ns+1, 1<<ns, 1<<nr, Infinity);
    let pq = new ds.PriorityQueue<DijkstraState>(DijkstraState.compare);
    pq.push(new DijkstraState(0, HOME, 0, 0));
    while (!pq.empty()) {
        let curr = pq.top();
        if (dist[curr.at][curr.storeVis][curr.reqVis] != Infinity) {
            pq.pop();
            continue;
        }
        dist[curr.at][curr.storeVis][curr.reqVis] = -curr.time;
        path[curr.at][curr.storeVis][curr.reqVis] = curr.prevStatePtr;
        if (curr.reqVis == (1<<nr)-1) {
            if (curr.at == HOME) {
                pq.pop();
                return [curr, path];
            }
            else {
                pq.push(new DijkstraState(
                    curr.time - graph[curr.at][HOME]*distanceToPrice,
                    HOME,
                    curr.storeVis,
                    curr.reqVis,
                    curr
                ));
            }
        }
        for (let next = 0; next < ns; next++) {
            if (!((curr.reqVis>>next)%2)) {
                pq.push(new DijkstraState(
                    curr.time - graph[curr.at][next]*distanceToPrice,
                    next,
                    curr.storeVis | (1<<next),
                    curr.reqVis,
                    curr
                ));
            }
        }
        if (curr.at != HOME) {
            for (let buy = 0; buy < nr; buy++) {
                if (!((curr.reqVis>>buy)%2)) {
                    pq.push(new DijkstraState(
                        curr.time - priceAtStore[curr.at][buy],
                        curr.at,
                        curr.storeVis,
                        curr.reqVis | (1<<buy),
                        curr
                    ));
                }
            }
        }
        pq.pop();
    }
    return [null, path];
}

// MAIN

function dataMain() {
    console.log(data);
    let req = new Map();
    req.set("A", 1);
    req.set("B", 2);
    loadData("Home", 100, req);
    let ns = stores.length;
    let nr = req.size;
    const HOME = ns;

    let graph = constructGraph("Home");
    let [state, path] = shortestPath_dijkstra(graph, req, 0.1);
    let dist = Infinity;
    if (state) {
        dist = -state.time
        console.log("TOTAL COST: "+dist);
        let backtrack = [];
        let state1: DijkstraState | null = state;
        while (state1) {
            backtrack.push(state1);
            state1 = state1.prevStatePtr;
        }
        while (backtrack.length > 1) {
            let from = backtrack[backtrack.length-1];
            let to = backtrack[backtrack.length-2];
            console.log(from.at, from.storeVis, from.reqVis);
            console.log(to.at, to.storeVis, to.reqVis);
            console.log("Incur "+(from.time-to.time)+" cost");
            if (from.storeVis != to.storeVis) {
                let si = cmath.logLastBit(from.storeVis^to.storeVis);
                console.log("> Visit store: "+si);
            } else if (from.reqVis != to.reqVis) {
                let ri = cmath.logLastBit(from.reqVis^to.reqVis);
                console.log("> Buy product: "+ri);
            } else if (to.at == HOME) { 
                console.log("> Go home")
            } else { // shouldn't happen
                
            }
            backtrack.pop();
        }
    } else {
        console.log("Unreachable");
    }
}
dataMain();
