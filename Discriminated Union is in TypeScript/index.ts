type State = {
  status: 'loading';
} | {
  status: 'success'
  data: string
} | {
  status: 'error'
  error: string
}


const renderUi = (state: State) => {
  if (state.status === 'loading') {
    return 'Loading...'
  }

  if (state.status === 'error') {
    return `Error: ${state.error.toLocaleLowerCase}`
  }

  if (state.status === 'success') {
    return `Data: ${state.data}`
  }

}

// Using Alias

type LoadingState = {
  status: 'loading';
} 
type DataState =  {
  status: 'success'
  data: string
} 
type ErrorState = {
  status: 'error'
  error: string
}

type StateAlias = LoadingState | DataState | ErrorState

const renderUiWithAlias = (state: State) => {
  if (state.status === 'loading') {
    return 'Loading...'
  }

  if (state.status === 'error') {
    return `Error: ${state.error.toLocaleLowerCase}`
  }

  if (state.status === 'success') {
    return `Data: ${state.data}`
  }

}
