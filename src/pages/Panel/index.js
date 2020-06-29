import React, { useState, useEffect } from 'react';
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
  Button,
  TableFooter,
  Typography,
} from '@material-ui/core';
import api from '../../services/api';
import fruber from '../../assets/fruber.png';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Panel() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApi() {
      const response = await api.post('sellers/products', {
        authId: localStorage.getItem('authId'),
      });
      setProducts(response.data);
      setLoading(false);
      console.log(response.data);
    }

    fetchApi();
  }, []);

  async function deleteProduct(productId) {
    await api.delete(`/products/${productId}`);
    window.location.reload();
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
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">
                  <Typography
                    component="h3"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Carregando...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Avatar src={`http://localhost:3000/${product.image}`} />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Excluir produto
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Link color="primary" href="/register-product">
                  Registrar novo produto
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>

      <div className={classes.seeMore}>
        <Link color="primary" href="/marketplace">
          Produtos a venda
        </Link>
      </div>
    </>
  );
}
