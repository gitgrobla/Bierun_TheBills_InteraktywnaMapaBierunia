export interface Investment {
  id: number;
  name: string;
  position: [number, number];
  parcelNumbers: string[];
  description: string;
  address: string;
  thumbnail: string;
}

export const investments: Investment[] = [
  {
    id: 1,
    name: `Żłobek Miejski`,
    position: [50.08510348060948, 19.08550176047189],
    parcelNumbers: ["1188/105"],
    thumbnail:
      "https://www.bierun.pl/assets/pics/aktualnosci/2023-11/392888306_1189794271935999_1713115306181596185_n.jpg",
    description: `Miasto Bieruń otrzymało dofinansowanie w ramach programu "MALUCH+" 2022-2029 na budowę gminnego żłobka przy ul. Chemików 39 w Bieruniu. Dofinansowanie w wysokości 1 872 223,05 zł pochodzi ze środków KPO w wysokości 1 649 652,00 zł oraz środków budżetu państwa w wysokości 222 571,05 zł.`,
    address: `Chemików 39, 43-150 Bieruń`,
  },
];

export function get_investment_by_number(
  number: string
): Investment | undefined {
  return investments.find((investment) =>
    investment.parcelNumbers.includes(number)
  );
}
