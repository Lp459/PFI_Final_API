//const User = require("../../../models/user");
//changer le url quand le server glitch est fait -----------------------------------------------------------------
const apiBaseURL = "http://localhost:5000/api/images";
const baseUrl = "http://localhost:5000";


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
      SetConnectedUserInfo(data);
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
function LOGIN(user, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + "/token",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: (data) => {
      if (user.Remember) {
        StoreConnectedUserSession(user);
      }
      StoreAcessToken(data);
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function LOGOUT(data, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + `/accounts/logout/${data}`,
    type: "GET",
    success: (data) => {
      EraseToken();
      LogOutUser();
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function REGISTER(user, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + "/accounts/register",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: (user) => {
      successCallBack(user);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function MODIFY(user, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + "/accounts/modify",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(user),
    headers: {
      authorization: "Bearer " + GetAccessToken(),
    },
    success: () => {
      successCallBack();
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
// GET:account/remove/id
function REMOVE(UserId, successCallBack, errorCallBack) {
  $.ajax({
    url: baseUrl + `/accounts/remove/${UserId}`,
    type: "GET",
    data: JSON.stringify(UserId),
    headers: {
      authorization: "Bearer " + GetAccessToken(),
    },
    success: (data) => {
      successCallBack(data);
    },
    error: function (jqXHR) {
      errorCallBack(jqXHR.status);
    },
  });
}
function StoreAcessToken(token) {
  sessionStorage.setItem("token", JSON.stringify(token));
}
function GetAccessToken() {
  return JSON.parse(sessionStorage.getItem("token")).Access_token;
}
function StoreConnectedUserSession(user) {
  sessionStorage.setItem("connectedUser", JSON.stringify(user));
}
function RetrieveConnectedUserSession() {
  return JSON.parse(sessionStorage.getItem("connectedUser"));
}
function EraseToken() {
  sessionStorage.removeItem("token");
}
function RetrieveConnectedUser() {
  return JSON.parse(localStorage.getItem("connectedUser"));
}
function LogOutUser() {
  localStorage.removeItem("connectedUser");
}

function SetConnectedUserInfo(user) {
  window.localStorage.setItem("connectedUser", JSON.stringify(user));
}
function SetDatalistLocalStorage(data) {
  localStorage.setItem("searchHistoryDataList", JSON.stringify(data));
}

function RetrieveDatalistLocalStorage() {
  return JSON.parse(localStorage.getItem("searchHistoryDataList"));
}
