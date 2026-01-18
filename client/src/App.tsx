import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import PostDetail from "@/pages/PostDetail";
import Category from "@/pages/Category";
import About from "@/pages/About";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/studio-x7k9m" component={AdminPanel} />
      <Route path="/post/:slug" component={PostDetail} />
      <Route path="/scout" component={Category} />
      <Route path="/taktik" component={Category} />
      <Route path="/mac-analizi" component={Category} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
