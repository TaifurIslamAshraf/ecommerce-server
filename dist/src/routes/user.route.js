"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authGard_1 = require("../middlewares/authGard");
const uploadFile_1 = require("../middlewares/uploadFile");
const validator_1 = require("../middlewares/validator");
const user_schema_1 = require("../validators/user.schema");
const userRoute = express_1.default.Router();
userRoute.post("/register", (0, validator_1.validator)(user_schema_1.userSchemaValidator), user_controller_1.registerUser);
userRoute.post("/activate", (0, validator_1.validator)(user_schema_1.activateUserSchema), user_controller_1.activateUser);
userRoute.post("/login", (0, validator_1.validator)(user_schema_1.loginUserSchema), user_controller_1.loginUser);
userRoute.get("/logout", authGard_1.isAuthenticated, user_controller_1.logout);
userRoute.get("/refresh", user_controller_1.updateAccessToken);
userRoute.get("/me", authGard_1.isAuthenticated, user_controller_1.getUserInfo);
userRoute.get("/social-auth", user_controller_1.socialAuth);
userRoute.put("/update-info", authGard_1.isAuthenticated, user_controller_1.updateUserInfo);
userRoute.put("/update-avatar", authGard_1.isAuthenticated, (0, uploadFile_1.fileUploder)("public/uploads/users", true, "avatar"), user_controller_1.updateUserAvatar);
userRoute.put("/update-password", authGard_1.isAuthenticated, (0, validator_1.validator)(user_schema_1.updatePasswordSchema), user_controller_1.updatePassword);
userRoute.post("/forgot-password", user_controller_1.forgotPassword);
userRoute.get("/forgot-password-link-validation/:userId/:token", user_controller_1.forgotPasswordLinkValidation);
userRoute.put("/reset-password", (0, validator_1.validator)(user_schema_1.resetPasswordSchema), user_controller_1.resetPassword);
userRoute.get("/all-users", authGard_1.isAuthenticated, (0, authGard_1.authorizeUser)("admin"), user_controller_1.getAllUsers);
userRoute.put("/update-role", (0, validator_1.validator)(user_schema_1.updateUserRoleSchema), authGard_1.isAuthenticated, (0, authGard_1.authorizeUser)("admin"), user_controller_1.updateUserRole);
userRoute.delete("/delete-user/:userId", authGard_1.isAuthenticated, (0, authGard_1.authorizeUser)("admin"), user_controller_1.deleteUser);
exports.default = userRoute;
//# sourceMappingURL=user.route.js.map