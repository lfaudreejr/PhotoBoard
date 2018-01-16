import { InsertOneWriteOpResult, FindAndModifyWriteOpResultObject } from 'mongodb';
export declare function savePin(pin: object): Promise<InsertOneWriteOpResult>;
export declare function getPins(): Promise<{}>;
export declare function getAPin(id: string): Promise<any>;
export declare function deletePinFromPins(id: string): Promise<FindAndModifyWriteOpResultObject>;
export declare function deletePinFromUserBoard(userId: string | string[], pinId: string): Promise<FindAndModifyWriteOpResultObject<any>>;
export declare function updateAPinDescription(id: string, updateObj: object): Promise<FindAndModifyWriteOpResultObject<any>>;
