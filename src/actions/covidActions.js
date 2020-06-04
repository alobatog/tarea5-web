const axios = require('axios');

export const FETCHING = 'FETCHING';
export const FETCHED_NATION = 'FETCH_NATION';
export const FETCHED_COUNTRIES = 'FETCHED_COUNTRIES';
export const FETCHED_WORLD = 'FETCHED_WORLD';
export const SET_GRAPHIC = 'SET_GRAPHIC';
export const FAIL = 'FAIL';

export const fetchNation = (name) => dispatch => {
    dispatch({type: FETCHING});
    axios(`https://api.covid19api.com/country/${name}?from=2020-03-01T00:00:00Z&to=2020-06-01T00:00:00Z`).then(response => {
        dispatch({type: FETCHED_NATION, payload: response.data});
    }).catch(error => {
        dispatch({type: FAIL, error: error});
    })
}

export const fetchCountries = () => dispatch => {
    dispatch({type: FETCHING});
    axios('https://api.covid19api.com/countries').then(response => {
        dispatch({type: FETCHED_COUNTRIES, payload: response.data});
    }).catch(error => {
        dispatch({type: FAIL, error: error});
    })
}

export const fetchWorld = () => dispatch => {
    dispatch({type: FETCHING});
    axios('https://api.covid19api.com/world/total').then(response => {
        const {TotalConfirmed, TotalDeaths, TotalRecovered} = response.data;
        const data = {...response.data, TotalActive: (TotalConfirmed - TotalDeaths - TotalRecovered)}
        dispatch({type: FETCHED_WORLD, payload: data});
    }).catch(error => {
        dispatch({type: FAIL, error: error});
    })
}

export const setGraphic = (data) => ({
    type: SET_GRAPHIC,
    payload: data
});