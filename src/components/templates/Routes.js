import React from "react";
import ProtectedRoute from "../logic/ProtectedRoute";
import TemplatesList from "./List";
import TemplateDetails from "./Details";

const TemplatesRoutes = [
    <ProtectedRoute exact path={`/templates`} component={TemplatesList}/>,
    <ProtectedRoute exact path={`/templates/:id([0-9]+)`} component={TemplateDetails}/>
]

export default TemplatesRoutes