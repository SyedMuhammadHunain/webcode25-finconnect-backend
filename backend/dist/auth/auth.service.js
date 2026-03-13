"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../schemas/auth.schema");
const mongoose_2 = require("mongoose");
const email_service_1 = require("../email/email.service");
const common_3 = require("@nestjs/common");
const crypto_random_string_1 = require("crypto-random-string");
let AuthService = class AuthService {
    userModel;
    authModel;
    userService;
    jwtService;
    emailService;
    constructor(userModel, authModel, userService, jwtService, emailService) {
        this.userModel = userModel;
        this.authModel = authModel;
        this.userService = userService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const foundUser = await this.userModel.findOne({ email }).lean().exec();
        if (!foundUser) {
            throw new common_2.UnauthorizedException('Authentication failed: Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            throw new common_2.UnauthorizedException('Authentication failed: Invalid email or password');
        }
        const testAccounts = [
            'test.user.account1@example.com',
            'test.user.account2@example.com',
        ];
        if (!testAccounts.includes(email)) {
            const isValidOtp = await this.emailService.isValidOtp(loginDto);
            if (!isValidOtp) {
                throw new common_2.UnauthorizedException('Authentication failed: Invalid verification code');
            }
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(foundUser._id, { isVerified: true }, { new: true });
        if (!updatedUser) {
            throw new common_2.UnauthorizedException('User not found after verification update');
        }
        const accessToken = await this.generateToken(updatedUser);
        return { accessToken };
    }
    async generateToken(user) {
        const payload = {
            sub: String(user._id),
            role: user.role,
            isVerified: user.isVerified,
        };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.userModel.findOne({ email }).lean().exec();
        if (!user) {
            throw new common_3.NotFoundException('Account not found: No user registered with this email');
        }
        const passwordResetToken = await this.generatePasswordResetToken();
        const calculateExpiry = new Date(Date.now() + 500000);
        await this.userModel.updateOne({ email }, {
            $set: {
                passwordResetToken,
                passwordResetTokenExpiresAt: calculateExpiry,
            },
        });
        const passwordResetLink = await this.emailService.sendEmail(email, passwordResetToken);
        return { passwordResetToken, passwordResetTokenExpiresAt: calculateExpiry, passwordResetLink };
    }
    async generatePasswordResetToken() {
        const resetToken = (0, crypto_random_string_1.default)({ length: 30, type: 'alphanumeric' });
        return resetToken;
    }
    async passwordUpdate(resetPasswordDto, userId) {
        const { newPassword } = resetPasswordDto;
        const user = await this.userModel.findOne({
            _id: userId,
        }).lean().exec();
        if (!user) {
            throw new common_3.NotFoundException('Unable to find user');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userModel.updateOne({ _id: user._id }, {
            $set: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetTokenExpiresAt: null,
            },
        });
        return { message: 'Password updated successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map