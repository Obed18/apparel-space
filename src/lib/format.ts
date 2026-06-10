// Prices are stored in the smallest currency unit (pesewas). 100 = GH¢1.00
export function formatPrice(cents: number): string {
  return "GH₵ " + (cents / 100).toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const SHIPPING_RULES = "Free shipping on all orders";
export const PROJECT_ID = "6a295d58662a27b2434faf30";
