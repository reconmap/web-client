import ReactDOM from 'react-dom/client';
import { act } from "react-dom/test-utils";
import ExternalLink from "./ExternalLink";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    container.remove();
    container = null;
});

it("renders a dash when there are no children", () => {
    act(() => {
        ReactDOM.createRoot(container).render(<ExternalLink></ExternalLink>);
    });

    expect(container.innerHTML).toEqual("-");
});

it("renders a link that opens in a new target", () => {
    act(() => {
        ReactDOM.createRoot(container).render(<ExternalLink href="#bar">Foo</ExternalLink>);
    });

    expect(container.innerHTML).toEqual(expect.stringContaining('target="_blank" rel="noopener noreferrer"'));
});
