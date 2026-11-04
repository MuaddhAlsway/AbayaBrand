import { connectDatabase, disconnectDatabase } from "./config/database";
import { Product, type IProduct } from "./modules/products/product.model";

const products: Array<Pick<IProduct, "slug" | "name" | "category" | "price" | "image" | "images" | "badge" | "colors" | "sizes" | "isFeatured">> = [
  { slug: "the-essential-abaya", name: "The Essential Abaya", category: "Everyday", price: 349, image: "/products/TheEssentialAbayaColorOne.png", images: ["/products/TheEssentialAbayaColorOne.png", "/products/TheEssentialAbayaColorTwo.png"], badge: "BESTSELLER", colors: ["#24211e", "#51483f"], sizes: ["52", "54", "56", "58", "60"], isFeatured: true },
  { slug: "the-emerald-abaya", name: "The Emerald Abaya", category: "Signature", price: 499, image: "/products/TheEmeraldAbayaColorOne.png", images: ["/products/TheEmeraldAbayaColorOne.png", "/products/TheEmeraldAbayaColorTwo.png"], badge: "NEW", colors: ["#183e34", "#24211e"], sizes: ["52", "54", "56", "58"], isFeatured: true },
  { slug: "the-ivory-abaya", name: "The Ivory Abaya", category: "Occasion", price: 549, image: "/products/TheIvoryAbayaColorOne.png", images: ["/products/TheIvoryAbayaColorOne.png", "/products/TheIvoryAbayaColorTwo.png"], badge: "LIMITED", colors: ["#e6d7c5", "#c4ac94"], sizes: ["52", "54", "56", "58"], isFeatured: true },
  { slug: "the-signature-abaya", name: "The Signature Abaya", category: "Classic", price: 429, image: "/products/TheSignatureAbayaColorOne.png", images: ["/products/TheSignatureAbayaColorOne.png"], colors: ["#24211e", "#e4d8c8"], sizes: ["52", "54", "56", "58", "60"], isFeatured: true },
  { slug: "the-daily-drape-abaya", name: "The Daily Drape Abaya", category: "Everyday", price: 299, image: "/products/TheEssentialAbayaColorTwo.png", images: ["/products/TheEssentialAbayaColorTwo.png", "/products/TheEssentialAbayaColorOne.png"], badge: "NEW", colors: ["#51483f", "#24211e"], sizes: ["52", "54", "56", "58"], isFeatured: true },
  { slug: "the-minimal-abaya", name: "The Minimal Abaya", category: "Everyday", price: 329, image: "/products/TheEssentialAbayaColorOne.png", images: ["/products/TheEssentialAbayaColorOne.png"], colors: ["#24211e"], sizes: ["52", "54", "56", "58", "60"], isFeatured: false },
  { slug: "the-royal-signature-abaya", name: "The Royal Signature Abaya", category: "Signature", price: 529, image: "/products/TheEmeraldAbayaColorTwo.png", images: ["/products/TheEmeraldAbayaColorTwo.png", "/products/TheEmeraldAbayaColorOne.png"], badge: "BESTSELLER", colors: ["#24211e", "#183e34"], sizes: ["52", "54", "56", "58", "60"], isFeatured: true },
  { slug: "the-luxe-signature-abaya", name: "The Luxe Signature Abaya", category: "Signature", price: 559, image: "/products/TheEmeraldAbayaColorOne.png", images: ["/products/TheEmeraldAbayaColorOne.png"], colors: ["#183e34"], sizes: ["52", "54", "56", "58"], isFeatured: false },
  { slug: "the-gala-abaya", name: "The Gala Abaya", category: "Occasion", price: 599, image: "/products/TheIvoryAbayaColorTwo.png", images: ["/products/TheIvoryAbayaColorTwo.png", "/products/TheIvoryAbayaColorOne.png"], badge: "NEW", colors: ["#c4ac94", "#e6d7c5"], sizes: ["52", "54", "56", "58", "60"], isFeatured: true },
  { slug: "the-celebration-abaya", name: "The Celebration Abaya", category: "Occasion", price: 649, image: "/products/TheIvoryAbayaColorOne.png", images: ["/products/TheIvoryAbayaColorOne.png"], colors: ["#e6d7c5"], sizes: ["52", "54", "56", "58"], isFeatured: false },
  { slug: "the-timeless-classic-abaya", name: "The Timeless Classic Abaya", category: "Classic", price: 459, image: "/products/TheSignatureAbayaColorOne.png", images: ["/products/TheSignatureAbayaColorOne.png"], badge: "BESTSELLER", colors: ["#e4d8c8", "#24211e"], sizes: ["52", "54", "56", "58"], isFeatured: true },
  { slug: "the-heritage-abaya", name: "The Heritage Abaya", category: "Classic", price: 489, image: "/products/TheSignatureAbayaColorOne.png", images: ["/products/TheSignatureAbayaColorOne.png"], colors: ["#24211e"], sizes: ["52", "54", "56", "58", "60"], isFeatured: false },
];

async function seed() {
  await connectDatabase();
  const result = await Product.bulkWrite(products.map((product) => ({ updateOne: { filter: { slug: product.slug }, update: { $set: product }, upsert: true } })));
  console.log(`Seeded ${products.length} products: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`);
  await disconnectDatabase();
}

seed().catch(async (error) => { console.error(error); await disconnectDatabase(); process.exitCode = 1; });
