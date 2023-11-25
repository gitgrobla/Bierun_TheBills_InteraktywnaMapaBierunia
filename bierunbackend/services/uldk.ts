import fetch from 'node-fetch'

async function fetchULDK(endpoint:string) {
    console.log(endpoint)
    return await fetch(`https://uldk.gugik.gov.pl/${endpoint}`)
    .then(async response => {
        if (response.ok) {
            const parsed = await response.text()
            const splitted = parsed.split('\n')
            if(splitted[0].split(' ')[0] == '-1') return 'error'
            return splitted[1]
          } else {
            throw new Error(`ULDK invalid request ${response.status}`);
          }
    })
}

async function getParcelDataByCoordinates(x: number, y:number) {
    const parcelData = await fetchULDK(`?request=GetParcelByXY&xy=${x},${y}&result=parcel,region`)
    if(parcelData == 'error') return {parcelNumber: -1, parcelRegion: -1}
    const [parcelNumber, parcelRegion] = parcelData.split('|')
    return {parcelNumber, parcelRegion}
}

async function getParcelWKT(x: number, y: number) {
    const parcelWKT = await fetchULDK(`?request=GetParcelByXY&xy=${x},${y}&result=geom_wkt`)
    if(parcelWKT == 'error') return {parcelWKT: -1}
    
    return {parcelWKT: parcelWKT.split(';')[1]}
}

async function getParcelWKTbyName(parcelRegion: string, parcelNumber: number) {
    const regionAndNumber = parcelRegion + ' ' + parcelNumber
    const parcelWKT = await fetchULDK(`?request=GetParcelByIdOrNr&id=${regionAndNumber}&result=geom_wkt`)
    if(parcelWKT == 'error') return {parcelWKT: -1}
    
    return {parcelWKT: parcelWKT.split(';')[1]}
}

export {
    getParcelDataByCoordinates, getParcelWKT, getParcelWKTbyName
}