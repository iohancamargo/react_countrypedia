/* Libs */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

/* Material ui components */
import { Button,
        Grid, 
        Card, 
        CardContent,
        CardMedia ,
        Container, 
        CardActions,
        IconButton,
        InputAdornment,
        TextField, 
        Typography, 
      }  from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';

/* Components */
import { toast } from 'react-toastify';
import { history } from '../../routers/AppRouter';
import { startGetCountries } from '../../actions/countries';

/* Styles */
import { formListTheme }  from '../styles/formCard';
import { listCardTheme, listCardStyles }  from '../styles/listCards';

function addCountriesAction(countries) {
    return { type: 'POPULATE_COUNTRIES', countries }
}

const HomePage = () => {
    const classes = listCardStyles();
    const dispatch = useDispatch();
    const [textFilter, setTextFilter] = useState("");
    const [listCountries, setListCountries] = useState([]);
    const [alreadySearch, setAlreadySearch] = useState(false);
    const [alreadyFilter, setAlreadyFilter] = useState(false);
    const listCountriesRedux = useSelector(state => state.countries);

    function addCountries(countriesData) {
        dispatch(addCountriesAction(countriesData));
    }
    
    const handleFilterCountries = (textTyped) => {
        setAlreadyFilter(true);
        setTextFilter(textTyped);

        /* Filtra lista do redux */
        if(textTyped !== undefined && textTyped.trim() !== "" && textTyped.trim() !== null) {
            let filtredArr = [];
            listCountriesRedux.filter((country) => {
                if (country.name.toLowerCase().indexOf(textTyped.toLowerCase()) > -1  || country.nativeName.toLowerCase().indexOf(textTyped.toLowerCase()) > -1) {
                    filtredArr.push(country);
                }
            });
            console.log('filtredArr', filtredArr);
            setListCountries(filtredArr);
            console.log('listCountries', listCountries);
        } else {
            setListCountries(listCountriesRedux);
            console.log('listCountries else', listCountries);
        }
    }

    useEffect(() => {
        /* Garante que só será realizada uma request para popular o storage */        
        if (listCountriesRedux.length === 0) {
            startGetCountries()
                .then((resCountries) => {                    
                    if (resCountries.success) {
                        let countries = resCountries.data;
                        addCountries(countries);
                        setListCountries(countries);
                        setAlreadySearch(true);
                    } else {
                        toast.error("Ocorreu um erro ao listar os produtos...");
                    }
                });
        } else {
            setListCountries(listCountriesRedux);
            setAlreadySearch(true);
            setAlreadyFilter(true);
        } 
        
    }, [listCountriesRedux] );

    return (
        <>
        {
            listCountries.length === 0 ? (
                alreadySearch === false ? (
                    <>
                        <div className="box-layout" id="content-part">            
                            <div className="box-layout__box">
                                <img className="loader__image" src="/images/loader.gif" alt="loading..."/>
                            </div>
                        </div>
                    </>
                ) : 
                (
                    alreadyFilter === false ? (
                        <Container className={classes.cardGrid} maxWidth="md">                    
                            <Container className={classes.cardGrid} maxWidth="md">
                                <div className="home__search-middle">
                                    <h1 className="home__title-search">Não existem países cadastrados na api.</h1>
                                </div>
                            </Container>
                        </Container>
                    ) : (
                        <>
                            <Container className={classes.cardGrid} maxWidth="md">                    
                                <Container className={classes.cardGrid} maxWidth="md">
                                    <div className="home__search-middle">
                                        <h1 className="home__title-search">Não foi localizado registros com o filtro informado.</h1>
                                    </div>
                                </Container>
                                <Grid container spacing={4} item>
                                    <Grid xs={12} sm={12} md={12} item >
                                        <ThemeProvider theme={listCardTheme}>
                                            <TextField
                                                variant="outlined"
                                                id="searchCountryFilter"
                                                label="Procure por um país"
                                                defaultValue={textFilter}
                                                className="home__input-search"
                                                onBlur={(e) => handleFilterCountries(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton>
                                                        <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </ThemeProvider>
                                    </Grid>
                                </Grid>
                            </Container>
                        </>
                    )
                )
            ) :
            (
                <Container className={classes.cardGrid} maxWidth="md">                    
                    <div className="home__search-middle">
                        <h1 className="home__title-search">Explore os países do mundo</h1>
                    </div>
                    
                    <Grid container spacing={4} item>
                        <Grid xs={12} sm={12} md={12} item >
                            <ThemeProvider theme={listCardTheme}>
                                <TextField
                                    variant="outlined"
                                    id="searchCountry"
                                    label="Procure por um país"
                                    defaultValue={textFilter}
                                    className="home__input-search"
                                    onBlur={(e) => handleFilterCountries(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                            <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }}
                                />
                            </ThemeProvider>
                        </Grid>
                        {listCountries.map((country) => (
                            <Grid item key={country.alpha3Code} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia 
                                        className={classes.cardMedia}
                                        image={country.flag.svgFile}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {country.nativeName}
                                        </Typography>

                                        <Typography>
                                            {country.name}
                                        </Typography>

                                        <Typography>
                                            <strong>Capital:</strong> {country.capital === null ||country.capital === "" ? country.name : country.capital }
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <MuiThemeProvider theme={formListTheme} >
                                            <Button variant="contained" color="primary" onClick={() => history.push(`/detail/${country.alpha3Code}/`)}>
                                                Detalhes
                                            </Button>

                                            <Button variant="contained" color="secondary" onClick={() => history.push(`/edit/${country.alpha3Code}/`)} >
                                                Editar
                                            </Button>
                                        </MuiThemeProvider>
                                    </CardActions>
                                </Card>
                            </Grid> 
                        ))}
                    </Grid>
                </Container>
            )
        }
        </>
    );
};

export default HomePage;
