/* Libs */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

/* Material ui components */
import { Card, 
        CardMedia,
        Container,
        Typography,
        CardContent
} from '@material-ui/core';

/* Components */
import { toast } from 'react-toastify';
import { history } from '../../routers/AppRouter';
import { formatNumberPtBr } from '../../filters/formatNumberBr';

/* Styles */
import { useStyles } from '../styles/detailCard';

const DetailPage = () => {
    const classes = useStyles();
    const { country } = useParams();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const listCountriesRedux = useSelector(state => state.countries);
    console.log('listCountriesRedux', listCountriesRedux);

    useEffect(() => {
        /* Garante que só será realizada uma request para popular o storage */        
        if(listCountriesRedux.length === 0 ) {
            history.push('/');
        }

        if(country !== null){
            console.log("country", country);

            let countrySelected = listCountriesRedux.filter((countryList) => countryList.alpha3Code === country);
            console.log("countrySelected", countrySelected);

            if(countrySelected.length === 0){
                toast.success("Selecione um país da lista inicial para visualizar os detalhes...");
                history.push('/');
            }
            setSelectedCountry(countrySelected[0]);
        }
    }, [] );

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
                        <h5 className="">
                            <Link className="" to={`/`}>Home </Link>
                            
                            <strong> / Detalhes </strong>
                        </h5>
                        <h1 className="home__title-search">Detalhes do país: {selectedCountry.nativeName} </h1>
                    </div>
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.cover}
                            image={selectedCountry.flag.svgFile}
                            title={selectedCountry.name}
                        />

                        <div className={classes.details}>
                            <CardContent className={classes.content}>

                                <Typography component="h5" variant="h5">
                                    {selectedCountry.nativeName}
                                </Typography>

                                <Typography variant="subtitle1" color="textSecondary">
                                   <strong>Nome: </strong> {selectedCountry.name} 
                                </Typography>

                                <Typography variant="subtitle1" color="textSecondary">
                                   <strong>Área: </strong> {formatNumberPtBr(selectedCountry.area)} 
                                </Typography>

                                <Typography variant="subtitle1" color="textSecondary">
                                   <strong>População: </strong> {formatNumberPtBr(selectedCountry.population)} 
                                </Typography>
                                
                                <Typography variant="subtitle1" color="textSecondary">
                                   <strong>Capital: </strong> {selectedCountry.capital === null ||selectedCountry.capital === "" ? selectedCountry.name : selectedCountry.capital } 
                                </Typography>

                                <Typography variant="subtitle1" color="textSecondary">
                                   <strong>Top level Domain: </strong> 
                                   {selectedCountry.topLevelDomains.length > 0 ? selectedCountry.topLevelDomains.map((domain) => `${domain.name} `) : '' } 
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </Container>
                </>
            )}
        </>
    );
};

export default DetailPage;
