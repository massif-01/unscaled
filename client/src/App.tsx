import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const AdminRoute = lazy(() => import("./pages/AdminRoute"));
const AiPage = lazy(() => import("./pages/AiPage"));
const DailyStockAnalysisArticle = lazy(() => import("./pages/DailyStockAnalysisArticle"));
const AuraCapArticle = lazy(() => import("./pages/AuraCapArticle"));
const ChatRawArticle = lazy(() => import("./pages/ChatRawArticle"));
const InfoPage = lazy(() => import("./pages/InfoPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/admin"} component={AdminRoute} />
        <Route path={"/ai/daily-stock-analysis"} component={DailyStockAnalysisArticle} />
        <Route path={"/ai/auracap"} component={AuraCapArticle} />
        <Route path={"/ai/chatraw"} component={ChatRawArticle} />
        <Route path={"/ai"} component={AiPage} />
        <Route path={"/info"} component={InfoPage} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
