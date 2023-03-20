import client from "@/apollo-client";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import "../app/styles/app.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
