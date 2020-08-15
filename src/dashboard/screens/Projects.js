import React from 'react'
import { Link } from 'react-router-dom'
import Project from './Project'

const Projects = ({projects}) => {
    return (
        <ul>
            <li><Link to="/project">Project a</Link></li>
            <li>Project b</li>
            <li>Project c</li>
        </ul>
    )
}

export default Projects