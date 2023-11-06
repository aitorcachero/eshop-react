import { useState } from 'react';
import './CountButtons.css';
import useCart from '../../hooks/useCart';

export default function CountButtons({ product }) {
  const [count, setCount] = useState(product.count);
  const { setTotalPrice, setTotalItems } = useCart();

  const addCount = () => {
    setCount(count + 1);
    product.count = product.count + 1;

    setTotalPrice((prev) => prev + product.price);
    setTotalItems((prev) => prev + 1);
  };

  const subtractCount = () => {
    if (count > 1) {
      setCount(count - 1);
      product.count = product.count - 1;
      setTotalPrice((prev) => prev - product.price);
      setTotalItems((prev) => prev - 1);
    }
  };
  return (
    <div className="btn-count">
      <p className="simbol simbol-minus" onClick={subtractCount}>
        -
      </p>
      <input type="text" value={count} className="input-count" />
      <p className="simbol" onClick={addCount}>
        +
      </p>
    </div>
  );
}
