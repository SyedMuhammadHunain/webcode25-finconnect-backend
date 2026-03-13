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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_2 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("../common/enums/roles.enum");
const subscriptionType_enum_1 = require("../common/enums/subscriptionType.enum");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(signUpDto) {
        const { username, email, password, image } = signUpDto;
        try {
            const existingUser = await this.userModel.findOne({ email }).lean().exec();
            if (existingUser) {
                throw new common_2.ConflictException('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new this.userModel({
                username,
                email,
                password: hashedPassword,
                role: roles_enum_1.Role.DEVELOPER,
                isVerified: false,
                image: image ||
                    'https://res.cloudinary.com/dtepgit65/image/upload/v1744490854/Ridee/Default/profileimage.png',
                isSubscribed: false,
                subscriptionType: subscriptionType_enum_1.SubscriptionType.BASIC,
                subscriptionExpiry: null,
            });
            return await user.save();
        }
        catch (error) {
            console.error('Error during user creation:', error);
            throw new common_2.InternalServerErrorException('Failed to create user');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map