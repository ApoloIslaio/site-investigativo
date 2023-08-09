/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client"


const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
};

const link = createUploadLink({
  uri:"http://localhost:3000/graphql",
})

//api url production: 
 
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  
})
