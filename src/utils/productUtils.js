/**
 * Universal helper for safely extracting pricing and discount information
 * from any backend, database, or mock schema format.
 *
 * Supported property variants:
 * - Discount / Sale: discountPrice, discountedPrice, salePrice, sale_price, discount_price
 * - Regular / Original: originalPrice, regularPrice, original_price, regular_price, mrp
 * - Standard / Base: price, unitPrice, sellingPrice, currentPrice, amount, cost
 */
export const getProductPrices = (product) => {
  if (!product || typeof product !== "object") {
    return {
      unitPrice: 0,
      originalPrice: 0,
      hasDiscount: false,
      discountPrice: null,
      savings: 0,
    };
  }

  const parseNumber = (val) => {
    if (val === null || val === undefined || val === "") return null;
    const num = Number(val);
    return !isNaN(num) && num > 0 ? num : null;
  };

  const rawDiscount =
    product.discountPrice ??
    product.discountedPrice ??
    product.salePrice ??
    product.sale_price ??
    product.discount_price;

  const rawOriginal =
    product.originalPrice ??
    product.regularPrice ??
    product.original_price ??
    product.regular_price ??
    product.mrp;

  const rawStandard =
    product.price ??
    product.unitPrice ??
    product.sellingPrice ??
    product.currentPrice ??
    product.amount ??
    product.cost;

  const parsedDiscount = parseNumber(rawDiscount);
  const parsedOriginal = parseNumber(rawOriginal);
  const parsedStandard = parseNumber(rawStandard);

  let unitPrice = 0;
  let originalPrice = 0;

  if (parsedDiscount !== null) {
    unitPrice = parsedDiscount;
    originalPrice =
      parsedOriginal !== null
        ? parsedOriginal
        : parsedStandard !== null && parsedStandard > parsedDiscount
        ? parsedStandard
        : parsedDiscount;
  } else if (parsedStandard !== null) {
    unitPrice = parsedStandard;
    originalPrice =
      parsedOriginal !== null ? parsedOriginal : parsedStandard;
  } else if (parsedOriginal !== null) {
    unitPrice = parsedOriginal;
    originalPrice = parsedOriginal;
  }

  const hasDiscount = originalPrice > unitPrice && unitPrice > 0;

  return {
    unitPrice,
    originalPrice,
    hasDiscount,
    discountPrice: hasDiscount ? unitPrice : null,
    savings: hasDiscount ? originalPrice - unitPrice : 0,
  };
};

/**
 * Universal helper for safely extracting product image URLs
 */
export const getProductImage = (
  product,
  fallback = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&h=500&fit=crop"
) => {
  if (!product || typeof product !== "object") return fallback;

  if (Array.isArray(product.images) && product.images.length > 0) {
    const first = product.images[0];
    if (typeof first === "string" && first.trim()) return first.trim();
    if (first && typeof first === "object" && first.url && typeof first.url === "string") {
      return first.url.trim();
    }
  }

  if (typeof product.image === "string" && product.image.trim()) {
    return product.image.trim();
  }
  if (typeof product.imageUrl === "string" && product.imageUrl.trim()) {
    return product.imageUrl.trim();
  }
  if (typeof product.thumbnail === "string" && product.thumbnail.trim()) {
    return product.thumbnail.trim();
  }

  return fallback;
};
