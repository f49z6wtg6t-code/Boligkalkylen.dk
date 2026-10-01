export interface PartnerProduct {
  slug: string;
  name: string;
  fraPrice: number; // kr
  imageUrl: string;
}

export const BADEVARELSE_PRODUCTS: PartnerProduct[] = [
  {
    slug: "esther-med-sprosse",
    name: "ESTHER Med Sprosse",
    fraPrice: 9499,
    imageUrl: "https://motivogruppen.com/images/esther-sprosse-60.jpg",
  },
  {
    slug: "margrethe",
    name: "MARGRETHE",
    fraPrice: 9499,
    imageUrl: "https://motivogruppen.com/images/esther-60.jpg",
  },
  {
    slug: "esther-uden-greb",
    name: "ESTHER Uden Greb",
    fraPrice: 9499,
    imageUrl: "https://motivogruppen.com/images/esther-ugreb-60.jpg",
  },
];

export const KOMPLET_FRA_PRIS = 42498;
