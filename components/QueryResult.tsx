import { ApolloError } from "@apollo/client";
import Loader from "./Loader";

type QueryResultProps = {
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
  children: React.ReactNode;
};

const QueryResult = ({
  loading,
  error,
  data,
  children,
}: QueryResultProps): React.ReactElement<any, any> | null => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return <Loader />;
  }
  if (data) {
    return <>{children}</>;
  }
  return <p>Nothing to show...</p>;
};

export default QueryResult;
