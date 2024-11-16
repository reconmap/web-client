import { AuthContext } from "contexts/AuthContext";
import { act } from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import UsersList from "./List";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.remove(container);
    container = null;
});

it("renders with or without a name", async () => {
    vi.mock("react-i18next", () => ({
        useTranslation: () => [(key) => key.toUpperCase()],
    }));

    await act(async () => {
        ReactDOM.createRoot(container).render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: null }}>
                    <UsersList />
                </AuthContext.Provider>
            </MemoryRouter>,
        );
    });
    expect(container.innerHTML).toMatch(/Create user<\/button>/);
});
