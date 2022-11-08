import styles from './Message.module.css'

import React from 'react'

const Message = ({msg, type}) => {
  return (
    <>
      {type === 'error' && 
        <div className={`${styles.message} ${styles.error}`}>
          <p className={styles}>{msg}</p>
        </div>
      }
      {type === 'success' && 
        <div className={`${styles.message} ${styles.success}`}>
          <p className={styles}>{msg}</p>
        </div>
      }
    </>
  )
}

export default Message