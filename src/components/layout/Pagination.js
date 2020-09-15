import React from 'react'
import { IconLeft, IconRight } from '../icons'
import BtnSecondary from './../ui/buttons/BtnSecondary'
const Pagination = ({ page, total, handleNext, handlePrev }) => {
    return <div className='flex gap-4 items-center'>
        <BtnSecondary size='sm' disabled={page+1 <= 1} onClick={handlePrev}><IconLeft size={4}/></BtnSecondary>
        <label className='text-lg'>{page + 1} <span className='opacity-25'>|</span> {total} </label>
        <BtnSecondary size='sm' disabled={page+1 >= total} onClick={handleNext}><IconRight size={4}/></BtnSecondary>
    </div>
}

export default Pagination