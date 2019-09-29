import 'bootstrap';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function sum(a, b) {
  return a + b;
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
console.log('project running');
var title = $("h1").first().text();
console.log(title);

//module.exports = index;