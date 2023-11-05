import './ConfirmPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart.js';
import ProductCart from '../../components/ProductCart/ProductCart';

export default function ConfirmPage() {
  const { cart, setCart, setConfirm, confirm, setTotalItems, totalPrice } =
    useCart();
  const [productsBuyed, setProductsBuyed] = useState(null);
  const [totalPriceBuyed, setTotalPriceBuyed] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!confirm) {
      navigate('/');
      setConfirm(false);
    } else {
      setTotalPriceBuyed(totalPrice);
      setProductsBuyed(cart);
      setCart([]);
      setTotalItems(0);
    }
  }, []);

  return (
    <div className="confirm-container">
      {productsBuyed && (
        <>
          <h1 className="confirm-title">Compra realizada con éxito</h1>
          <p className="confirm-title-products">
            Estos son los productos que has comprado:
          </p>
          <div className="info-container">
            <p className="p-confirm">Imagen</p>
            <p className="p-confirm">Producto</p>
            <p className="p-confirm">Precio</p>
            <p className="p-confirm">Cantidad</p>
            <p className="p-confirm">Total</p>
          </div>
        </>
      )}
      {productsBuyed &&
        productsBuyed.map((product) => {
          return (
            <div key={product.id} className="confirm-product-container">
              <ProductCart product={product} />
            </div>
          );
        })}
      {productsBuyed && (
        <>
          <div className="div-text">
            <h1 className="confirm-title">{`Precio total de la compra: `} </h1>
            <h1 className="confirm-title-price">{`${totalPriceBuyed}`} €</h1>
          </div>
        </>
      )}
    </div>
  );
}
