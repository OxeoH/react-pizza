import React from 'react';

import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import {setSearchValue} from '../../redux/slices/filterSlice';
import {useDispatch} from "react-redux";

const Search: React.FC = () => {
    const [localeValue, setLocaleValue] = React.useState('');
    const dispatch = useDispatch();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const searchCallBack = React.useCallback(
        debounce((searchString: string) => {
            dispatch(setSearchValue(searchString));
        }, 700), []);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocaleValue(event.target.value);
        searchCallBack(event.target.value);
    }

    function onCrossClick(){
        setLocaleValue('');
        dispatch(setSearchValue(''));
        inputRef.current?.focus();
    }


    return (
        <div className={styles.root}>
            <input ref={inputRef} value={localeValue} onChange={event => onInputChange(event)} className={styles.input} type="text" placeholder='Поищи, что по вкусу 🍕'/>
            {localeValue && <div onClick={() => onCrossClick()} className={styles.clear}>
                <span className={styles.lines}></span>
                <span className={styles.lines}></span>
            </div>}
        </div>
    )
}

export default Search;