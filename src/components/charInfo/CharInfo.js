import { useEffect, useState } from 'react'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import PropTypes from 'prop-types'

import './charInfo.scss'

function CharInfo({ charId }) {
  const [char, setChar] = useState(null)

  const { loading, error, clearError, getCharacter } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [charId])

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const updateChar = () => {
    if (!charId) return

    clearError()
    getCharacter(charId)
      .then(onCharLoaded)
  }

  const spinner = loading ? <Spinner/> : null
  const errorMessage = error ? <ErrorMessage/> : null
  const content = !(loading || error || !char) ? <View char={char}/> : null
  const skeleton = loading || error || char ? null : <Skeleton/>

  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = char
  const isImageUpload = thumbnail.includes('image_not_available') ?
    {objectFit: 'contain'} : {objectFit: 'cover'}

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={isImageUpload}/>
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>
        {description}
      </div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((comics, index) => index < 10 ? (
          <li key={index} className='char__comics-item'>
            {comics.name}
          </li>
        ) : null)}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo
