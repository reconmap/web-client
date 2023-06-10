import { AuthContext } from 'contexts/AuthContext';
import ReactDOM from 'react-dom/client';
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import UsersList from "./List";

vi.mock('react-i18next', () => ({
    useTranslation: () => [
        (key) => key.toUpperCase()
    ]
}))

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    container.remove();
    container = null;
});

it("renders with or without a name", () => {
    act(() => {
        ReactDOM.createRoot(container)
            .render(<MemoryRouter>
                <AuthContext.Provider value={{ user: null }}>
                    <UsersList />
                </AuthContext.Provider>
            </MemoryRouter>
            );
    });
    expect(container.innerHTML).toMatch(/Create user<\/button>/);
});
