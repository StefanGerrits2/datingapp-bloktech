// Render profile if logged in
function profile (req, res) {
  if(!req.session.user) {
    res.status(401).send('U moet ingelogd zijn om deze pagina te kunnen zien.');
  }
  else {
    res.render('profile.pug');
  }
}

module.exports = profile;