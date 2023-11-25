import fetch from 'node-fetch'

async function fetchGeocode(endpoint:string) {
    console.log(endpoint)
    return await fetch(`https://geocode.maps.co/${endpoint}`)
    .then(async response => {
        if (response.ok) {
            const parsed = await response.json()
            console.log(parsed)
            return parsed
          }else {
            throw new Error(`geocode invalid request ${response.status}`);
          }
    })
}

async function getCoordsByAddresss(address: string){
    const result = await fetchGeocode(`search?q=${address}`)
    console.log(result)
    if (result.length == 0) return [-1,-1]
    const x = parseFloat(result[0].lat)
    const y = parseFloat(result[0].lon)
    return[x,y]
}

export {
    getCoordsByAddresss
}