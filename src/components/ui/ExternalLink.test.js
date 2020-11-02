import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import ExternalLink from "./ExternalLink";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders a dash when there are no children", () => {
    act(() => {
        render(<ExternalLink></ExternalLink>, container);
    });

    expect(container.innerHTML).toEqual("-");
});

it("renders a link that opens in a new target", () => {
    act(() => {
        render(<ExternalLink href="#bar">Foo</ExternalLink>, container);
    });

    expect(container.innerHTML).toEqual(expect.stringContaining('target="_blank" rel="noopener noreferrer"'));
});