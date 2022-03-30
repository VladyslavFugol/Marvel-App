import useHttp from '../hooks/http.hook'

function useMarvelService() {
  const _api = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=c92dd8fa67e10ba4d2219790d46ab29f'
  const _baseOffset = 210

  const { loading, error, getData, clearError } = useHttp()

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await getData(`${_api}characters?limit=9&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformCharacter)
  }

  const getAllComics = async (offset = 0) => {
    const res = await getData(`${_api}comics?limit=8&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformComics)
  }

  const getCharacter = async (id) => {
    const res = await getData(`${_api}characters/${id}?${_apiKey}`)
    return _transformCharacter(res.data.results[0])
  }

  const getCharacterByName = async (name) => {
    const res = await getData(`${_api}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getComic = async (id) => {
    const res = await getData(`${_api}comics/${id}?${_apiKey}`)
    return _transformComics(res.data.results[0])
  }

  const _transformCharacter = (character) => {
    return {
      name: character.name,
      id: character.id,
      description: character.description ? `${character.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
    }
  }

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName
  }
}

export default useMarvelService
