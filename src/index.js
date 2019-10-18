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
const title = $('h1')
    .first()
    .text();
console.log(title);
console.log(moment().format('YYYY-MM-DD'));
console.log(moment().format('e'));
$('#datetimepicker4').datetimepicker({
  format: 'L',
});

$(function() {
  getMonthHrs();
});

// 打卡下班
$('#checkout')
    .unbind('click')
    .click(function() {
      $('.loader').show();
      ajaxGet('http://localhost:35948/api/Overtime/Checkout', null, apiCallback);
    });

// 按时长打卡
$('#checkoutByHr')
    .unbind('click')
    .click(function() {
      const hrs = parseFloat($('#hrsToday').val());
      const params = {};
      params.hrs = hrs;
      params.date = new Date().toLocaleDateString();
      if (!isNaN(hrs)) {
        $('.loader').show();
        ajaxGet(
            'http://localhost:35948/api/Overtime/SetOvertime',
            params,
            apiCallback
        );
      } else {
        $('.customAlert #customAlertText').text('请输入正确的加班时长！');
        $('.customAlert').show();
        setTimeout(() => {
          $('.customAlert').slideUp(1000);
        }, 1000);
      }
    });

// 补记加班
$('#addOvertime')
    .unbind('click')
    .click(function() {
      const hrs = parseFloat($('#hrs2add').val());
      const dateStr = $('.datetimepicker-input').val();
      const dateObj = new Date(dateStr);
      if (isNaN(hrs) || dateObj.toString() === 'Invalid Date') {
        $('.customAlert #customAlertText').text('请输入正确的日期及加班时长！');
        $('.customAlert').show();
        setTimeout(() => {
          $('.customAlert').slideUp(1000);
        }, 1000);
      } else {
        const params = {};
        params.hrs = hrs;
        params.date = dateStr;
        $('.loader').show();
        ajaxGet(
            'http://localhost:35948/api/Overtime/SetOvertime',
            params,
            apiCallback
        );
      }
    });

// 查看本月加班记录
$('#viewRecords')
    .unbind('click')
    .click(function() {
      $('.loader').show();
      ajaxGet(
          'http://localhost:35948/api/Overtime/GetOvertimeThisMonth',
          null,
          showMonthRecords
      );
    });

// 获取本月加班时长
function getMonthHrs() {
  ajaxGet('http://localhost:35948/api/Overtime/GetMonthHrs', null, showMonthHrs);
}

// 显示当月加班时长
function showMonthHrs(res) {
  console.log(res);
  if (res.result) {
    $('#totalHrs').html(res.data);
  } else {
    $('.redAlert').show();
    setTimeout(() => {
      $('.redAlert').slideUp(1000);
    }, 1000);
  }
}

// 显示本月加班记录
function showMonthRecords(res) {
  $('.loader').hide();
  console.log(res);
  let html = '<ul class="list-group">';
  let listHtml;
  if (res.result) {
    if (res.data.length > 0) {
      listHtml = res.data
          .map(
              (x) =>
                '<li class="list-group-item">' +
            moment(x.overtimeDate).format('YYYY-MM-DD') +
            '<span class="hrSpan">' +
            parseFloat(x.overtimeHrs).toFixed(2) +
            '小时</span></li>'
          )
          .join('');
    } else {
      listHtml = '<li class="list-group-item">本月尚无加班记录</li>';
    }
    html += listHtml;
    html += '</ul>';
    $('.modal-body').html(html);
    $('#monthRecordsModal').modal('show');
  } else {
    $('.redAlert').show();
    setTimeout(() => {
      $('.redAlert').slideUp(1000);
    }, 1000);
  }
}

// 显示Alert，0：danger；1：success; 2:warning
function showAlerts(alertCode) {
  $('.loader').hide();
  if (alertCode == 0) {
    $('.redAlert').show();
    setTimeout(() => {
      $('.redAlert').slideUp(1000);
    }, 1000);
  }
  if (alertCode == 1) {
    $('.greenAlert').show();
    setTimeout(() => {
      $('.greenAlert').slideUp(1000);
    }, 1000);
  }
  if (alertCode == 2) {
    $('.yellowAlert').show();
    setTimeout(() => {
      $('.yellowAlert').slideUp(1000);
    }, 1000);
  }
}

function apiCallback(res) {
  console.log(res);
  if (res.result) {
    if (res.data) {
      showAlerts(1);
      getMonthHrs();
    } else {
      showAlerts(2);
    }
  } else {
    showAlerts(0);
  }
}
