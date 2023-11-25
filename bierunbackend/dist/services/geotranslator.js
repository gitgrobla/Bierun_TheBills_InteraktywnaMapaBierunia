"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedFormat = exports.ESPG2180 = exports.ESPG4326 = exports.transformCoordinates = void 0;
const proj4_1 = __importDefault(require("proj4"));
function transformCoordinates(lat, lng, sourceCRS, targetCRS) {
    try {
        console.log(lat, lng);
        const parsed_lat = parseFloat(lat.toString());
        const parsed_lng = parseFloat(lng.toString());
        const transform = (0, proj4_1.default)(sourceCRS, targetCRS);
        const [x, y] = transform.forward([parsed_lng, parsed_lat]);
        return { x, y };
    }
    catch (error) {
        console.log(error);
        return { x: -1, y: -1 };
    }
}
exports.transformCoordinates = transformCoordinates;
const ESPG4326 = 'EPSG:4326';
exports.ESPG4326 = ESPG4326;
const ESPG2180 = '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs';
exports.ESPG2180 = ESPG2180;
function getParsedFormat(formatName) {
    switch (formatName) {
        case 'EPSG4326':
            return ESPG4326;
        case 'EPSG2180':
            return ESPG2180;
    }
    return ESPG4326;
}
exports.getParsedFormat = getParsedFormat;
