import axios from "axios";


const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
    , params: {
        api_key: "39a55128d46ad2cb9a99830763fbec2d",
        language: navigator.language || navigator.userLanguage
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) => api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("/search/movie", {
            params: {
                query: decodeURIComponent(encodeURIComponent(term))
            }
    }),
    collections: (id) => api.get(`collection/${id}`)
    
    
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: (id) => api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("/search/tv", {
        params: {
            query: encodeURIComponent(encodeURIComponent(term))
        }
    })
}