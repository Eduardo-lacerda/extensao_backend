const authController = require("../controllers/authController");
const validation = require("../utils/auth");

module.exports = function(app) {
    app.post('/auth/register', validation.registerValidation, authController.register);
    app.get("/auth/verify/:token", authController.verify);
    app.post("/auth/login", validation.loginValidation, authController.login);
    app.post("/auth/verify/resend", authController.resendVerification);
    app.get("/auth", validation.auth, authController.getAuthenticatedUser);
};