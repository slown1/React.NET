import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import RootComponent from './home.jsx';
import { init } from './delayed-loader';

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactDOMServer = ReactDOMServer;

global.Loadable = Loadable;
global.Helmet = Helmet;

global.RootComponent = RootComponent;
global.DelayedLoader = { init };
