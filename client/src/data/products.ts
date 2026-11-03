import type { Product } from "../types/product";

import essential01 from '../assets/TheEssentialAbayaColorOne.png';
import essential02 from '../assets/TheEssentialAbayaColorTwo.png';
import emerald01 from '../assets/TheEmeraldAbayaColorOne.png';
import emerald02 from '../assets/TheEmeraldAbayaColorTwo.png';
import ivory01 from '../assets/TheIvoryAbayaColorOne.png';
import ivory02 from '../assets/TheIvoryAbayaColorTwo.png';
import signature01 from '../assets/TheSignatureAbayaColorOne.png';


export const products: Product[] = [
  {
    id: "ab-001",
    slug: "the-essential-abaya",
    name: "The Essential Abaya",
    category: "Everyday",
    price: 349,
    image: essential01,
    images: [essential01, essential02],
    badge: "BESTSELLER",
    colors: ["#24211e", "#51483f"],
    sizes: ["52", "54", "56", "58", "60"],
    isFeatured: true,
  },
  {
    id: "ab-002",
    slug: "the-emerald-abaya",
    name: "The Emerald Abaya",
    category: "Signature",
    price: 499,
    image: emerald01,
    images: [emerald01, emerald02],
    badge: "NEW",
    colors: ["#183e34", "#24211e"],
    sizes: ["52", "54", "56", "58"],
    isFeatured: true,
  },
  {
    id: "ab-003",
    slug: "the-ivory-abaya",
    name: "The Ivory Abaya",
    category: "Occasion",
    price: 549,
    image: ivory01,
    images: [ivory01, ivory02],
    badge: "LIMITED",
    colors: ["#e6d7c5", "#c4ac94"],
    sizes: ["52", "54", "56", "58"],
    isFeatured: true,
  },
  {
    id: "ab-004",
    slug: "the-signature-abaya",
    name: "The Signature Abaya",
    category: "Classic",
    price: 429,
    image: signature01,
    images: [signature01, ivory01],
    colors: ["#24211e", "#e4d8c8"],
    sizes: ["52", "54", "56", "58", "60"],
    isFeatured: true,
  },
];