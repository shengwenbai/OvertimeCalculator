/* eslint-disable require-jsdoc */
import 'bootstrap';
// import * as moment from 'moment';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.css';
import './styles/index.css';
import './styles/loader.css';
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
// 显示本月加班记录
function showMonthRecords(res) {
  $('.loader').hide();
  console.log(res);
  let html = '<ul class="list-group">';
  if (res.result) {
    if (res.data.length > 0) {
      const listHtml = res.data.map((x) => '<li class="list-group-item">' +
        moment(x.overtimeDate).format('YYYY-MM-DD') +
        '<span class="hrSpan">' +
        parseFloat(x.overtimeHrs).toFixed(2) +
        '小时</span></li>').join('');
      html += listHtml;
      html += '</ul>';
      $('.modal-body').html(html);
    }
    $('#monthRecordsModal').modal('show');
  } else {

  }
}

// 打卡下班
$('#checkout').unbind('click').click(function() {
  ajaxGet('http://localhost:50120/api/Overtime/Checkout', null, callback);
});
// 查看本月加班记录
$('#viewRecords').unbind('click').click(function() {
  $('.loader').show();
  ajaxGet('http://localhost:50120/api/Overtime/GetOvertimeThisMonth', null, showMonthRecords);
});
