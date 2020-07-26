/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

export interface IRepositoriesController {
  createRepository: (req: Request, res: Response) => Promise<Response<any>>;
  listRepositories: (req: Request, res: Response) => Promise<Response<any>>;
  updateRepository: (req: Request, res: Response) => Promise<Response<any>>;
}

export interface IRepository {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export interface ITech {
  id: string;
  repository_id: string;
  tech: string;
  created_at: string;
}
