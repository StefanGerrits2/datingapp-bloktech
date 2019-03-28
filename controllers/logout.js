// Log out, used source: https://www.youtube.com/watch?v=aT98NMdAXyk
function logout(req, res) {
  req.session.destroy(function(err){
    if (err) {
      res.negotiate(err);
    }
    else {
      res.redirect('/');
    }
  });
}
// Source used ends here

module.exports = logout;