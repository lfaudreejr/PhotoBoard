/// <reference types="express" />
import { Response, Request, NextFunction } from 'express';
export declare function createComment(req: Request, res: Response, next: NextFunction): void;
export declare function getComment(req: Request, res: Response, next: NextFunction): void;
export declare function deleteComment(req: Request, res: Response, next: NextFunction): void;
