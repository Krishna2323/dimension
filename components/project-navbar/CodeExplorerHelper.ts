import { GithubTreeFile } from "../../model/GithubAPI";

export const sorfByFolderFirst = (arr: GithubTreeFile[]): GithubTreeFile[] => {
  let treeSorted: GithubTreeFile[] = [];
  arr.forEach((e: GithubTreeFile) => {
    if (e.type === "tree") {
      treeSorted.push(e);
    }
  });
  arr.forEach((e: GithubTreeFile) => {
    if (e.type === "blob") {
      treeSorted.push(e);
    }
  });
  return treeSorted;
};
