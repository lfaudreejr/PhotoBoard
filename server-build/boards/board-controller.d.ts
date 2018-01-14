/// <reference types="express" />
import { Response, Request, NextFunction } from 'express';
export declare function createBoard(req: Request, res: Response, next: NextFunction): void;
export declare function getBoard(req: Request, res: Response, next: NextFunction): void;
export declare function updateBoard(req: Request, res: Response, next: NextFunction): void;
export declare function deleteBoard(req: Request, res: Response, next: NextFunction): void;
