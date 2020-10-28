import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Timestamps from "./Timestamps";

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

it("renders time element for creation time", () => {
    act(() => {
        render(<Timestamps insertTs="2020-10-15 13:13:13"/>, container);
    });

    expect(container.innerHTML).toEqual(expect.stringContaining('<time datetime="2020-10-15 13:13:13">2020-10-15 13:13:13</time>'));
    expect(container.innerHTML).not.toEqual(expect.stringContaining('<strong>Modification time:</strong>'));
});

it("renders time element for creation and modification times", () => {
    act(() => {
        render(<Timestamps insertTs="2020-10-15 13:13:13" updateTs="2021-12-15 13:13:13"/>, container);
    });

    expect(container.innerHTML).toEqual(expect.stringContaining('<time datetime="2020-10-15 13:13:13">2020-10-15 13:13:13</time>'));
    expect(container.innerHTML).toEqual(expect.stringContaining('<strong>Modification time:</strong>'));
    expect(container.innerHTML).toEqual(expect.stringContaining('<time datetime="2021-12-15 13:13:13">2021-12-15 13:13:13</time>'));
});