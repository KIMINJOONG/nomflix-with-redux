import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default class extends React.Component{
    state = {
        topRated: null
        , popular: null
        , airingToday: null
        , loading: true
        , error: null
    };

    async componentDidMount() {
        let topRated, popular, airingToday, error;
        try{
            ({
                data: { results: topRated}
            } = await tvApi.topRated());
            ({
                data: {results : popular}
            } = await tvApi.popular());
            ({
                data: {results: airingToday}
            } = await tvApi.airingToday());
        }catch{
            error= "Can't find TV information.";
        }finally{
            this.setState({
                loading: false,
                topRated,
                popular,
                airingToday,
                error
            });
        }
    }

    render() {
        const { topRated, popular, airingToday, loading, error} = this.state;
        return (
        <TVPresenter 
            topRated= {topRated}
            popular={popular}
            airingToday={airingToday}
            loading={loading}
            error={error}
        />
        );
    }
}