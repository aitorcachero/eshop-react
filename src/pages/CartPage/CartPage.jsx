import './CartPage.css';
import useCart from '../../hooks/useCart.js';
import { Button } from '@mui/material';
import ProductCart from '../../components/ProductCart/ProductCart.jsx';
import { useEffect, useState } from 'react';
import TableProducts from '../../components/TableProducts/TableProducts.jsx';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, deleteCartProduct, totalPrice, totalItems, setConfirm } =
    useCart();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSetModal = () => {
    setShowModal(!showModal);
  };

  const handleConfirm = () => {
    setShowModal(!showModal);
    setConfirm(true);
    navigate('/confirm');
  };

  return (
    <div className="cart-container-main">
      <div className="cart-container">
        <h1 className="cart-title">Carrito de la compra</h1>
        <div className="cart-products">
          {cart.length === 0 && (
            <div className="cart-empty">
              <h4 className="cart-empty-title">
                No hay productos en el carrito
              </h4>
              <img
                className="cart-empty-img"
                src="https://repuestossat.com/images/WEBP/carrito-vacio.webp"
                width={250}
                style={{ margin: '2rem' }}
              />
            </div>
          )}
          {cart.length > 0 && <TableProducts products={cart} />}
          {cart.length > 0 && (
            <footer className="cart-footer" style={{ margin: '2em' }}>
              <h4 className="cart-total">Total: {totalPrice}€</h4>

              <button className="cart-btn" onClick={handleSetModal}>
                Comprar
              </button>
            </footer>
          )}

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <p>{`¿Estás seguro que quieres comprar ${
                  totalItems < 2 ? `1 elemento` : `${totalItems} elementos`
                } por ${totalPrice} €?`}</p>
                <div className="btns-modal-section-confirm">
                  <button className="modal-btn" onClick={handleSetModal}>
                    Cancelar
                  </button>
                  <button className="modal-btn" onClick={handleConfirm}>
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
