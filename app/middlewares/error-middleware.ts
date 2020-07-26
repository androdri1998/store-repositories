import { Request, Response, NextFunction } from "express";
interface Error {
  message: string;
  name: string;
  status?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const status = err.status || 500;

  if (status >= 500) {
    return res
      .status(status)
      .json({ error: "InternalError", error_description: "Internal Error" });
  }
  return res
    .status(status)
    .json({ error: Error.name, error_description: err.message });
};

export default errorMiddleware;
