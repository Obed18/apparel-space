import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ProductCard from "./ProductCard";
import "../styles/BestSellers.css";
import { Product } from "../types";

const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const { data } = await supabase
        .from("ecom_products")
        .select("*, variants:ecom_product_variants(*)")
        .eq("status", "active")
        .contains("tags", ["bestseller"])
        .limit(4);

      setProducts(data || []);
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="best-sellers">
      <div className="best-sellers__header">
        <div className="best-sellers__title-wrapper">
          <p className="best-sellers__subtitle">Trending Now</p>

          <h2 className="best-sellers__title">
            Bestsellers
          </h2>
        </div>

        <Link
          to="/shop"
          className="best-sellers__shop-link"
        >
          Shop All
        </Link>
      </div>

      <div className="best-sellers__grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;