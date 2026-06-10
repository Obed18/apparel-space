import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { formatPrice } from "../lib/format";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import "../styles/ProductCard.css";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { has, toggle } = useWishlist();
  const { addToCart } = useCart();

  const img = product.images?.[0];
  const img2 = product.images?.[1] || img;

  const onSale = product.tags?.includes("sale");

  const quickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const variant =
      product.variants?.find(
        (v) => v.inventory_qty == null || v.inventory_qty > 0
      ) || product.variants?.[0];

    addToCart(
      {
        product_id: product.id,
        variant_id: variant?.id || undefined,
        name: product.name,
        variant_title: variant?.title || undefined,
        sku: variant?.sku || product.sku,
        price: variant?.price || product.price,
        image: img,
        handle: product.handle,
      },
      1
    );
  };

  const handleWishlistToggle = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    toggle(product.id);
  };

  return (
    <Link
      to={`/product/${product.handle}`}
      className="product-card-link"
    >
      <div className="product-card-image-wrapper">
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="product-card-image product-card-image-primary"
        />

        <img
          src={img2}
          alt={product.name}
          loading="lazy"
          className="product-card-image product-card-image-secondary"
        />

        {onSale && (
          <span className="product-card-sale-badge">
            Sale
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          aria-label="Toggle wishlist"
          className="product-card-wishlist-btn"
        >
          <Heart
            className={`product-card-heart ${
              has(product.id)
                ? "product-card-heart-active"
                : "product-card-heart-default"
            }`}
          />
        </button>

        <button
          onClick={quickAdd}
          className="product-card-quick-add"
        >
          Quick Add
        </button>
      </div>

      <div className="product-card-content">
        <p className="product-card-category">
          {product.product_type}
        </p>

        <h3 className="product-card-title">
          {product.name}
        </h3>

        <p className="product-card-price">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;