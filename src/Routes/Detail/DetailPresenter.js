import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components//Loader";
import Message from "../../Components/Message";
import { Link } from"react-router-dom";
const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const Imdb = styled.div`
    display: inline-block;
    width: 30px;
    height: 10px;
    background-image: url(${props => props.imgPath});
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    cursor:pointer;
`;

const TabMenu = styled.div`
    width: 100%;
    height:50px;
    background-color: rgba(20, 20, 20, 0.8);
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
    margin-top: 20px;
`;

const List = styled.ul`
    display:flex;
`;

const TabItem = styled.li`
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 5px solid 
        ${props => props.current ? "#3498db" : "transparent"};
    transition: border-bottom .5s ease-in-out;
    cursor: pointer;
`;

const TabContainer = styled.div`

`;

const TabContent = styled.div`
    width: 100%;
    display: 
        ${props => props.current ? "block" : "none"};
`;

const Youtube = styled.iframe`
    float: left;
    width: 60%;
    height: 500px;
    padding: 0 10px;
`;

const YoutubeList = styled.ul`
    margin-top : 10px;
    
`;

const YoutubeItemImg = styled.div`
    display: inline-block;
    width:20px;
    height: 20px;
    background-image: url(${props => props.bgUrl});
    background-position-y: 4px;
    background-size: cover;
`;

const YoutubeItem = styled.li`
    margin-top: 10px;
    font-size: 14px;
    cursor:pointer;
    &:hover {
        color: gray;
        font-size: 16px;
    }
    
`;

const CompanyContainer = styled.div`
    display: inline-block;
    width: 100px;
    margin-top: 10px;
    text-align: center;
`;

const CompanyLogo = styled.div`
    display: inline-block;
    width: 100%;
    height: 50px;
    background-image:url(${props => props.companyImg});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    margin-bottom: 10px;
`;

const CompanyTitle = styled.span`
`;



const DetailPresenter = ({ result, loading, error, current, handleCurrent, handleYoutube, youtubeKey }) => 
    loading ? (
        <>
        <Helmet>
            <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
        </>
     ) : (
        error ? <Message /> : 
        <Container>
        <Helmet>
            <title>{result.title ? result.title : result.name}{" "}| Nomflix</title>
        </Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
        <Content>
            <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png")}  />
            <Data>
                <Title>{result.title ? result.title : result.name}</Title>
                <ItemContainer>
                    <Item>{result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4) }</Item>    
                    <Divider>•</Divider>
                    <Item>{result.runtime ? result.runtime : result.episode_run_time[0] } min</Item> 
                    <Divider>•</Divider>
                    <Item>
                        {result.genres && 
                            result.genres.map((genre, index) => 
                                index === result.genres.length -1 
                                ? genre.name 
                                : `${genre.name} / `
                            )}
                    </Item>
                    <Divider>•</Divider>
                    <Item>
                        <Imdb imgPath={require("../../assets/imdb.png")} onClick={() => window.open(`https://imdb.com/title/${result.imdb_id}`,"_blank")}/>
                    </Item>
                </ItemContainer>
                <Overview>{result.overview}</Overview>
                <TabContainer>
                    <TabMenu>
                        <List>
                            <TabItem onClick={()=>handleCurrent("youtube")} current={current === "youtube"}>
                                    예고편
                            </TabItem>
                            <TabItem onClick={()=>handleCurrent("company")} current={current === "company"}>
                                    제작사
                            </TabItem>
                            <TabItem onClick={() =>handleCurrent("collection")} current={current === "collection"}>
                                    콜렉션
                            </TabItem>
                            <TabItem onClick={() =>handleCurrent("siriz")} current={current === "siriz"}>
                                    시리즈
                            </TabItem>
                            <TabItem onClick={() =>handleCurrent("creator")} current={current === "creator"}>
                                    제작자
                            </TabItem>
                        </List>
                    </TabMenu>
                    <TabContent current={current === "youtube"}>
                        <YoutubeList>
                        {result.videos.results && 
                            result.videos.results.length > 0 ?
                            
                            result.videos.results.map((src, index) => (
                                    index === 0 ? <Youtube key={src.id} title={src.name} src={`https://www.youtube.com/embed/${youtubeKey !== "" ? youtubeKey : src.key}`} frameborder="0"  allowFullScreen /> : 
                                            <YoutubeItem key={src.id} onClick={() => handleYoutube(src.key)}>
                                                <YoutubeItemImg bgUrl={require("../../assets/Youtube.png")}  />
                                                {src.name}
                                            </YoutubeItem>
                                    )
                                )
                            
                            : 
                            <CompanyContainer>
                                <CompanyTitle>Can't find video</CompanyTitle>
                            </CompanyContainer>
                        }
                        </YoutubeList>
                    </TabContent>
                    <TabContent current={current === "company"}>
                        {result.production_companies && 
                            result.production_companies.length > 0 ?
                            result.production_companies.map((company) => company.logo_path && 
                                <CompanyContainer key={company.id}>
                                    <CompanyLogo companyImg={`https://image.tmdb.org/t/p/w300${company.logo_path}`}/>
                                    <CompanyTitle>{company.name}({company.origin_country})</CompanyTitle>
                                </CompanyContainer>    
                            )
                            : 
                            <CompanyContainer>
                                <CompanyTitle>Can't find video</CompanyTitle>
                            </CompanyContainer>
                        }
                    </TabContent>
                    <TabContent current={current === "collection"}>
                            {result.belongs_to_collection &&
                                <Link to={`/collections/${result.belongs_to_collection.id}`}>
                                    <CompanyContainer>
                                    <CompanyLogo 
                                        companyImg={
                                            result.belongs_to_collection.poster_path &&
                                            `https://image.tmdb.org/t/p/w300${result.belongs_to_collection.poster_path}`
                                        }/>
                                    <CompanyTitle>{result.belongs_to_collection.name}</CompanyTitle>
                                    </CompanyContainer>
                                </Link>
                            }
                    </TabContent>
                    <TabContent current={current === "siriz"}>
                            {result.seasons && 
                                result.seasons.length > 0 ?
                                result.seasons.map(season => 
                                    <CompanyContainer>
                                    <CompanyLogo 
                                        companyImg={
                                            season.poster_path &&
                                            `https://image.tmdb.org/t/p/w300${season.poster_path}`
                                        }/>
                                    <CompanyTitle>{season.name}</CompanyTitle>
                                    </CompanyContainer>
                                ) : 
                                <CompanyContainer>
                                    <CompanyTitle>
                                        Can't find Seasons
                                    </CompanyTitle>
                                </CompanyContainer>
                                
                            }
                    </TabContent>
                    <TabContent current={current === "creator"}>
                        {result.created_by && 
                            result.created_by > 0 ?
                            result.created_by.map((creator) => creator.profile_path && 
                                <CompanyContainer key={creator.id}>
                                    <CompanyLogo companyImg={`https://image.tmdb.org/t/p/w300${creator.profile_path}`}/>
                                    <CompanyTitle>{creator.name}</CompanyTitle>
                                </CompanyContainer>    
                            )
                            : <CompanyContainer><CompanyTitle>Can't find creator</CompanyTitle></CompanyContainer>
                        }
                    </TabContent>
                </TabContainer>
            </Data>
        </Content>
    </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object, 
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
};

export default DetailPresenter;
