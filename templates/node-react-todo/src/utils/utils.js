/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
export const convertBooleansToChars = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => {
            const convertedItem = {};
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key) && typeof item[key] === 'boolean') {
                    if (typeof item[key] === 'boolean') {
                        convertedItem[key] = item[key] === true ? 'Y' : 'N';
                    } else {
                        convertedItem[key] = item[key]
                    }
                }
            }
            return convertedItem;
        });
    } else {
        const convertedItem = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (typeof data[key] === 'boolean') {
                    convertedItem[key] = data[key] === true ? 'Y' : 'N';
                } else {
                    convertedItem[key] = data[key]
                }
            }
        }
        return convertedItem;
    }

};

// Function to convert 'N' and 'Y' to boolean in an array of objects
export const convertCharsToBooleans = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => {
            const convertedItem = {};
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    if (item[key] === 'Y') convertedItem[key] = true;
                    else if (item[key] === 'N') convertedItem[key] = false;
                    else convertedItem[key] = item[key];
                }
            }
            return convertedItem;
        });
    }

    else {
        const convertedItem = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === 'Y') convertedItem[key] = true;
                else if (data[key] === 'N') convertedItem[key] = false;
                else convertedItem[key] = data[key];
            }
        }

        return convertedItem;
    }

};
