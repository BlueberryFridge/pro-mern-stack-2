"use strict";

var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var helloContinents = Array.from(continents, function (c) {
  return "Hello, ".concat(c, "!");
});
var message = helloContinents.join(' ');
var element = /*#__PURE__*/React.createElement("div", {
  title: "loaded from separate file"
}, /*#__PURE__*/React.createElement("h1", null, helloContinents.map(function (item) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, item, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null));
})));
ReactDOM.render(element, document.getElementById("root"));