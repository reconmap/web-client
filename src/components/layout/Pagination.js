import React from 'react'

const Pagination = ({page, total, handleNext, handlePrev}) => {
    return <div className='flex gap-4 items-center'>
        <button disabled={page <=1} onClick={handlePrev}>◀</button>
        <label>{page} / {total} </label>
        <button disabled={page >= total} onClick={handleNext}>▶</button>
    </div>
}

export default Pagination