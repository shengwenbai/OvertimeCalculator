// eslint-disable-next-line require-jsdoc
function AjaxGet(requestUrl, param, callback) {
  $.ajax({
    type: 'get',
    url: requestUrl,
    data: param,
    contentType: 'Application/json;charset=utf-8',
    dataType: 'json',
    timeout: 15000,
    success: function (data) {
      if (callback) {
        callback(data);
      }
    },
    error: function (ex) {
      console.log(ex);
      if (ex.statusText == 'timeout') {
        $('.loading').hide();
        console.log('网络超时，请刷新页面重试！');
      }
    },
  });
}