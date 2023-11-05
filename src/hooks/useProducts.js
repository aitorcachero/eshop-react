import { useEffect, useState } from 'react';
import { products } from '../mocks/products.json';

export default function useProducts() {
  const [productos, setProductos] = useState(products);
  const [categorys, setCategorys] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    const categorias = new Set(productos.map((product) => product.category));
    setCategorys(Array.from(categorias));
    setMaxPrice(
      products.map((product) => product.price).sort((a, b) => b - a)[0]
    );
  }, [productos]);

  const filteredProducts = (category, price, typeFilter, search) => {
    if (category) {
      return products
        .sort((a, b) => (typeFilter ? a.price - b.price : b.price - a.price))
        .filter((product) => {
          return (
            product.category == category &&
            product.price <= price &&
            product.title.toLowerCase().includes(search.toLowerCase())
          );
        });
    } else {
      return products
        .sort((a, b) => (typeFilter ? a.price - b.price : b.price - a.price))
        .filter((product) => {
          return (
            product.price <= price &&
            product.title.toLowerCase().includes(search.toLowerCase())
          );
        });
    }
  };

  const getOffers = () => {
    return products
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 5);
  };

  const getProduct = (id) => {
    return products.find((product) => product.id == id);
  };

  const checkMaxPrice = (category) => {
    if (category) {
      const productsFiltered = products
        .filter((product) => product.category == category)
        .sort((a, b) => b.price - a.price)[0].price;
      return productsFiltered;
    } else {
      return products.sort((a, b) => b.price - a.price)[0].price;
    }
  };

  return {
    productos,
    categorys,
    maxPrice,
    filteredProducts,
    checkMaxPrice,
    getProduct,
    getOffers,
  };
}
