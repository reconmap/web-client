import './Help.scss'
import { IconQuestionCircle } from './Icons'

export default function Help({ title, children, text }) {

    return <div className='help'>
        <h4 className='help__title'><IconQuestionCircle className="help__icon" />{title || 'Help'}</h4>
        {text && <p className='help__desc'>{text}</p>}
        {children}
    </div>
}
