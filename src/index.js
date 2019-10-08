/* eslint-disable require-jsdoc */
import 'bootstrap';
import moment from 'moment';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import 'tempusdominus-bootstrap-4';

export default function sum(a, b) {
  return a + b;
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
console.log('project running');
const title = $('h1').first().text();
console.log(title);
console.log(moment().format('YYYY-MM-DD'));
console.log(moment().format('e'));
