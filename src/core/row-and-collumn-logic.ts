const handleSetRows = (setRows: (value: number) => void) => (value: number) => {
  if ([3, 5, 7, 9].includes(value)) {
    setRows(value)
  }
}

const handleSetColumns =
  (setColumns: (value: number) => void) => (value: number) => {
    if ([3, 5, 7, 9].includes(value)) {
      setColumns(value)
    }
  }

export { handleSetRows, handleSetColumns }
