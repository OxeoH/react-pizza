import React from 'react'

import styles from './NotFoundBlock.module.scss';

type ErrorMessage = {
    errorMessage: string;
}
const NotFoundBlock: React.FC<ErrorMessage> = ({errorMessage}) => {
    return (
        <h1 className={styles.root}>
            <span>😔🛸</span>
            <br />
            {errorMessage}
        </h1>
    )
}

export default NotFoundBlock;