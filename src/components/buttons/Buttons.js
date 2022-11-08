import styles from './Buttons.module.css'

const Buttons = ({handle}) => {

    const helper = (value) => {
        handleSearch(value)
    }

    const handleSearch = (query) => {
        handle(query)
    }
  return (
    <div className={styles.types}>
        <button onClick={() => helper("A")}>A+</button>
        <button onClick={() => helper('A-')}>A-</button>
        <button onClick={() => helper('B')}>B+</button>
        <button onClick={() => helper('B-')}>B-</button>
        <button onClick={() => helper('AB')}>AB+</button>
        <button onClick={() => helper('AB-')}>AB-</button>
        <button onClick={() => helper('O')}>O+</button>
        <button onClick={() => helper('O-')}>O-</button>
    </div>
  )
}

export default Buttons