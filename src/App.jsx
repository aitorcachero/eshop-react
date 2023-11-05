// import useProducts from './hooks/useProducts';
import useProducts from './hooks/useProducts';
import ListProducts from './components/ListProducts/ListProducts';
import SearchForm from './components/SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage/CartPage';
import NavBar from './components/NavBar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OffersPage from './pages/OffersPage/OffersPage';
import ConfirmPage from './pages/ConfirmPage/ConfirmPage';

function App() {
  const { productos, categorys, maxPrice } = useProducts();
  const [products, setProducts] = useState(productos);

  useEffect(() => {}, [productos]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <NavBar />
      {categorys && maxPrice && products && (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchForm
                    categorys={categorys}
                    max={maxPrice}
                    set={setProducts}
                  />
                  <ListProducts products={products} />
                  {products.length === 0 && (
                    <p
                      style={{
                        textAlign: 'center',
                        color: 'red',
                        fontSize: '18px',
                      }}
                    >
                      No hay resultados
                    </p>
                  )}
                </>
              }
            />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="*" element={<h1>404 Página no encontrada</h1>} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
