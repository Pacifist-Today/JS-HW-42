"use strict";

export class Model {
    constructor() {
        this.dbName = `Albums`
    }

    get data () {return JSON.parse(localStorage.getItem(this.dbName))}

    setData (originalData) {
        const data = structuredClone(originalData)

        if (this.data) localStorage.setItem(this.dbName, JSON.stringify(data))
    }
}