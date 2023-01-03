import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import Layout from "../components/layout/Layout";
import TaskFormModal from "../ui/TaskFormModal/TaskFormModal";
import LoginForm from "../components/modals/LoginForm/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRepos from "../components/modals/Github/UserRepos";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <TaskFormModal />
        <LoginForm />
        <ToastContainer />
        <UserRepos />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
