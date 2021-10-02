import oRouter from '../src/oRouter';
import Playground from './Playground';
import o from 'ojs-core';

oRouter.defaultView = defaultView;
oRouter.routingTable = {
    ['/']: defaultView,
    ['/view1']: view1,
    ['/view2']: view2,
}

oRouter.route();

function defaultView() {
    const playgroundView = new Playground();
    document.body.innerHTML = '';
    document.body.appendChild(
        playgroundView.init()
    );
}

function view1() {
    document.body.innerHTML = '';
    document.body.appendChild(
        o('p').text('View1').init()
    );
}

function view2() {
    document.body.innerHTML = '';
    document.body.appendChild(
        o('p').text('View2').init()
    );
}