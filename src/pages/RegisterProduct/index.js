import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import 'react-dropzone-uploader/dist/styles.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterProduct() {
  const classes = useStyles();
  const history = useHistory();
  const [img, setImg] = useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  function uploadImage(e) {
    const imgUpload = e.target.files[0];
    setImg(imgUpload);
  }

  async function createProduct(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', img);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('authId', await localStorage.getItem('authId'));

    try {
      const response = await api.post('/products', formData);
      console.log(response);
      history.push('panel');
    } catch (e) {
      alert('Ocorreu um erro ao cadastrar o produto');
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registrar produto
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <input
              type="file"
              onChange={uploadImage}
              name="image"
              id="image"
              accept="image/*"
            />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Preço"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="quantity"
                label="Qtd"
                type="quantity"
                id="quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Categoria"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => createProduct(e)}
          >
            Registrar produto
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body2">
                Voltar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
