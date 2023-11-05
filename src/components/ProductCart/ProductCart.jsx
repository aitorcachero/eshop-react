import { useState } from 'react';

export default function ProductCart({ product, set }) {
  const [count, setCount] = useState(product.count);

  const addCount = () => {
    setCount(count + 1);
    product.count = product.count + 1;
    set((prev) => prev + product.price);
  };

  const subtractCount = () => {
    if (count > 0) {
      setCount(count - 1);
      product.count = product.count - 1;
      set((prev) => prev - product.price);
    }
  };
  return (
    <div className="cart-product">
      <div className="section-img">
        <img className="cart-img" src={product.thumbnail} />
      </div>
      <div className="section-title">
        <h4 className="cart-name">{product.title}</h4>
      </div>
      <div className="section-price">
        <h4 className="cart-price">{product.price} €</h4>
      </div>
      <div className="section-count">
        <h4 className="confirm-count">{product.count}</h4>
      </div>

      <div className="section-total">
        <h4 className="cart-total">Total: {product.price * count}€</h4>
      </div>
    </div>
  );
}
