import React from 'react';
import { render } from 'react-dom';

import "./style/index.css";

import AppRouter from './components/AppRouter.js';

const mainElement = document.querySelector('#main')
render( <AppRouter />, mainElement )