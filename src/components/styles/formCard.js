import { createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red, green, blue, amber } from '@material-ui/core/colors';

export const formCardStyles = makeStyles((theme) => ({
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
      textAlign: "center",        
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
  },
  card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: "2px #babfbd80 solid",
  },
  cardMedia: {
      paddingTop: '56.25%', // 16:9
      maxWith: '100px',
      border: "2px #babfbd80 solid",
  },
  titleProduct: {
      color: "#1D5297"
  },
  cardContent: {
      flexGrow: 1,
  },
  footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
  },
}));

export const stylesForm = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '30ch',
      },
      '& button': {
        padding: "15px",
        marginLeft: "10px",
        minWidth: "150px",
      },
    },
}));

export const stylesFormList = makeStyles((theme) => ({
    root: {     
      '& button': {        
        marginLeft: "5px",
        minWidth: "105px",
      },
    },
}));

export const formTheme = createMuiTheme({
    palette: {
        primary: {
            main: green['700'],
        },
        secondary: {
            main: red['900']
        }
    }
});

export const formListTheme = createMuiTheme({
    palette: {
        primary: {
            main: blue['600'],
        },
        secondary: {
            main: amber['600']
        }
    }
});