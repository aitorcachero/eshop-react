// Importamos los prop-types.
// import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { toast } from 'react-toastify';

// Creamos un contexto.
export const CartContext = createContext(null);

// Creamos el componente provider del contexto.
export const CartProvider = ({ children }) => {
  //   const toastError = (errMsg) => toast.error(errMsg);
  //   const toastSuccess = (msg) => toast.success(msg);
  //   const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const total = cart.reduce(
      (acc, product) => acc + product.price * product.count,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const updateCart = (product) => {
    setCart((...prevCart) => prevCart.concat(product));
  };

  const deleteCartProduct = (id) => {
    const countItems = cart.find((p) => p.id === id).count;
    setCart((prevCart) => prevCart.filter((p) => p.id !== id));
    setTotalItems((prev) => prev - countItems);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
        setCart,
        deleteCartProduct,
        totalPrice,
        setTotalPrice,
        totalItems,
        setTotalItems,
        confirm,
        setConfirm,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
