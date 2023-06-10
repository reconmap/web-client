
import './DashboardWidget.scss';

const DashboardWidget = ({ title, children }) => {
    return <div className="dashboard-widget">
        <h5>{title}</h5>
        {children}
    </div>
}

export default DashboardWidget;
