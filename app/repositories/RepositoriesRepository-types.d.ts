export interface IRepository {
  title: string;
  url: string;
}

export interface IRepositoryCreated {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export interface ILikeCreated {
  id: string;
  repository_id: string;
  created_at: string;
}

export interface ITechCreated {
  id: string;
  repository_id: string;
  tech: string;
  created_at: string;
}
