import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
});

export const handleCallback = (req, res) => {
  res.redirect("http://localhost:5173/dashboard");
};

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
