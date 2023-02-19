"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateDeviceInfo = exports.evaluateIpLeak = exports.evaluateTor = void 0;
const evaluateTor = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://check.torproject.org"); // Check if we're using Tor
});
exports.evaluateTor = evaluateTor;
const evaluateIpLeak = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://ipleak.net"); // Check IP address, user agent, etc.
});
exports.evaluateIpLeak = evaluateIpLeak;
const evaluateDeviceInfo = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://www.deviceinfo.me/"); // Check device info
});
exports.evaluateDeviceInfo = evaluateDeviceInfo;
