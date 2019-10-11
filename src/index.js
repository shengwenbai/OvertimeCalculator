/* eslint-disable require-jsdoc */
import 'bootstrap';
// import * as moment from 'moment';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.css';
import './styles/index.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import ajaxGet from './utility.js';
global.moment = require('moment');
// import 'tempusdominus-bootstrap-4';
require('tempusdominus-bootstrap-4');

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
$('#datetimepicker4').datetimepicker({
  format: 'L',
});

// AjaxGet回调方法
function callback(data) {
  console.log(data);
}

// 打卡下班
$('#checkout').unbind('click').click(function() {
  ajaxGet('http://localhost:50120/api/Overtime/Checkout', null, callback);
});
