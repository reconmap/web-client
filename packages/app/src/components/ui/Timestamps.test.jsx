import ReactDOM from 'react-dom/client';
import { act } from "react";
import Timestamps from "./Timestamps";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    container.remove();
    container = null;
});

it("renders time element for creation time", () => {
    act(() => {
        ReactDOM.createRoot(container).render(<Timestamps insertTs="2020-10-15 13:13:13" />);
    });

    expect(container.innerHTML).toEqual(expect.stringContaining('<time datetime="2020-10-15 13:13:13">2020-10-15 13:13:13</time>'));
    expect(container.innerHTML).not.toEqual(expect.stringContaining('<strong>Modified at</strong>'));
});

it("renders time element for creation and modification times", () => {
    act(() => {
        ReactDOM.createRoot(container).render(<Timestamps insertTs="2020-10-15 13:13:13" updateTs="2021-12-15 13:13:13" />);
    });

    expect(container.innerHTML).toEqual(expect.stringContaining('<time datetime="2020-10-15 13:13:13">2020-10-15 13:13:13</time>'));
    expect(container.innerHTML).toEqual(expect.stringContaining('<strong>Modified at</strong>'));
    expect(container.innerHTML).toEqual(expect.stringContaining('<time datetime="2021-12-15 13:13:13">2021-12-15 13:13:13</time>'));
});
