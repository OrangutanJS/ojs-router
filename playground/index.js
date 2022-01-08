import { oRouter } from '../src/methods/oRouter';
import Playground from './Playground';
import o from 'ojs-core';
import './main.css';

oRouter.defaultView = defaultView;
oRouter.originPrefix = '/oRouter-playground';
oRouter.routingTable = {
    ['/']: defaultView,
    ['/view1']: view1,
    ['/view2']: view2,
}

oRouter.route();

function defaultView() {
    const playgroundView = new Playground();
    return playgroundView;
}

function view1() {
    document.body.innerHTML = '';
    document.body.appendChild(
        o('div').add([
            o('a').class('link-href').text('go back').click(oRouter.back).init(),
            o('p').text('You are on View1 page').init()
        ]).init()
    );
}

function view2() {
    document.body.innerHTML = '';
    document.body.appendChild(
        o('div').add([
            o('a').class('link-href').text('go back').click(oRouter.back).init(),
            o('p').text('You are on View2 page').init()
        ]).init()
    );
}