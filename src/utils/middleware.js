
const express = require('express');
function setCookie(req, res,cname, cvalue) {
  const cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    const cookies = cvalue;
    res.cookie(cname,cookies, { maxAge: 900000, httpOnly: true });
  }
}

module.exports = {setCookie};