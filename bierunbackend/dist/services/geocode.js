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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordsByAddresss = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function fetchGeocode(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(endpoint);
        return yield (0, node_fetch_1.default)(`https://geocode.maps.co/${endpoint}`)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            if (response.ok) {
                const parsed = yield response.json();
                console.log(parsed);
                return parsed;
            }
            else {
                throw new Error(`geocode invalid request ${response.status}`);
            }
        }));
    });
}
function getCoordsByAddresss(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchGeocode(`search?q=${address}`);
        console.log(result);
        if (result.length == 0)
            return [-1, -1];
        const x = parseFloat(result[0].lat);
        const y = parseFloat(result[0].lon);
        return [x, y];
    });
}
exports.getCoordsByAddresss = getCoordsByAddresss;
