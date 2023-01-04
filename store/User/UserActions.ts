import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import { supabase } from "../../supabase/supabase";
import { Octokit } from "octokit";
import { userSliceActions } from "./UserSlice";
import { list_to_tree } from "./Helpers";
import { GithubImportedRepo } from "../../model/GithubAPI";

export const loginUserWithGithub = () => async () => {
  toast.loading("Please wait...");
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: "repo gist notifications",
      // redirectTo: "https://dimension-psi.vercel.app/",
      redirectTo: "http://localhost:3000",
    },
  });
};

export const getUserRepoTree =
  (repo: any, user: any, importedRepos: GithubImportedRepo[]) =>
  async (dispatch: AppDispatch) => {
    let userName = user.user.user_metadata.preferred_username;
    const octokit = new Octokit({});
    let lastCommit = await octokit.request(
      `GET /repos/${userName}/${repo.name}/commits/${repo.default_branch}`,
      {}
    );
    let { data } = await octokit.request(
      `GET /repos/${userName}/${repo.name}/git/trees/${lastCommit.data.sha}?recursive=1`,
      {}
    );
    let reposInfo = {
      name: `${userName}/${repo.name}`,
      tree: list_to_tree(data.tree),
    };
    let updatedRepos = Array.from(importedRepos);
    updatedRepos.push(reposInfo);
    dispatch(
      userSliceActions.setGithubImportedRepos({
        githubImportedRepos: updatedRepos,
      })
    );
  };

export const getUserSession = () => async (dispatch: AppDispatch) => {
  const alert = toast.info("Retriving Session...");
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    setTimeout(() => {
      toast.update(alert, {
        type: "warning",
        isLoading: false,
        render: "Session Not Found",
        delay: 0,
      });
    }, 1000);
  }

  if (data.session !== null) {
    dispatch(userSliceActions.setUser({ user: data.session }));
    setTimeout(() => {
      toast.update(alert, {
        type: "success",
        isLoading: false,
        render: "Logged In!",
      });
    }, 1000);
  }
};

export const getUserRepos = (user: any) => async (dispatch: AppDispatch) => {
  let userName = user.user.user_metadata.preferred_username;
  const octokit = new Octokit({ auth: user.provider_token });
  dispatch(userSliceActions.setUserRepos({ githubReposIsLoading: true }));
  let res = await octokit.request(`GET /users/${userName}/repos`, {});
  console.log(res);
  dispatch(
    userSliceActions.setUserRepos({
      githubReposIsLoading: false,
      githubRepos: res.data,
    })
  );
};

// GET ONE REPO => /repos/krishna2323/portfolio
// GET ALL REPO => /users/krishna2323/repos
// GET ALL REPO FILES => /repos/krishna2323/Specs99v2/git/trees/a166b67?recursive=1
