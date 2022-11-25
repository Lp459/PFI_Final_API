//const User = require("../../../models/user");
//changer le url quand le server glitch est fait -----------------------------------------------------------------
const apiBaseURL = "http://localhost:5000/api/images";
const baseUrl = "http://localhost:5000";

//const verified = false;
//const loggedIn = false;
function HEAD(successCallBack, errorCallBack) {
  $.ajax({
    url: apiBaseURL,
    type: "HEAD",
    contentType: "text/plain",
    complete: (request) => {
      successCallBack(request.getResponseHeader("ETag"));
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function GET_ID(id, successCallBack, errorCallBack) {
  $.ajax({
    url: apiBaseURL + "/" + id,
    type: "GET",
    success: (data) => {
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function GET_USER(id, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + `/accounts/index/${id}`,
    type: "GET",
    success: (data) => {
      StoreConnectedUserInfo(data);
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function GET_ALL(successCallBack, errorCallBack, queryString = null) {
  let url = apiBaseURL + (queryString ? queryString : "");
  $.ajax({
    url: url,
    type: "GET",
    success: (data, status, xhr) => {
      successCallBack(data, xhr.getResponseHeader("ETag"));
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function POST(data, successCallBack, errorCallBack) {
  $.ajax({
    url: apiBaseURL,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: (data) => {
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function PUT(bookmark, successCallBack, errorCallBack) {
  $.ajax({
    url: apiBaseURL + "/" + bookmark.Id,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(bookmark),
    success: () => {
      successCallBack();
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function DELETE(id, successCallBack, errorCallBack) {
  $.ajax({
    url: apiBaseURL + "/" + id,
    type: "DELETE",
    success: () => {
      successCallBack();
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function LOGIN(data, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + "/token",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: (data) => {
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function LOGOUT(data, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + `/logout?userId=${data.id}`,
    type: "GET",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: (data) => {
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function REGISTER(data, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + "/accounts/register",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: (data) => {
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
//verify?id=...&code=.....
function VERIFY(data, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + "/accounts/verify?id=" + data.Id + "&code=" + data.code,
    type: "GET",
    data: JSON.stringify(data),
    success: (data) => {
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}

function StoreConnectedUserInfo(user) {
  window.localStorage.setItem("userConnected", JSON.stringify(user));
}
