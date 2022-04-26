import { Input } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import isInputElement from "../../utilities/domUtils";
import SecondaryButton from '../ui/buttons/Secondary';
import { IconLeft, IconRight } from '../ui/Icons';
import './Pagination.scss';

const PaginationV2 = ({ page, total, onPageChange }) => {

    const previousEnabled = page + 1 > 1;
    const nextEnabled = page + 1 < total;

    const onPreviousPageChange = useCallback(() => {
        onPageChange(page - 1);
    }, [onPageChange, page])

    const onNextPageChange = useCallback(() => {
        onPageChange(page + 1);
    }, [onPageChange, page])

    const onKeyDownListener = useCallback(ev => {
        if (isInputElement(document.activeElement)) {
            return;
        }

        if (previousEnabled && ev.key === 'p') {
            ev.preventDefault();
            onPreviousPageChange();
        } else if (nextEnabled && ev.key === 'n') {
            ev.preventDefault();
            onNextPageChange();
        }
    }, [previousEnabled, nextEnabled, onPreviousPageChange, onNextPageChange]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    if (parseInt(total) === 1) {
        return <label>(no more pages)</label>
    }

    return <div className='pagination'>
        <SecondaryButton tooltip='Previous [P]' disabled={!previousEnabled} onClick={onPreviousPageChange}><IconLeft styling={{ width: 12 }} /></SecondaryButton>
        <label>Page <Input value={page + 1} maxLength={4} size="xs" w={10} textAlign="center" max={total} onInput={ev => onPageChange(isNaN(parseInt(ev.target.value)) ? 1 : parseInt(ev.target.value) - 1)} /> of {total}</label>
        <SecondaryButton tooltip='Next [N]' disabled={!nextEnabled} onClick={onNextPageChange}><IconRight styling={{ width: 12 }} /></SecondaryButton>
    </div>
}

export default PaginationV2;
