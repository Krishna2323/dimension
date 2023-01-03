export type UiSliceType = {
  taskForm: {
    display: boolean;
    defaultTaskType: "Todo" | "In-Progress" | "Completed" | string;
  };
  loginForm: { display: boolean };
  userRepos: { display: boolean };
  mode: boolean;
};
