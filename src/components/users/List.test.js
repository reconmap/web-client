
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from 'history';

import UsersList from "./List";

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

it("renders with or without a name", () => {
  const history = createMemoryHistory();
  act(() => {
    render(<UsersList history={history} />, container);
  });
  expect(container.innerHTML).toMatch(/Create User<\/button>/);
});