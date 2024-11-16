import "./DashboardWidget.css";

const DashboardWidget = ({ title, children }) => {
    return (
        <div className="dashboard-widget cell">
            <h5>{title}</h5>
            {children}
        </div>
    );
};

export default DashboardWidget;
