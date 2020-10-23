import React from 'react';
import ReactDOM from 'react-dom';

export default function toast(title, msg) {

    // create DOM element
    const toast = React.createElement('div', {
        className: 'card toast fadeInUp',
        style: {
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            maxWidth: '300px',
        }
    }, <>
        {title && <strong className='text-red-500'>{title}</strong>}
        <div>{msg}</div>
    </>)

    // render toast into DOM
    setTimeout(() => {
        ReactDOM.render(toast, document.getElementById('toast'))
    }, 500)

    // remove toast from DOM 
    setTimeout(() => {
        const toastEl = document.getElementById('toast');
        ReactDOM.unmountComponentAtNode(toastEl)
    }, 5000)
}

export function actionCompletedToast(msg) {
    toast('Action completed', msg);
}
