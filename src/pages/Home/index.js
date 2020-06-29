import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { FormControlLabel, Radio } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import img from '../../assets/background.jpg';
import api from '../../services/api';

const CONSUMERS = 'consumers';
const SELLERS = 'sellers';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const [selected, setSelected] = useState(CONSUMERS);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const response = await api.post(`/${selected}/login`, user);

      console.log(response.data);
      await localStorage.removeItem('authId');
      await localStorage.setItem('authId', response.data.id);

      if (selected === CONSUMERS) {
        history.push('/marketplace');
      } else {
        history.push('/panel');
      }
    } catch (err) {
      alert('Ocorreu um erro ao logar, verifique seus dados');
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <form className={classes.form} onSubmit={login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <FormControlLabel
                value="start"
                onChange={() => setSelected(SELLERS)}
                control={<Radio color="primary" />}
                label="Vendedor"
                checked={selected === SELLERS}
              />
              <FormControlLabel
                value="start"
                onChange={() => setSelected(CONSUMERS)}
                control={<Radio color="primary" />}
                label="Consumidor"
                checked={selected === CONSUMERS}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Logar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Register" variant="body2">
                  Criar conta
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
