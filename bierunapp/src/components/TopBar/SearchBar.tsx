import React from 'react'
import styles from './SearchBar.module.scss'
type Props = {}

function SearchBar({}: Props) {
  return (
    <div className={styles.searchBar}>
      <img src="svg/search_FILL1_wght400_GRAD0_opsz24.svg" />
      <input type="text" placeholder="Wyszukaj" />

    </div>
  )
}

export default SearchBar