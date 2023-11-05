import React, { useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function OffersPage() {
  const [products, setProducts] = useState([]);
  const { getOffers } = useProducts();
  useEffect(() => {
    setProducts(getOffers());
  }, []);

  return (
    <div className="container-grid">
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
