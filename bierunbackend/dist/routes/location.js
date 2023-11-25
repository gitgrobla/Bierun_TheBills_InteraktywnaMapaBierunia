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
exports.default = router;
