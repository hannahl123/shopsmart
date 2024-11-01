import * as ds from "./include/data_structures"
import {ShoppingData, Company, Store, Product} from "./types";
import * as locations from "./locations";
import {assert} from "console";

// TYPES

// DEFINITIONS

let data: ShoppingData = ShoppingData.read();
let stores: Array<Store> = []; // add values later
let storesByName: Map<string,Store> = new Map();
let companies: Array<Company> = [];
let companiesByName: Map<string,Store> = new Map();

// FUNCTIONS

function loadData(center: string, radius: number, requirements: Map<string,number>) {
    companies = data.companies;
    for (let i = 0; i < companies.length; i++) {
        let company = companies[i];
        companiesByName[company.name] = company;
        for (let j = 0; j < company.stores.length; j++) {
            let store = company.stores[j];
            store.productsByName = new Map();
            for (let k = 0; k < store.products.length; k++) {
                store.productsByName.set(store.products[k].name, store.products[k]);
            }
            if (locations.distance(center, store.location) <= radius) {
                let flag = false;
                for (let [key, val] of Array.from(requirements.entries())) {
                    if (store.productsByName.has(key)) {flag = true; break;}
                }
                if (flag) {
                    stores.push(store);
                    storesByName[store.location] = store;
                }
            }
        }
    }
}

function constructGraph(): Array<Array<number>> {
    let graph: Array<Array<number>> = ds.Arr2d(stores.length, stores.length);
    for (let i = 0; i < stores.length; i++) {
        graph[i][i] = 0;
        for (let j = i+1; j < stores.length; j++) {
            let q = locations.distance(stores[i].location, stores[j].location);
            graph[i][j] = q;
            graph[j][i] = q;
        }
    }
    return graph;
}
function shortestPath(requirements: Map<string, number>, distanceToPrice: number) {
    assert(stores.length < 32);
    
    let dist: number[][] = ds.Arr2d(10, 10, -1);
    
}

// MAIN

function dataMain() {
    console.log(data);
    let req = new Map();
    req.set("a", 1);
    loadData("", 1, req);
}
dataMain();