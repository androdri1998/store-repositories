import { Request, Response } from "express";

export interface IIRepositoriesController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createRepository: (req: Request, res: Response) => Promise<Response<any>>;
}
