import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import React from "react";
import useFetch from "../../../hooks/useFetch";

const UserActivityStatsWidget = () => {
    const [auditLogStats] = useFetch('/auditlog/stats')

    return (
        <article className='card ' style={{width: '410px'}}>
            <LineChart width={380} height={200} data={auditLogStats}>
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3}/>
                <CartesianGrid stroke="#000"/>
                <XAxis dataKey="log_date"/>
                <YAxis dataKey="total"/>
            </LineChart>
            <footer>User activity over time</footer>
        </article>
    )
}

export default UserActivityStatsWidget