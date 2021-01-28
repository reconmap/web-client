import {IconExclamationCircle} from './Icons'
import './NoResults.css';

export default function NoResults() {
    return (
        <figure className="NoResults message__container">
            <IconExclamationCircle/>
            No results
        </figure>
    )
}
