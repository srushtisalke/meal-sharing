import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsList from "./components/MealsList";
import MealDetails from "./components/MealDetails";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <h1 className="title">Meal Sharing App</h1>
        <Switch>
          <Route path="/meals/:id">
            <MealDetails />
          </Route>
          <Route path="/meals">
            <MealsList />
          </Route>
          <Route path="/" exact>
          <Route path="/meals/:id" component={MealDetails} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
