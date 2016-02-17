// main.js
var React = require('react');
var ReactDOM = require('react-dom');

console.warn('ui.react.js');

document.addEventListener('DOMContentLoaded', function () {
    console.warn('rendering react');
    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('main')
    );
});
