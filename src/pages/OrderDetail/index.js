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
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import fruber from '../../assets/fruber.png';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function OrderDetail() {
  const { id } = useParams();
  const classes = useStyles();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get(`orders/${id}`);
      setOrder(response.data);
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
        <div>
          <Typography
            component="h3"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Ordem id: {order.id}
          </Typography>
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
                {order.orderProduct.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      <Avatar
                        src={`http://localhost:3000/${o.product.image}`}
                      />
                    </TableCell>
                    <TableCell>{o.product.name}</TableCell>
                    <TableCell>{o.price}</TableCell>
                    <TableCell>{o.amount}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </Grid>

      <div className={classes.seeMore}>
        <Link color="primary" href="/orders">
          Voltar
        </Link>
      </div>
    </>
  );
}
