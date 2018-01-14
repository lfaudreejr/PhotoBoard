/// <reference types="express" />
import { Response, Request, NextFunction } from 'express';
export declare function createPin(req: Request, res: Response, next: NextFunction): void;
export declare function getAllPins(req: Request, res: Response, next: NextFunction): void;
export declare function getPin(req: Request, res: Response, next: NextFunction): void;
export declare function deleteAPin(req: Request, res: Response, next: NextFunction): void;
export declare function updatePin(req: Request, res: Response, next: NextFunction): void;
