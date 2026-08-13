import { SHOP } from "../config/shop";
import type { Product } from "../data/products";

function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function buildWhatsAppOrderLink(product: Pick<Product, "name" | "price">): string {
  const message = `Hi! I'm interested in "${product.name}" (${formatPrice(product.price)}) from ${SHOP.name}. Is it available?`;
  return `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppGeneralLink(): string {
  const message = `Hi! I have a question about your products at ${SHOP.name}.`;
  return `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
