import { Response, NextFunction } from "express-serve-static-core";

export function returnJSONResponse (data, res: Response) {
  return res.json(data)
}

export function handleError(error, next: NextFunction) {
  return next(error)
}