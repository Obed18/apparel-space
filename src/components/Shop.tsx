import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

import "../styles/Shop.css";

interface Collection {
  id: string;
  title: string;
}

interface ProductCollectionLink {
  product_id: string;
}

type ShopProps = {
  title?: string;
};

const Shop: React.FC<ShopProps> = ({ title: pageTitle }) => {
  const [searchParams] = useSearchParams();

  const collection = searchParams.get("collection");
  const type = searchParams.get("type");
  const q = searchParams.get("q");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<string>("featured");
  const [activeType, setActiveType] = useState<string>("all");
  const [title, setTitle] = useState<string>(pageTitle ?? "All Products");

  useEffect(() => {
    if (!collection && !type && !q) {
      setTitle(pageTitle ?? "All Products");
    }
  }, [pageTitle, collection, type, q]);

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      setLoading(true);

      let ids: string[] | null = null;

      if (collection) {
        const { data: col } = await supabase
          .from("ecom_collections")
          .select("id, title")
          .eq("handle", collection)
          .single<Collection>();

        if (col) {
          setTitle(col.title);

          const { data: links } = await supabase
            .from("ecom_product_collections")
            .select("product_id")
            .eq("collection_id", col.id);

          ids = ((links as ProductCollectionLink[]) || []).map(
            (link) => link.product_id
          );
        }
      } else if (q) {
        setTitle(`Search: "${q}"`);
      } else if (type) {
        setTitle(type);
      } else if (pageTitle) {
        setTitle(pageTitle);
      } else {
        setTitle("All Products");
      }

      let query = supabase
        .from("ecom_products")
        .select("*, variants:ecom_product_variants(*)")
        .eq("status", "active");

      if (ids) {
        if (ids.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        query = query.in("id", ids);
      }

      if (q) {
        query = query.ilike("name", `%${q}%`);
      }

      if (type && !collection) {
        query = query.eq(
          "product_type",
          type === "T-Shirts" ? "T-Shirts" : type
        );
      }

      const { data } = await query;

      setProducts((data as Product[]) || []);
      setLoading(false);
      setActiveType("all");
    };

    loadProducts();
  }, [collection, type, q, pageTitle]);

  const types = useMemo<string[]>(() => {
    return [
      "all",
      ...Array.from(
        new Set(
          products
            .map((product) => product.product_type)
            .filter(Boolean) as string[]
        )
      ),
    ];
  }, [products]);

  const visibleProducts = useMemo<Product[]>(() => {
    let list =
      activeType === "all"
        ? products
        : products.filter(
            (product) => product.product_type === activeType
          );

    list = [...list];

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeType, sort]);

  const handleSortChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    setSort(event.target.value);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="shop-hero">
        <div className="shop-container">
          <p className="shop-subtitle">ApparelSpace</p>
          <h1 className="shop-title">{title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="shop-container shop-content">
        <div className="shop-toolbar">
          <div className="shop-filters">
            {types.map((item) => (
              <button
                key={item}
                onClick={() => setActiveType(item)}
                className={`filter-btn ${
                  activeType === item
                    ? "filter-btn-active"
                    : "filter-btn-inactive"
                }`}
              >
                {item === "all" ? "All" : item}
              </button>
            ))}
          </div>

          <div className="shop-sort">
            <SlidersHorizontal className="shop-sort-icon" />

            <select
              value={sort}
              onChange={handleSortChange}
              className="shop-sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="shop-grid loading-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="skeleton-card" />
            ))}
          </div>
        ) : visibleProducts.length === 0 ? (
          <p className="shop-empty">No products found.</p>
        ) : (
          <div className="shop-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
