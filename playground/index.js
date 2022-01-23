import { oRouter } from '../src/methods/oRouter';
import Playground from './Playground';
import o, { oRender } from 'ojs-core';
import './main.css';
import { oLink } from '../src/methods/oLink';


oRouter.originPrefix = '/examplePrefix';
oRouter.defaultView = defaultView;
oRouter.routingTable = {
  ['/']: defaultView,
  ['/view1']: view1,
  ['/view2/:id']: view2,
  ['/view3/:exampleParameter']: view3,
  ['404-notFound']: view2,
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
      oLink('/', true).class('link-href').text('go back oLink'),
      // o('a').class('link-href').text('go back').click(oRouter.back).init(),
      o('p').text('You are on View2 page').init()
    ]).init()
  );
}

function view3(parameters) {
  console.log(parameters);
  oRender(
    document.body,
    o('div').add([
      o('a').class('link-href').text('go back').click(oRouter.back),
      o('h1').text('You are on View3 page')
    ]),
    true
  );
}