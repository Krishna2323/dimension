import { createSlice, Slice } from "@reduxjs/toolkit";
import { GithubImportedRepo } from "../../model/GithubAPI";
import { UserSliceType } from "./UserSliceType";

let initialState: UserSliceType = {
  user: null,
  githubRepos: [],
  githubImportedRepos: [],
  githubReposIsLoading: false,
};

export const User: Slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setUserRepos(state, action) {
      state.githubRepos = action.payload.githubRepos || state.githubRepos;
      state.githubReposIsLoading = action.payload.githubReposIsLoading;
    },
    setGithubImportedRepos(state, action) {
      state.githubImportedRepos = action.payload.githubImportedRepos;
    },
  },
});

export const userSliceActions = User.actions;
export default User;
