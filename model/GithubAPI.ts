export type GithubTreeFile = {
  path: string;
  mode: string;
  sha: string;
  size: number;
  type: string;
  url: string;
  children?: GithubTreeFile[];
};

export type GithubImportedRepo = {
  name: string;
  tree: GithubTreeFile[];
};
