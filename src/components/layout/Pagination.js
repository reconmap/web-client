import {IconLeft, IconRight} from '../ui/Icons'
import BtnSecondary from './../ui/buttons/BtnSecondary'
import isInputElement from "../../utilities/domUtils";
import {useCallback, useEffect} from 'react';

const Pagination = ({page, total, handleNext, handlePrev}) => {
    const previousEnabled = page + 1 > 1;
    const nextEnabled = page + 1 < total;

    const onKeyDownListener = useCallback((ev) => {
        if (isInputElement(document.activeElement)) {
            return;
        }
        ev.preventDefault();
        if (previousEnabled && ev.key === 'p') {
            handlePrev();
        } else if (nextEnabled && ev.key === 'n') {
            handleNext();
        }
    }, [previousEnabled, nextEnabled, handlePrev, handleNext]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    return <div className='flex space-x-2 items-center'>
        <BtnSecondary disabled={!previousEnabled} onClick={handlePrev}><IconLeft/></BtnSecondary>
        <label>{page + 1} <span className='opacity-25'>|</span> {total} </label>
        <BtnSecondary disabled={!nextEnabled} onClick={handleNext}><IconRight/></BtnSecondary>
    </div>
}

export default Pagination
