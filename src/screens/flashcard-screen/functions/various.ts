const getPaoNumber = (index, currentRenderItemsRange) => {
  return currentRenderItemsRange + index >= 0 && currentRenderItemsRange + index <= 9 ?
    `0${currentRenderItemsRange + index}` : currentRenderItemsRange + index
}

export { getPaoNumber }