import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CountButtons from '../CountButtons/CountButtons';
import './TableProducts.css';
import useCart from '../../hooks/useCart';
import { toast } from 'react-toastify';

export default function TableProducts({ products }) {
  const { deleteCartProduct } = useCart();

  const handleDeleteProduct = (e, key) => {
    e.preventDefault();
    deleteCartProduct(key);
    toast.success('Producto eliminado del carrito');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '80vw' }} aria-label="simple table">
        <TableHead>
          <TableRow
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'rgba(255, 255, 255, 0.932)',
            }}
          >
            <TableCell></TableCell>
            <TableCell align="center">Producto</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Cantidad&nbsp;</TableCell>
            <TableCell align="center">Total&nbsp;</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'rgba(255, 255, 255, 0.932) !important',
              }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={row.thumbnail}
                  className="img-cart"
                  alt="Imagen del producto"
                />
              </TableCell>
              <TableCell align="center">{row.title} €</TableCell>
              <TableCell align="center">{row.price} €</TableCell>
              <TableCell align="center">
                <CountButtons product={row} />
              </TableCell>
              <TableCell align="center">{row.price * row.count} €</TableCell>
              <TableCell align="center">
                <button onClick={(e) => handleDeleteProduct(e, row.id)}>
                  Eliminar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
