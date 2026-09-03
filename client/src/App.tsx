import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Platform from "./pages/Platform";

function Router() {
  return <Switch>
    <Route path="/" component={() => <Platform page="home" />} />
    <Route path="/receitas" component={() => <Platform page="catalog" />} />
    <Route path="/receitas/:id">{params => <Platform page="recipe" recipeId={params.id} />}</Route>
    <Route path="/tenho-em-casa" component={() => <Platform page="have" />} />
    <Route path="/compras" component={() => <Platform page="shopping" />} />
    <Route path="/plano" component={() => <Platform page="plan" />} />
    <Route path="/perfil" component={() => <Platform page="profile" />} />
    <Route path="/admin" component={() => <Platform page="admin" />} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster/><Router/></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
