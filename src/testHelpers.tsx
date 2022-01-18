import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

export const Wrapper: FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
