import o from 'ojs-core';
import './main.css';
// import oRouter, { oLink } from '../npm/oRouter.development';
import { oRouter } from '../src/methods/oRouter';
import { oLink } from '../src/methods/oLink';

class Playground {

    build() {
        return o('div').add([
            o('h2').text('Routing').init(),
            o('ul').add([
                o('li').add([
                    oLink().to('/view1').class('link-href').text('route to View 1')
                    // o('a').class('link-href').text('route to View 1').click(() => redirectToView1()).init(),
                ]).init(),
                o('li').add([
                    oLink('/view2').class('link-href').text('route to View 2')
                ]).init(),
            ]).init(),
            o('h2').text('Search parameters').init(),
            o('ul').add([
                o('li').add([
                    o('input').attr({ placeholder: 'key' }).id('searchKeyInput').init(),
                    o('input').attr({ placeholder: 'value' }).id('searchValueInput').init(),
                    o('a').class('link-href').text('  Add search param').click(() => addSearchParam()).init(),
                ]).init(),
                o('li').add([
                    o('input').attr({ placeholder: 'key to unset' }).id('unsetSearchKeyInput').init(),
                    o('a').class('link-href').text('  Unset search parameter').click(() => unsetSearchParam()).init(),
                ]).init(),
                o('li').add([
                    o('a').class('link-href').text('  Unset all search parameters').click(() => oRouter.unsetSearchParametersAll()).init(),
                ]).init(),
            ]).init(),
            o('h2').text('Hashes').init(),
            o('ul').add([
                o('li').add([
                    o('input').attr({ placeholder: 'hash' }).id('hashInput').init(),
                    o('a').class('link-href').text('  Add hash').click(() => addHash()).init(),
                ]).init(),
                o('li').add([
                    o('input').attr({ placeholder: 'hash to unset' }).id('unsetHashInput').init(),
                    o('a').class('link-href').text('  Unset hash').click(() => unsetHash()).init(),
                ]).init(),
                o('li').add([
                    o('a').class('link-href').text('  Unset all hashes').click(() => oRouter.unsetHashAll()).init(),
                ]).init(),
            ]).init(),
            o('a').classList('link-href bold').text('Log routing parameters in console').click(() => console.log(oRouter.routingParameters)).init(),
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

function addSearchParam() {
    const searchKey = document.getElementById('searchKeyInput').value;
    const searchValue = document.getElementById('searchValueInput').value;

    oRouter.setSearchParameter(searchKey, searchValue);
}

function unsetSearchParam() {
    const searchKey = document.getElementById('unsetSearchKeyInput').value;

    oRouter.unsetSearchParameter(searchKey);
}

function addHash() {
    const hash = document.getElementById('hashInput').value;
    oRouter.setHash(hash);
}

function unsetHash() {
    const hash = document.getElementById('unsetHashInput').value;

    oRouter.unsetHash(hash);
}