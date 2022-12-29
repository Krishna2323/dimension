import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import Layout from "../components/layout/Layout";
import TaskFormModal from "../ui/TaskFormModal/TaskFormModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
      <TaskFormModal/>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
