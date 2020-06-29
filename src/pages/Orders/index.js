import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Marketplace() {
  const classes = useStyles();
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApi() {
      const response = await api.post('consumers/orders', {
        authId: await localStorage.getItem('authId'),
      });
      setOrders(response.data);
      console.log(response.data);
      setLoading(false);
    }

    fetchApi();
  }, []);

  async function details(orderId) {
    history.push(`order-detail/${orderId}`);
  }

  return (
    <>
      <CssBaseline />
      <header>
        <Header />
      </header>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {loading ? (
              <Typography
                component="h3"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Carregando...
              </Typography>
            ) : (
              <>
                {orders.map((order) => (
                  <Grid item key={order.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          ID: {order.id}
                        </Typography>
                        <Typography>CEP: {order.cep}</Typography>
                        <Typography>Número: {order.number}</Typography>
                        <Typography>Criado em: {order.createdAt}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          type="submit"
                          fullWidth
                          variant="contained"
                          onClick={() => details(order.id)}
                        >
                          Detalhes
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
}
