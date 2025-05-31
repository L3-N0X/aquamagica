import { RootProviders } from "@/providers";
import { Layout } from "@/components/layout";
import { AppRoutes } from "@/components/app-routes.tsx";
import { ScrollToTopInstant } from "./components/scroll-to-top";

function App() {
  ScrollToTopInstant();

  return (
    <RootProviders>
      <Layout>
        <AppRoutes />
      </Layout>
    </RootProviders>
  );
}

export default App;
