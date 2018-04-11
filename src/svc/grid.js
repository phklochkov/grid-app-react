export const getGridItem = () =>
  fetch('/mock/grid.json').then(x => x.json(x))
