"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const compression = require("compression");
const express_1 = require("express");
const helmet_1 = require("helmet");
const express_mongo_sanitize_1 = require("express-mongo-sanitize");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: 'http://localhost:4200',
        credentials: true,
    });
    app.use((0, express_mongo_sanitize_1.default)());
    app.use((0, express_1.json)({ limit: '1mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '1mb' }));
    app.use(compression());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const userModel = app.get('UserModel');
    const seedUsers = [
        {
            username: 'TestUser_1',
            email: 'test.user.account1@example.com',
            rawPassword: 'TestUser-1',
            balance: 1000,
        },
        {
            username: 'TestUser_2',
            email: 'test.user.account2@example.com',
            rawPassword: 'TestUser-2',
            balance: 500,
        },
    ];
    for (const user of seedUsers) {
        const existingUser = await userModel.findOne({ email: user.email }).lean();
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(user.rawPassword, 10);
            await userModel.create({
                username: user.username,
                email: user.email,
                password: hashedPassword,
                balance: user.balance,
            });
        }
    }
    console.log('Seed data inserted successfully');
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map