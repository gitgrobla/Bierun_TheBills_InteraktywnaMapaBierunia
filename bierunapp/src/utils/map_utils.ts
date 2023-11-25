import api from "../api/api";

export async function get_parcel_number(x: number, y: number) {
  return await api
    .get(
      `/location/by_coordinates?lat=${y}&lng=${x}&sourceCRS=EPSG4326&targetCRS=EPSG2180`
    )
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
}
