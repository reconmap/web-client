import "./DashboardWidget.css";

const DashboardWidget = ({ title, children }) => {
    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">{title}</p>
            </header>
            <div class="card-content">{children}</div>
        </div>
    );
};

export default DashboardWidget;
