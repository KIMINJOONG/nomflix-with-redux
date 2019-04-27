import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      current: "youtube",
      youtubeKey: ""
    };
  }

  handleCurrent = currentState => {
    this.setState({
      current: currentState
    });
  };

  handleYoutube = youtubeKey => {
    this.setState({
      youtubeKey
    });
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        //const가 앞에 붙은거랑 같다
        //const request = await moviesApi.movieDetail(parsedID));
        // result = request.data; 를 아래와 같은 소스로도 가능
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({
        error: "Cant find anything"
      });
    } finally {
      this.setState({
        loading: false,
        result
      });
    }
  }

  render() {
    const { result, error, loading, current, youtubeKey } = this.state;
    const { handleYoutube } = this;
    console.log(result);
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        handleCurrent={this.handleCurrent}
        current={current}
        handleYoutube={handleYoutube}
        youtubeKey={youtubeKey}
      />
    );
  }
}
