import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Grid,
  Avatar,
  TableFooter,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import fruber from '../../assets/fruber.png';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Cart() {
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cep, setCep] = useState('');
  const [qtd, setQtd] = useState([]);
  const [number, setNumber] = useState('');
  const [productsToBuy, setProductsToBuy] = useState([]);

  useEffect(() => {
    const cart = localStorage.getItem('cart');

    async function fetchApi() {
      const response = await api.post('products/cart', {
        cart: cart.split(','),
      });
      setProducts(response.data);

      setProductsToBuy(
        response.data.map((p) => ({
          id: p.id,
          quantity: '1',
        }))
      );

      setQtd(response.data.map(() => 1));
      setLoading(false);
    }
    if (cart) {
      fetchApi();
    }
  }, []);

  function deleteCart() {
     localStorage.removeItem('cart');
    window.location.reload();
  }

  function buyItems() {
    if (number === '' || cep === '') {
      alert('Preencher endereço de entrega');
      return;
    }
    try {
      api.post('/orders', {
        cart: productsToBuy,
        cep,
        number,
        authId:  localStorage.getItem('authId'),
      });
       localStorage.removeItem('cart');
      // alert('Itens comprados com sucesso');
      window.location.replace('orders');
    } catch (e) {
      alert(e);
    }
  }

  function prepareReq(qtd, productId) {
    const productIndex = productsToBuy.findIndex((p) => p.id === productId);

    if (productIndex >= 0) {
      const productsToBuyCopy = productsToBuy;
      productsToBuyCopy[productIndex] = {
        id: productId,
        quantity: qtd,
      };
      setProductsToBuy(productsToBuyCopy);
    } else {
      setProductsToBuy([
        ...productsToBuy,
        {
          id: productId,
          quantity: qtd,
        },
      ]);
    }
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '80vh' }}
      >
        <div>
          <img src={fruber} height="300" />
        </div>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Qtd</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar
                    alt="Remy Sharp"
                    src={`http://localhost:3000/${product.image}`}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>R$ {product.price}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    id="quantity"
                    label="Qtd"
                    name="quantity"
                    onChange={(e) => {
                      prepareReq(e.target.value, product.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <TextField
                  variant="outlined"
                  id="cep"
                  label="cep"
                  name="cep"
                  onChange={(e) => setCep(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  id="number"
                  label="Numero da casa"
                  name="number"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={deleteCart}
                >
                  Excluir carrinho
                </Button>
              </TableCell>

              <TableCell />
              <TableCell />

              <TableCell>
                <Button variant="contained" color="primary" onClick={buyItems}>
                  Comprar
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>

      <div className={classes.seeMore}>
        <Link color="primary" href="/marketplace">
          Voltar
        </Link>
      </div>
    </>
  );
}
