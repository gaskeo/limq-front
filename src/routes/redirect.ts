import {NavigateFunction} from "react-router/lib/hooks";
import {Location} from "history";
import {routes} from "./routes";

type NeedRedirect = true | false;

export function redirect(path: string, navigate: NavigateFunction, location: Location):NeedRedirect {
    if (!Object.values(routes).includes(path)) {
        return false
    }
    if (path !== location.pathname) {
        navigate(path)
        return true
    }
    return false
}
