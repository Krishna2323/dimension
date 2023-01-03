import { GithubImportedRepo } from "../../model/GithubAPI";

export type UserSliceType = {
  user: any;
  githubRepos: any[];
  githubReposIsLoading: boolean;
  githubImportedRepos: GithubImportedRepo[];
};
