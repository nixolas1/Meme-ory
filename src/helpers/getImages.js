const getImages = async (count) => {
  const response = await fetch("https://meme-api.herokuapp.com/gimme/" + count)
  const json = await response.json()
  const images = json.memes.map(item => item.url)
  return images
}

export default getImages