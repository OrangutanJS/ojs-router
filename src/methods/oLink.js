import o from 'ojs-core/npm/o.development.es';
import { oRouter } from './oRouter';

export function oLink(route) {
  if (!(this instanceof oLink))
    return new oLink(route);


  this.element = o('a')
    .click((e) => {
      e.preventDefault();
      e.stopPropagation();
      if (route) {
        oRouter.redirect(route);
      }
    });
}

oLink.prototype.add = function (...children) {
  this.element.add(...children);
  return this;
}

oLink.prototype.setAttribute = function (name, val) {
  this.element.setAttribute(name, val);
  return this;
}

oLink.prototype.setAttributes = function (attributes) {
  this.element.attr(attributes);
  return this;
}

oLink.prototype.attr = o.prototype.setAttributes;

oLink.prototype.class = function (classNames) {
  this.element.class(classNames);
  return this;
};

oLink.prototype.classList = function (classList) {
  return this.class(classList);
};

oLink.prototype.className = function (className) {
  return this.class(className);
}

oLink.prototype.id = function (id) {
  this.element.id(id);
  return this;
};

oLink.prototype.get = function (attribute) {
  return this.element.get(attribute);
}

oLink.prototype.getText = function () {
  return this.element.getText();
}

oLink.prototype.getId = function () {
  return this.element.getId();
}

oLink.prototype.parent = function () {
  return this.element.parent();
}

oLink.prototype.text = function (text) {
  this.element.text(text);

  return this;
};

oLink.prototype.to = function (route) {
  this.element.click(() => {
    oRouter.redirect(route);
  });

  return this;
}

oLink.prototype.init = function () {
  return this.element.init();
}

oLink.prototype.ref = function (oRefInstance) {
  this.element.ref(oRefInstance);
  return this;
}

oLink.prototype.style = function (styles) {
  this.element.style(styles);
  return this;
};