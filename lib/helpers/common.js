"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomElement = void 0;
const getRandomElement = (list) => {
    return list[Math.floor(Math.random() * list.length)];
};
exports.getRandomElement = getRandomElement;
