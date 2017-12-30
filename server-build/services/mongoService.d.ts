import * as mongodb from 'mongodb';
declare const _default: {
    create: (obj: object, collectionName: string) => Promise<mongodb.InsertOneWriteOpResult>;
    readAll: (obj: any, collectionName: any, params?: {}) => Promise<{}>;
    update: (obj: any, collectionName: any, config: any) => Promise<mongodb.FindAndModifyWriteOpResultObject<any>>;
    destroy: (obj: any, collectionName: any) => Promise<mongodb.FindAndModifyWriteOpResultObject<any>>;
    readOne: (obj: any, collectionName: any, options?: {}) => Promise<any>;
};
export default _default;
