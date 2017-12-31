import { FindAndModifyWriteOpResultObject } from 'mongodb';
export declare function getAllBoardsByOwner(owner: string | string[]): Promise<{}>;
export declare function getABoardByTitleAndOwner(title: string, owner: string | string[]): Promise<any>;
export declare function saveBoard(board: object): Promise<{}>;
export declare function addPinToBoard(pinId: string, id: string): Promise<FindAndModifyWriteOpResultObject>;
export declare function getBoardPins(pinId: string): Promise<any>;
export declare function editBoard(board: any, update: any): Promise<FindAndModifyWriteOpResultObject<any>>;
export declare function deleteABoard(boardId: any): Promise<FindAndModifyWriteOpResultObject<any>>;
