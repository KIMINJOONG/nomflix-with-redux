import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component{
    state = {
        result : null
        , tvResults: null
        , searchTerm: ""
        , loading: false
        , error: null
    };
    

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByTerm();
        }
    };

    updateTerm = event => {
        const {
            target: { value }
        } = event;
        this.setState({
            searchTerm: value
        });
    };

    searchByTerm = async() => {
        let movieResults, tvResults,error;
        const { searchTerm } = this.state;
        this.setState({ lading: true });
        try{
            ({
                data: {results : movieResults }
            } = await moviesApi.search(searchTerm));
            ({
                data: {results : tvResults }
            } = await tvApi.search(searchTerm));
        }catch{
            error= "Cant find results."
        }finally{
            this.setState({
                loading: false,
                movieResults,
                tvResults,
                error
            });
        }
    }

    render() {
        const { movieResults, tvResults, searchTerm, loading, error} = this.state;
        return (
        <SearchPresenter 
            movieResults= {movieResults}
            tvResults={tvResults}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            handleSubmit={this.handleSubmit}
            updateTerm={this.updateTerm}
        />
        );
    }
}