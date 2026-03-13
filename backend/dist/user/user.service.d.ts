import { SignUpDto } from 'src/dtos/signup.dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(signUpDto: SignUpDto): Promise<User>;
}
