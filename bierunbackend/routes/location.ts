var express = require("express");
var router = express.Router();
import { match } from 'assert';
import { transformCoordinates, ESPG2180, ESPG4326, getParsedFormat, calculatePolygonCenter, calculatePolygonBounds } from '../services/geotranslator'
import { getParcelDataByCoordinates, getParcelWKT, getParcelWKTbyName } from '../services/uldk'
import { getCoordsByAddresss } from '../services/geocode'

router.get('/by_coordinates', async (req, res, next) => {
    const { lat, lng, sourceCRS, targetCRS } = req.query;
    let source = ''
    let target = ''
    try {

        source = getParsedFormat(sourceCRS)
        target = getParsedFormat(targetCRS)

        const { x, y } = transformCoordinates(lng, lat, source, target)

        const result = await getParcelDataByCoordinates(x, y)
        if (result.parcelNumber == -1) return res.status(400).json({ error: 'Nie znaleziono działki' })

        return res.status(200).json({ ...result, x, y })
    } catch (error) {
        next(error)
    }
})

//coords in 2180
router.get('/shape', async (req, res, next) => {
    const { lat, lng, parcelRegion, parcelNumber} = req.query
    try {
        const by_name = typeof(parcelRegion) != 'undefined'
        console.log(req.query)
        const result = (by_name ? await getParcelWKTbyName(parcelRegion, parcelNumber) : await getParcelWKT(lng, lat))
        if (result.parcelWKT == -1) return res.status(400).json({ error: 'Nie znaleziono działki' })
        //POLYGON((...))
        console.log(result)

        const splitted = result.parcelWKT.split('((')[1].split('))')[0].split(',')

        //to 4326
        const parsed: number[][] = []
        splitted.forEach((coord: string) => {
            const [lng, lat] = coord.split(' ')
            const parsed_lng = parseFloat(lng)
            const parsed_lat = parseFloat(lat)
            const { x, y } = transformCoordinates(parsed_lat, parsed_lng, ESPG2180, ESPG4326)
            parsed.push([y, x])
        })

        const polygon_center = calculatePolygonCenter(parsed)
        const max_bounds = calculatePolygonBounds(parsed)
        const name_info = by_name ? {parcelRegion, parcelNumber} : {}

        return res.status(200).json({ coords: parsed, polygon_center, max_bounds, ...name_info })
    } catch (error) {
        next(error)
    }
})

router.get('/by_address', async (req, res, next) => {
    const {address} = req.query;
    try {
        const result = await getCoordsByAddresss(address)
        if (result[0] == -1) return res.status(400).json({ error: 'Niepoprawny adres' })
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})



export default router;