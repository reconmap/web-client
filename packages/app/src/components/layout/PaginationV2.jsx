import NativeInput from "components/form/NativeInput";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import isInputElement from "../../utilities/domUtils";

const PaginationV2 = ({ page, total, onPageChange }) => {
    const previousEnabled = page + 1 > 1;
    const nextEnabled = page + 1 < total;

    const onPreviousPageChange = useCallback(() => {
        onPageChange(page - 1);
    }, [onPageChange, page]);

    const onNextPageChange = useCallback(() => {
        onPageChange(page + 1);
    }, [onPageChange, page]);

    const onKeyDownListener = useCallback(
        (ev) => {
            if (isInputElement(document.activeElement)) {
                return;
            }

            if (previousEnabled && ev.key === "p") {
                ev.preventDefault();
                onPreviousPageChange();
            } else if (nextEnabled && ev.key === "n") {
                ev.preventDefault();
                onNextPageChange();
            }
        },
        [previousEnabled, nextEnabled, onPreviousPageChange, onNextPageChange],
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDownListener);
        return () => {
            document.removeEventListener("keydown", onKeyDownListener);
        };
    }, [onKeyDownListener]);

    if (parseInt(total) === 1) {
        return <label>(no more pages)</label>;
    }

    return (
        <nav className="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                <li>
                    {" "}
                    <Link
                        to={`/auditlog?page=${page}`}
                        className="pagination-link"
                        tooltip="Previous [P]"
                        disabled={!previousEnabled}
                    >
                        &lt;
                    </Link>
                </li>
                <li>
                    <label>
                        Page{" "}
                        <NativeInput
                            className="pagination-link"
                            value={page + 1}
                            maxLength={4}
                            w={10}
                            max={total}
                            onInput={(ev) =>
                                onPageChange(isNaN(parseInt(ev.target.value)) ? 1 : parseInt(ev.target.value) - 1)
                            }
                        />{" "}
                        of {total}
                    </label>
                </li>
                <li>
                    <Link
                        to={`/auditlog?page=${page + 2}`}
                        className="pagination-link"
                        tooltip="Next [N]"
                        disabled={!nextEnabled}
                    >
                        &gt;
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default PaginationV2;
