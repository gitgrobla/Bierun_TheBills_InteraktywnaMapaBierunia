import proj4 from 'proj4';

function transformCoordinates(lat: number, lng: number, sourceCRS: string, targetCRS: string) {
    try {
        console.log(lat, lng)
        const parsed_lat = parseFloat(lat.toString())
        const parsed_lng = parseFloat(lng.toString())

        const transform = proj4(sourceCRS, targetCRS);
        const [x, y] = transform.forward([parsed_lng, parsed_lat]);
        return { x, y };
    } catch (error) {
        console.log(error)
        return { x: -1, y: -1 };
    }
}

const ESPG4326 = 'EPSG:4326';
const ESPG2180 = '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs'

function getParsedFormat(formatName: string) {
    switch (formatName) {
        case 'EPSG4326':
            return ESPG4326
        case 'EPSG2180':
            return ESPG2180
    }
    return ESPG4326
}



export {
    transformCoordinates, ESPG4326, ESPG2180, getParsedFormat
}