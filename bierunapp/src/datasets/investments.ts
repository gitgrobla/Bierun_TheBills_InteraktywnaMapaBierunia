enum Author {
  UM = "Urząd Miasta",
  Novodom = "Novodom",
  OI = "Office Invest",
}

enum Category {
  IM = "Infrastruktura Miejska",
  M = "Mieszkalnictwo",
  NK = "Nieruchomości Komercyjne",
  ZM = "Zieleń Miejska",
}

enum Status {
  InProgress = "W trakcie realizacji",
  Planned = "Planowane",
  Completed = "Zrealizowane",
}

export interface Investment {
  id: number;
  name: string;
  position: [number, number];
  parcelNumbers: string[];
  lookFrom: [number, number, number];
  lookAt: [number, number, number];
  description: string;
  address: string;
  thumbnail: string;
  author: Author;
  category: Category;
  status: Status;
  rating: number;
}

export const investments: Investment[] = [
  {
    id: 1,
    name: `Żłobek Miejski`,
    author: Author.UM,
    category: Category.IM,
    status: Status.InProgress,
    position: [50.08510348060948, 19.08550176047189],
    parcelNumbers: ["1188/105"],
    lookFrom: [1330.079767019904, 70.34743673964317, -319.4244152839161],
    lookAt: [1316.3375508153927, 48.58777741221098, -415.4734203843787],
    thumbnail:
      "https://www.bierun.pl/assets/pics/aktualnosci/2023-11/392888306_1189794271935999_1713115306181596185_n.jpg",
    description: `Miasto Bieruń otrzymało dofinansowanie w ramach programu "MALUCH+" 2022-2029 na budowę gminnego żłobka przy ul. Chemików 39 w Bieruniu. Dofinansowanie w wysokości 1 872 223,05 zł pochodzi ze środków KPO w wysokości 1 649 652,00 zł oraz środków budżetu państwa w wysokości 222 571,05 zł.`,
    address: `Chemików 39, 43-150 Bieruń`,
    rating: 89
  },
  {
    id: 2,
    name: "Rewitalizacja parku",
    author: Author.UM,
    category: Category.IM,
    status: Status.InProgress,
    position: [50.093276925244645, 19.091772628794484],
    parcelNumbers: ["470/322", "469/322", "468/322"],
    lookFrom: [1326.404612843529, 70.34743673964317, -319.4244152839161],
    lookAt: [1316.3375508153927, 48.58777741221098, -415.4734203843787],
    thumbnail:
      "https://www.bierun.pl/assets/pics/aktualnosci/2021-06/rynek_zegar.png",
    description: "Rewitalizacja parku miejskiego w Bieruniu",
    address: "Rynek 9, 43-150 Bieruń",
    rating: 101
  },
  {
    id: 3,
    name: "Osiedle mieszkaniowe",
    author: Author.Novodom,
    category: Category.M,
    status: Status.Planned,
    position: [50.07704372185465, 19.100444497360993],
    parcelNumbers: ["1096/71"],
    lookFrom: [1326.404612843529, 70.34743673964317, -319.4244152839161],
    lookAt: [1316.3375508153927, 48.58777741221098, -415.4734203843787],
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/54fecc7ee4b0331c7905ca30/1695740149894-UMW1G0YFQ7WW7U0WKA7G/image-asset.jpeg?format=2500w",
    description: "Nowoczesne osiedle mieszkaniowe na południu Bierunia",
    address: "Bojszowska 79, 43-150 Bieruń",
    rating: 54
  },
  {
    id: 4,
    name: "Kompleks biurowy",
    author: Author.OI,
    category: Category.NK,
    status: Status.InProgress,
    position: [50.09231078264969, 19.07357567290032],
    parcelNumbers: ["2599/124"],
    lookFrom: [1326.404612843529, 70.34743673964317, -319.4244152839161],
    lookAt: [1316.3375508153927, 48.58777741221098, -415.4734203843787],
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Algeco_modular_office_building.jpg",
    description: "Kompleks biurowy w Bieruniu",
    address: "Szynowa 20, 43-150 Bieruń",
    rating: 42
  },
];

export function get_investment_by_number(
  number: string
): Investment | undefined {
  return investments.find((investment) =>
    investment.parcelNumbers.includes(number)
  );
}
