import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get('products');
      setProducts(response.data);
      console.log(response.data);
      setLoading(false);
    }

    fetchApi();
  }, []);

  function addToCart(productId) {
    const cart =  localStorage.getItem('cart');

    if (!cart) {
       localStorage.setItem('cart', [productId]);
    } else {
       localStorage.setItem('cart', [...cart.split(','), productId]);
    }
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
                {products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`http://localhost:3000/${product.image}`}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <Typography>R$ {product.price}</Typography>
                        <Typography>{product.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          type="submit"
                          fullWidth
                          variant="contained"
                          onClick={() => addToCart(product.id)}
                        >
                          Comprar
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
