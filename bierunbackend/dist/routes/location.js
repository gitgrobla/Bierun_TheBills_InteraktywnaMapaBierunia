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
var express = require("express");
var router = express.Router();
const geotranslator_1 = require("../services/geotranslator");
const uldk_1 = require("../services/uldk");
const geocode_1 = require("../services/geocode");
router.get('/by_coordinates', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng, sourceCRS, targetCRS } = req.query;
    let source = '';
    let target = '';
    try {
        source = (0, geotranslator_1.getParsedFormat)(sourceCRS);
        target = (0, geotranslator_1.getParsedFormat)(targetCRS);
        const { x, y } = (0, geotranslator_1.transformCoordinates)(lng, lat, source, target);
        const result = yield (0, uldk_1.getParcelDataByCoordinates)(x, y);
        if (result.parcelNumber == -1)
            return res.status(400).json({ error: 'Nie znaleziono działki' });
        return res.status(200).json(Object.assign(Object.assign({}, result), { x, y }));
    }
    catch (error) {
        next(error);
    }
}));
//coords in 2180
router.get('/shape', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng, parcelRegion, parcelNumber } = req.query;
    try {
        const by_name = typeof (parcelRegion) != 'undefined';
        console.log(req.query);
        const result = (by_name ? yield (0, uldk_1.getParcelWKTbyName)(parcelRegion, parcelNumber) : yield (0, uldk_1.getParcelWKT)(lng, lat));
        if (result.parcelWKT == -1)
            return res.status(400).json({ error: 'Nie znaleziono działki' });
        //POLYGON((...))
        console.log(result);
        const splitted = result.parcelWKT.split('((')[1].split('))')[0].split(',');
        //to 4326
        const parsed = [];
        splitted.forEach((coord) => {
            const [lng, lat] = coord.split(' ');
            const parsed_lng = parseFloat(lng);
            const parsed_lat = parseFloat(lat);
            const { x, y } = (0, geotranslator_1.transformCoordinates)(parsed_lat, parsed_lng, geotranslator_1.ESPG2180, geotranslator_1.ESPG4326);
            parsed.push([y, x]);
        });
        const polygon_center = (0, geotranslator_1.calculatePolygonCenter)(parsed);
        const max_bounds = (0, geotranslator_1.calculatePolygonBounds)(parsed);
        const name_info = by_name ? { parcelRegion, parcelNumber } : {};
        return res.status(200).json(Object.assign({ coords: parsed, polygon_center, max_bounds }, name_info));
    }
    catch (error) {
        next(error);
    }
}));
router.get('/by_address', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.query;
    try {
        const result = yield (0, geocode_1.getCoordsByAddresss)(address);
        if (result[0] == -1)
            return res.status(400).json({ error: 'Niepoprawny adres' });
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
