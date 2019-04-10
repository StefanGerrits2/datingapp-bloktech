// Render profile if logged in
function profile (req, res) {
  if(!req.session.user) {
    res.render('loginNeeded.pug');
  }
  else {
    res.render('profile.pug');
  }
}

module.exports = profile;