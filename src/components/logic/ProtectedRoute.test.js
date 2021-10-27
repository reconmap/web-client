import EmptyDiv from "components/ui/EmptyDiv";
import { createMemoryHistory } from 'history';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Route, Router, Switch } from 'react-router';
import { AuthContext } from "../../contexts/AuthContext";
import ProtectedRoute from './ProtectedRoute';

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders component when is authorised", () => {
    const history = createMemoryHistory()

    act(() => {
        render(<Router history={history}>
            <AuthContext.Provider value={{ isAuth: true }}>
                <ProtectedRoute exact path="/" component={EmptyDiv} />
                <Route component={EmptyDiv} />
            </AuthContext.Provider>
        </Router>, container)
    })

    expect(container.innerHTML).toMatch('&nbsp;')
    expect(history.location.pathname).toEqual('/')
});


it("does not render component when is not authorised", () => {
    const history = createMemoryHistory()

    act(() => {
        render(<Router history={history} >
            <AuthContext.Provider value={{ isAuth: false }}>
                <Switch>
                    <ProtectedRoute exact path="/" component={EmptyDiv} />
                    <Route component={EmptyDiv} />
                </Switch>
            </AuthContext.Provider>
        </Router>, container)
    })

    expect(history.location.pathname).toEqual('/login')
});
