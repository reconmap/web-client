import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Tasks from './Tasks'
import React from "react";

function Dashboard() {
  const LINKS = [
    { title: 'Dashboard', icon: 'home', to: 'dashboard' },
    { title: 'Vulnerabilities', icon: 'home', to: 'vulnerabilities' },
    { title: 'User and permissions', icon: 'home', to: 'user' },
    { title: 'Reports', icon: 'home', to: 'reports' },
    { title: 'Integrations', icon: 'home', to: 'integrations' },
    { title: 'Tasks', icon: 'home', to: 'tasks' },
    { title: 'Templates', icon: 'home', to: 'templates' },
    { title: 'Reports', icon: 'home', to: 'reports' },
    { title: 'Audit log', icon: 'home', to: 'audit' },
    { title: 'Projects', icon: 'home', to: 'projects' },
  ]
  return (
    <Router>
      <header className=" fixed z-20  w-full  bg-gray-800  ">
        <div className='container mx-auto flex items-center justify-between h-20 py-2'>
          <h3 className="masthead-brand text-xl font-bold">Reconmap</h3>
          <input placeholder='Search...' className="py-2 px-3 rounded flex-1 mx-10" />
          <nav className="font-semibold gap-5 flex ">
            <a>Preferences</a>
            <a>Sign out</a>
          </nav>
        </div>
      </header>
      <div className="bg-white min-h-screen flex flex-row  text-gray-800 pt-24">
        <aside className='w-32  flex flex-col gap-1 bg-gray-100 border-r'>
          {LINKS.map(link => <Link to={link.to} className='p-1 w-full text-sm font-medium hover:text-black hover:bg-white' >{link.title}</Link>)}
        </aside>
        <main role="main" className="flex flex-1  items-center flex-col justify-center " >
          <Switch>
            <Route path="/" exact component={<>Dashboard</>} />
            <Route path="/tasks" exact component={<Tasks />} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default Dashboard;
