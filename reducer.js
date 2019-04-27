// Import

// Actons
const GET_MOVIES_DATA = "GET_MOVIES_DATA";

// Action Creators
function getMoviesData() {
  return {
    type: GET_MOVIES_DATA
  };
}

// Reducer
const initialState = {
  nowPlaying: null,
  upcoming: null,
  popular: null,
  loading: true
};

// Reducer Functions

// Export Action Creators

// Export Reducer
