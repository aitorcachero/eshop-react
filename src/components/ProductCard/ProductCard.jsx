import './ProductCard.css';
import useCart from '../../hooks/useCart.js';
import useProducts from '../../hooks/useProducts.js';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { setCart, cart, setTotalItems } = useCart();
  const { getProduct } = useProducts();
  const handleAddCartClick = (e) => {
    const producto = getProduct(product.id);
    if (cart.find((item) => item.id == producto.id)) {
      toast.error('El producto ya está en el carrito');
    } else {
      setCart((prev) => [...prev, producto]);
      producto.count = 1;
      setTotalItems((prev) => prev + 1);
      toast.success('Producto añadido al carrito');
    }
  };

  return (
    <article className="card">
      <div className="img-container">
        <div className="burbuja-discount">
          <h4 className="discount">-{product.discountPercentage}%</h4>
        </div>
        <img className="img" src={product.thumbnail} />
      </div>

      <h4>{product.title}</h4>
      <h4>{product.price} €</h4>

      <button className="btn-shop" onClick={handleAddCartClick}>
        <img
          className="img-shop"
          src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
        />
      </button>
    </article>
  );
}
