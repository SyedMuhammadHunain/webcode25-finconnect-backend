import { Document } from 'mongoose';
export declare class Auth extends Document {
    email: string;
    code: string;
    createdAt: Date;
    expiresAt: Date;
}
export declare const AuthSchema: import("mongoose").Schema<Auth, import("mongoose").Model<Auth, any, any, any, (Document<unknown, any, Auth, any, import("mongoose").DefaultSchemaOptions> & Auth & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Auth, any, import("mongoose").DefaultSchemaOptions> & Auth & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, Auth>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Auth, Document<unknown, {}, Auth, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Auth & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    email?: import("mongoose").SchemaDefinitionProperty<string, Auth, Document<unknown, {}, Auth, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Auth & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Auth, Document<unknown, {}, Auth, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Auth & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Auth, Document<unknown, {}, Auth, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Auth & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, Auth, Document<unknown, {}, Auth, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Auth & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, Auth, Document<unknown, {}, Auth, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Auth & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Auth>;
