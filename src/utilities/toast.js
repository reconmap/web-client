import React  from 'react'
import ReactDOM from 'react-dom';

export default function useToast(msg) {

    let timeout = setTimeout(()=>{
        let toastEl = document.getElementById('toast')
        ReactDOM.unmountComponentAtNode(toastEl)
    },5000)

    const toast = React.createElement('div',{
            width: '100px',
            height: '100px',
            className: 'card fadeInUp',
            style: {
                position:'absolute',
                bottom: '10px',
                right: '10px'
            }
        },msg)

    ReactDOM.render(toast,document.getElementById('toast'))
}
