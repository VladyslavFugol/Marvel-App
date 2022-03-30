import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'

import './comicsList.scss'

function ComicsList() {
  const [comicsList, setComicsList] = useState([])
  const [newItemLoaded, setNewItemLoaded] = useState(false)
  const [offset, setOffset] = useState(0)
  const [isListEnded, setIsListEnded] = useState(false)

  const { loading, getAllComics } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoaded(false) : setNewItemLoaded(true)
    getAllComics(offset)
      .then(onComicsLoaded)
  }

  const onComicsLoaded = (newComicsList) => {
    let ended = false

    if (newComicsList.length < 8) {
      ended = true
    }

    setComicsList(comicsList => [...comicsList, ...newComicsList])
    setOffset(offset => offset + 8)
    setIsListEnded(ended)
  }

  const renderComics = (arr) => {
    return arr.map(({title, id, price, thumbnail}, index) => (
      <li className='comics__item' key={index}>
        <Link to={`/comics/${id}`}>
          <img src={thumbnail} alt='ultimate war' className='comics__item-img'/>
          <div className='comics__item-name'>{title}</div>
          <div className='comics__item-price'>{price}</div>
        </Link>
      </li>
    ))
  }

  const content = renderComics(comicsList)
  const spinner = loading && !newItemLoaded ? <Spinner/> : null

  return (
    <div className='comics__list'>
      {spinner}
      <ul className='comics__grid'>
        {content}
      </ul>
      <button
        className='button button__main button__long'
        onClick={() => onRequest(offset)}
        style={{display: isListEnded ? 'none' : 'block'}}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}

export default ComicsList
