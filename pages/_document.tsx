import { resetServerContext } from "@krishna2323/react-beautiful-dnd";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

type Props = {};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="task-form-modal" />
          <div id="login-form-modal" />
          <div id="backdrop" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
