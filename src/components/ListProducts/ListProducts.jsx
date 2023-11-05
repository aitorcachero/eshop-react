import './ListProducts.css';
import ProductCard from '../ProductCard/ProductCard';

export default function ListProducts({ products }) {
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
