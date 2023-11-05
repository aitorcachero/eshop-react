// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { CartContext } from '../contexts/CartContext';

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
