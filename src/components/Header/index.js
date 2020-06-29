import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => history.push('/marketplace')}
        >
          Marketplace
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => window.location.replace('orders')}
        >
          Ordens
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Fruber
        </Typography>

        <Button
          variant="outlined"
          size="small"
          onClick={() => history.push('/cart')}
        >
          Carrinho
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            localStorage.removeItem('authId');
            window.location.reload(true)
            window.location.replace('/');

          }}
        >
          Logout
        </Button>
      </Toolbar>
    </>
  );
}

/**
 * <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link
          color="inherit"
          noWrap
          variant="body2"
          href="/"
          className={classes.toolbarLink}
        >
          section
        </Link>
      </Toolbar>
 */
