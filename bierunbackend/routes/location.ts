var express = require("express");
var router = express.Router();

import { transformCoordinates,getParsedFormat } from '../services/geotranslator'
import { getParcelDataByCoordinates } from '../services/uldk'


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



export default router;