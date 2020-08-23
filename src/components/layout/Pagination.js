import React from 'react'
import { IconLeft , IconRight} from '../icons'

const Pagination = ({page, total, handleNext, handlePrev}) => {
    return <div className='flex gap-4 items-center'>
        <button disabled={page <=1} onClick={handlePrev}><IconLeft /></button>
        <label className='text-lg'>{page} <span className='opacity-25'>|</span> {total} </label>
        <button disabled={page >= total} onClick={handleNext}><IconRight /></button>
    </div>
}

export default Pagination