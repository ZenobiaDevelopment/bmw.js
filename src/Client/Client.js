#!/usr/bin/env node --no-warnings --experimental-specifier-resolution=node

import { fileURLToPath } from 'url';
import path from 'path';
import fetch from 'node-fetch';
import {parseString} from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server = 'https://apim.bmwgroup.com/aftersales';
let token;

class BMW {
    constructor() {
        this.data = [];
    }
    login(token) {
        this.token = token;
    }

    getVehicleBasic(vin, language, callback) {
        if(!vin) return;

        let hostname;

        if (language) {
            hostname = server + `/vehicle-identification/vehicle-basic/v1?vin=${vin}&language=${language}`
        } else if(!language) {
            hostname = server + `/vehicle-identification/vehicle-basic/v1?vin=${vin}`
        }

        const headers = {
            'x-apikey': apikey,
        };


        fetch(hostname, {
            method: 'GET',
        }).then(res => res.text())
            .then(data => {
                parseString(data, (err, result) => {
                    if (err) {
                        throw new Error('Error parsing XML data');
                    }
                      callback(result);
                });
            })
    }


}

export default BMW;
