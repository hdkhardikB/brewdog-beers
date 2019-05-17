import { punkApi } from 'Config'
import axios from 'axios'

export const getBeerList = () => {
    return axios.get(`${punkApi}/beers?page=1`)
        .then(response => response.data)
}

export const getBeerDetail = (beerId: number) => {
    return axios.get(`${punkApi}/beers/${beerId}`)
        .then(response => response.data[0])
}