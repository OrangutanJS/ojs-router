import o from 'ojs-core';
import './main.css';
import oRouter from '../src/oRouter';

class Playground {

    build() {
        return o('div').add([
            o('h2').text('Routing').init(),
            o('ul').add([
                o('li').add([
                    o('a').class('link-href').text('route to View 1').click(() => redirectToView1()).init(),
                ]).init(),
                o('li').add([
                    o('a').class('link-href').text('route to View 2s').click(() => redirectToView2()).init(),
                ]).init(),
            ]).init()
        ]).init();
    }

    init() {
        return this.build();
    }
}
export default Playground;

function redirectToView1() {
    oRouter.redirect('/view1');
}

function redirectToView2() {
    oRouter.redirect('/view2');
}