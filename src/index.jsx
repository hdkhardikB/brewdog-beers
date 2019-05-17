import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './router'
import './scss/style.scss'

const page = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

const app = document.getElementById('app');
ReactDOM.render(page, app)
