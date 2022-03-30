import { useEffect, useRef, useState } from 'react'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService'

import PropTypes from 'prop-types'

import './charList.scss'

function CharList({ onCharSelected }) {

  const [charList, setCharList] = useState([])
  const [isNewItemLoaded, setIsNewItemLoaded] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)

  const { error, loading, getAllCharacters } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setIsNewItemLoaded(false) : setIsNewItemLoaded(true)
    getAllCharacters(offset)
      .then(onCharsLoaded)
  }

  const onCharsLoaded = (newCharList) => {
    let ended = false

    if (newCharList.length < 9) {
      ended = true
    }

    setCharList(charList => [...charList, ...newCharList])
    setIsNewItemLoaded(isNewItemLoaded => false)
    setOffset(offset => offset + 9)
    setCharEnded(ended)
  }

  const itemsRefs = useRef([])

  const focusOnItem = (index) => {
    itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'))
    itemsRefs.current[index].classList.add('char__item_selected')
    itemsRefs.current[index].focus()
  }

  const renderItems = (arr) => {
    return arr.map(({thumbnail, name, id}, index) => (
      <li
        className='char__item'
        key={id}
        onClick={() => {
          onCharSelected(id)
          focusOnItem(index)
        }} ref={element => itemsRefs.current[index] = element}>
        <img src={thumbnail}
             style={thumbnail.includes('image_not_available') ?
               {objectFit: 'contain'} : {objectFit: 'cover'}}
             alt='abyss'/>
        <div className='char__name'>{name}</div>
      </li>
    ))
  }

  const spinner = loading && !isNewItemLoaded ? <Spinner/> : null
  const errorMessage = error ? <ErrorMessage/> : null
  const content = renderItems(charList)
  return (
    <div className='char__list'>
      {spinner}
      {errorMessage}
      <ul className='char__grid'>
        {content}
      </ul>
      <button
        className='button button__main button__long'
        disabled={isNewItemLoaded}
        onClick={() => onRequest(offset)}
        style={{display: charEnded ? 'none' : 'block'}}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList
