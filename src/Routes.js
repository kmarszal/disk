import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login"
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Upload from "./containers/Upload";
import Files from "./containers/Files";
export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps}/>
    <AppliedRoute path="/files/upload" exact component={Upload} props={childProps}/> 
    <AppliedRoute path="/files/:id" exact component={Files} props={childProps}/>     
    <Route component={NotFound} />
  </Switch>;