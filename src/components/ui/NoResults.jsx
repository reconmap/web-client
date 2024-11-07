import { IconExclamationCircle } from "./Icons";

export default function NoResults() {
    return (
        <figure className="" style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
            <IconExclamationCircle />
            No results
        </figure>
    );
}
