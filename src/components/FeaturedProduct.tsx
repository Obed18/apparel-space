import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import { formatPrice } from "../lib/format";
import { useCart } from "../contexts/CartContext";
import "../styles/FeaturedProduct.css";

const SIZES: string[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface ProductVariant {
  id: string;
  option1: string;
  title?: string;
  sku?: string;
  price?: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku?: string;
  handle: string;
  images?: string[];
  variants?: ProductVariant[];
}

interface CartItem {
  product_id: string;
  variant_id?: string;
  name: string;
  variant_title: string;
  sku?: string;
  price: number;
  image?: string;
  handle: string;
}

const FeaturedProduct: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("M");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      const { data } = await supabase
        .from("ecom_products")
        .select("*, variants:ecom_product_variants(*)")
        .eq("handle", "premium-oversized-hoodie")
        .single();

      setProduct(data as Product);
    };

    fetchProduct();
  }, []);

  if (!product) return null;

  const handleAddToCart = (): void => {
    const variant =
      product.variants?.find((v) => v.option1 === size) ||
      product.variants?.[0];

    const cartItem: CartItem = {
      product_id: product.id,
      variant_id: variant?.id,
      name: product.name,
      variant_title: variant?.title || size,
      sku: variant?.sku || product.sku,
      price: variant?.price || product.price,
      image: product.images?.[0],
      handle: product.handle,
    };

    addToCart(cartItem);
  };

  return (
    <section className="featured-product">
      <div className="featured-product-container">
        <div className="featured-product-image-wrapper">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="featured-product-image"
          />

          <span className="featured-product-badge">
            Bestseller
          </span>
        </div>

        <div className="featured-product-content">
          <p className="featured-product-label">
            Featured Product
          </p>

          <h2 className="featured-product-title">
            {product.name}
          </h2>

          <div className="featured-product-rating">
            <div className="featured-product-stars">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="featured-product-star"
                />
              ))}
            </div>

            <span className="featured-product-reviews">
              (124 Reviews)
            </span>
          </div>

          <p className="featured-product-description">
            {product.description}
          </p>

          <p className="featured-product-price">
            {formatPrice(product.price)}
          </p>

          <div className="featured-product-size-section">
            <p className="featured-product-size-label">
              Select Size
            </p>

            <div className="featured-product-sizes">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`featured-product-size-btn ${
                    size === s
                      ? "featured-product-size-btn-active"
                      : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="featured-product-actions">
            <button
              onClick={handleAddToCart}
              className="featured-product-cart-btn"
            >
              Add to Cart
            </button>

            <Link
              to={`/product/${product.handle}`}
              className="featured-product-details-btn"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;