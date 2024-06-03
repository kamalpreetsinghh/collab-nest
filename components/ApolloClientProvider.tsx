"use client";

import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

type ApolloClientProviderProps = {
  children: ReactNode;
};

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
