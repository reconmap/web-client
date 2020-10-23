import { IconLeft, IconRight } from '../icons'
import BtnSecondary from './../ui/buttons/BtnSecondary'
const Pagination = ({ page, total, handleNext, handlePrev }) => {
    return <div className='flex space-x-2 items-center'>
        <BtnSecondary  disabled={page+1 <= 1} onClick={handlePrev}><IconLeft size={4}/></BtnSecondary>
        <label>{page + 1} <span className='opacity-25'>|</span> {total} </label>
        <BtnSecondary  disabled={page+1 >= total} onClick={handleNext}><IconRight size={4}/></BtnSecondary>
    </div>
}

export default Pagination