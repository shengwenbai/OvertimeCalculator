/* eslint-disable require-jsdoc */
import 'bootstrap';
// import moment from 'moment';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.css';
import './styles/index.css';
// import '@fortawesome/fontawesome-free/css/all.css';

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

// 打卡
$('#checkout').unbind('click').click(function() {
  $.ajax({
    type: 'get',
    url: 'http://localhost:50120/api/Overtime/Checkout',
    contentType: 'Application/json;charset=utf-8',
    data: null,
    timeout: 15000,
    dataType: 'json',
    success: function(data) {
      console.log(data);
    },
    error: function(ex) {
      Console.log(ex);
      if (ex.statusText == 'timeout') {
        console.log('请求已超时');
      }
    },
  });
});
