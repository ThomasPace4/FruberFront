import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Radio } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

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

const CONSUMERS = 'consumers';
const SELLERS = 'sellers';

export default function Register() {
  const classes = useStyles();

  const history = useHistory();
  const [selected, setSelected] = useState('consumers');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e) {
    e.preventDefault();
    const user = {
      email,
      name,
      phone,
      password,
    };

    try {
      const response = await api.post(`/${selected}`, user);

      await localStorage.removeItem('authId');
      await localStorage.setItem('authId', response.data.id);

      if (selected === CONSUMERS) {
        history.push('/marketplace');
      } else {
        history.push('/panel');
      }
    } catch (err) {
      alert('Ocorreu um erro ao registrar o novo usuário');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Registrar conta
        </Typography>
        <form className={classes.form} onSubmit={registerUser}>
          <Grid container spacing={2}>
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
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Telefone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Ja tem uma conta? Logar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
