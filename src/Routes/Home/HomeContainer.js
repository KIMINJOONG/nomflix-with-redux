import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

export default class extends React.Component{
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        let nowPlaying, upcoming, popular, error;
        try {
             ({
                // results를 nowPlaying으로 이름변경
                // 변수명 변경하는법
                data: {results : nowPlaying }
            } = await moviesApi.nowPlaying());
            ({
                data: { results: upcoming }
            } = await moviesApi.upcoming());

            ({
                data: { results: popular}
            } = await moviesApi.popular());

        }catch{
            error=  "Can't find Movies information.";
        }finally{
            this.setState({
                loading: false,
                nowPlaying,
                upcoming,
                popular,
                error
            });
        }
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        return (
            <HomePresenter 
                nowPlaying={nowPlaying} 
                upcoming={upcoming} 
                popular={popular} 
                error={error}
                loading={loading}
            />
        );
    }
}