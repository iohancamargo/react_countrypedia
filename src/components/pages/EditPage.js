/* Libs */
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

/* Material ui components */
import { Button,
        Card, 
        Container, 
        CardContent,
        FormControl,
        Grid,
        TextField } 
from '@material-ui/core';

import { ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';

/* Components */
import { toast } from 'react-toastify';
import { history } from '../../routers/AppRouter';

/* Styles */
import { listCardTheme } from '../styles/listCards';
import { stylesForm, formTheme, formCardStyles} from '../styles/formCard';


function editCountriesAction(country) {
    return { type: 'EDIT_COUNTRIES', country }
}

const EditPage = () => {
    const classes = formCardStyles();
    const dispatch = useDispatch();
    const { country } = useParams();
    const classesForm = stylesForm();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const listCountriesRedux = useSelector(state => state.countries);

    const [area, setArea] = useState(0);
    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState(0);
    const [nativeName, setNativeName] = useState("");

    useEffect(() => {
        if(listCountriesRedux.length === 0 ) {
            history.push('/');
        }

        if(country !== null){

            let countrySelected = listCountriesRedux.filter((countryList) => countryList.alpha3Code === country);

            if(countrySelected.length === 0){
                toast.success("Selecione um país da lista inicial para visualizar os detalhes...");
                history.push('/');
            }

            setSelectedCountry(countrySelected[0]);
            
            setName(countrySelected[0].name);
            setArea(countrySelected[0].area);
            setCapital(countrySelected[0].capital);
            setNativeName(countrySelected[0].nativeName);
            setPopulation(countrySelected[0].population);
        }
    }, [] );

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/`);
    }

    function editCountry(countryData) {
        dispatch(editCountriesAction(countryData));
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if(nativeName === '' || name === '' || capital === '' || area === '' || population === '' ) {
            toast.warn("Preencha todas as informacoes do formulario...");
            return false;
        }

        selectedCountry.name = name;
        selectedCountry.area = area;
        selectedCountry.capital = capital;
        selectedCountry.nativeName = nativeName;
        selectedCountry.population = population;

        editCountry(selectedCountry);
        toast.success("Informações alteradas com sucesso...");
        history.push(`/detail/${country}/`);
    }

    return (
        <>
            { selectedCountry === null ? (
            <>
                <div className="box-layout" id="content-part">            
                    <div className="box-layout__box">
                        <img className="loader__image" src="/images/loader.gif" alt="loading..."/>
                    </div>
                </div>
            </>
            ) : (
            <>
                <Container className={classes.cardGrid} maxWidth="md">
                    <div className="home__search-middle">
                        <div className="breadcrumbs">
                            <span className="breadcrumbs-link">
                                <Link to={`/`}>Home </Link>
                            </span>
                            <span className="breadcrumbs-text">
                                <strong> / Detalhes </strong>
                            </span>
                        </div>
                        <h1 className="home__title-search">Altere informações dos países</h1>
                    </div>
                    <Grid item key={selectedCountry.alpha3Code} xs={12} sm={12} md={12}>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <img src ={selectedCountry.flag.svgFile} className="edit-page__image" alt={`selectedCountry.name`}/>
                                
                                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => ( handleSubmitForm(e) )}>
                                    <FormControl className={classesForm.root}>
                                        <div>
                                            <ThemeProvider theme={listCardTheme}>
                                                <TextField
                                                    label="Código"
                                                    id="alpha3Code"
                                                    variant="outlined"
                                                    defaultValue={selectedCountry.alpha3Code}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />

                                                <TextField
                                                    required
                                                    id="nativeName"
                                                    variant="outlined"
                                                    label="Nome nativo"
                                                    value={nativeName}
                                                    error={nativeName === ''}
                                                    helperText="Campo nome nativo é obrigatório"
                                                    onChange={(e) => ( setNativeName(e.target.value) )}
                                                />
                                            
                                                <TextField
                                                    required
                                                    id="name"
                                                    label="Nome"
                                                    variant="outlined"
                                                    value={name}
                                                    error={name === ''}
                                                    helperText="Campo nome é obrigatório"
                                                    onChange={(e) => ( setName(e.target.value) )}
                                                />

                                                <TextField
                                                    required
                                                    id="capital"
                                                    label="Capital"
                                                    variant="outlined"
                                                    value={capital}
                                                    error={capital === ''}
                                                    helperText="Campo capital é obrigatório"
                                                    onChange={(e) => ( setCapital(e.target.value) )}
                                                />

                                                <TextField
                                                    required
                                                    id="area"
                                                    label="Área"
                                                    value={area}
                                                    type="number"
                                                    variant="outlined"
                                                    error={area === ''}
                                                    helperText="Campo area é obrigatório"
                                                    onChange={(e) => ( setArea(e.target.value) )}
                                                />
                                                
                                                <TextField
                                                    required
                                                    id="area"
                                                    type="number"
                                                    label="População"
                                                    variant="outlined"
                                                    value={population}
                                                    error={population === ''}
                                                    helperText="Campo população é obrigatório"
                                                    onChange={(e) => ( setPopulation(e.target.value) )}
                                                />
                                            </ThemeProvider>
                                            <MuiThemeProvider theme={formTheme}>
                                                <Button variant="contained" color="primary" type="submit" className="btn-success">
                                                    Salvar
                                                </Button>

                                                <Button variant="contained" color="secondary" className="button-form" type="button"
                                                onClick={(e) => handleCancel(e)}>
                                                    Cancelar
                                                </Button>
                                            </MuiThemeProvider>
                                        </div>                                
                                    </FormControl>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
            </>
            )}
        </>
    );
};

export default EditPage;
