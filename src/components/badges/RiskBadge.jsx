import { IconExclamation, IconInformation, IconShieldExclamation } from "../ui/Icons";

const RiskBadge = ({ risk, fontSize = "fontSizeXsmall" }) => {
    const RISKS = {
        none: { color: "green", icon: <IconInformation size="4" /> },
        low: { color: "green", icon: <IconInformation size="4" /> },
        medium: { color: "yellow", icon: <IconExclamation size="4" /> },
        high: { color: "red", icon: <IconShieldExclamation size="4" /> },
        critical: { color: "red", icon: <IconShieldExclamation size="4" /> },
    };
    const styles = {
        badge: {
            color: `var(--${RISKS[risk].color},white)`,
            padding: `var(--paddingBadge)`,
            alignItems: "center",
            display: `inline-flex`,
            border: `var(--borderWidth,2px) solid var(--${RISKS[risk].color}Dark)`,
            fontSize: `var(--${fontSize})`,
            fontWeight: "var(--fontBold)",
        },
    };

    return (
        <span style={styles.badge}>
            {RISKS[risk].icon}
            {risk}
        </span>
    );
};

export default RiskBadge;
