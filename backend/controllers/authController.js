import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res.redirect("/");
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.redirect("/");
      }
      res.redirect("http://localhost:5173/");
    });
  })(req, res, next);
};

export const handleCallback = (req, res) => {
  res.redirect("http://localhost:5173/");
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    req.session = null;
    res.json({ message: "Logged out successfully" });
  });
};

