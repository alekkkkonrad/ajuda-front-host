import React from 'react'
import styles from './FormSearch.module.css'

import { BsSearch } from 'react-icons/bs'
import { useState } from 'react'

const FormSearch = ({handle}) => {

    const [query, setQuery] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        handle(query)
    }

  return (
    <div className={styles.container}>
        <form action="" id="form" className={styles.searchForm} onSubmit={handleSearch}>
            <BsSearch/>
            <input type="text" id="query"placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value)}/>
        </form>
    </div>
  )
}

export default FormSearch