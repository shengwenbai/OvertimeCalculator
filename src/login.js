/* eslint-disable require-jsdoc */
import 'bootstrap';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import ajaxGet from './utility.js';
import './styles/login.css';
import './styles/loader.css';
$(function() {
  $('.loader').show();
  const token = sessionStorage.getItem('token');
  const params = {};
  params.token = token;
  ajaxGet(
      'http://localhost:35948/api/Identity/ValidateToken',
      params,
      initialCallBack
  );
});

$('#loginBtn').unbind('click').click(function() {
  const username = $('#username').val();
  const pwd = $('#inputPassword').val();
  const params = {};
  params.username = username;
  params.pwd = pwd;
  $('.loader').show();
  ajaxGet(
      'http://localhost:35948/api/Identity/Login',
      params,
      loginCallback
  );
});

function loginCallback(res) {
  if (res.result) {
    if (res.data) {
      sessionStorage.setItem('token', res.data);
      window.location.href = 'index.html';
    } else {
      $('.customAlert #customAlertText').text('用户名或密码错误！');
      $('.customAlert').show();
      setTimeout(() => {
        $('.customAlert').slideUp(1000);
      }, 1000);
    }
  } else {
    $('.customAlert #customAlertText').text('服务器崩了！请稍后再试');
    $('.customAlert').show();
    setTimeout(() => {
      $('.customAlert').slideUp(1000);
    }, 1000);
  }
  $('.loader').hide();
}

function initialCallBack(res) {
  if (res.result) {
    if (res.data) {
      window.location.href = 'index.html';
    }
  } else {
    $('.customAlert #customAlertText').text('服务器崩了！请稍后再试');
    $('.customAlert').show();
    setTimeout(() => {
      $('.customAlert').slideUp(1000);
    }, 1000);
  }
  $('.loader').hide();
}
