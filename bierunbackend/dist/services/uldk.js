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
exports.getParcelWKTbyName = exports.getParcelWKT = exports.getParcelDataByCoordinates = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function fetchULDK(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(endpoint);
        return yield (0, node_fetch_1.default)(`https://uldk.gugik.gov.pl/${endpoint}`)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            if (response.ok) {
                const parsed = yield response.text();
                const splitted = parsed.split('\n');
                if (splitted[0].split(' ')[0] == '-1')
                    return 'error';
                return splitted[1];
            }
            else {
                throw new Error(`ULDK invalid request ${response.status}`);
            }
        }));
    });
}
function getParcelDataByCoordinates(x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        const parcelData = yield fetchULDK(`?request=GetParcelByXY&xy=${x},${y}&result=parcel,region`);
        if (parcelData == 'error')
            return { parcelNumber: -1, parcelRegion: -1 };
        const [parcelNumber, parcelRegion] = parcelData.split('|');
        return { parcelNumber, parcelRegion };
    });
}
exports.getParcelDataByCoordinates = getParcelDataByCoordinates;
function getParcelWKT(x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        const parcelWKT = yield fetchULDK(`?request=GetParcelByXY&xy=${x},${y}&result=geom_wkt`);
        if (parcelWKT == 'error')
            return { parcelWKT: -1 };
        return { parcelWKT: parcelWKT.split(';')[1] };
    });
}
exports.getParcelWKT = getParcelWKT;
function getParcelWKTbyName(parcelRegion, parcelNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const regionAndNumber = parcelRegion + ' ' + parcelNumber;
        const parcelWKT = yield fetchULDK(`?request=GetParcelByIdOrNr&id=${regionAndNumber}&result=geom_wkt`);
        if (parcelWKT == 'error')
            return { parcelWKT: -1 };
        return { parcelWKT: parcelWKT.split(';')[1] };
    });
}
exports.getParcelWKTbyName = getParcelWKTbyName;
