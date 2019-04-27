import React from "react";
import styled from "styled-components";

const Comment = styled.p`
    color: white;
    margin-top: 10px;
`;

const Title = styled.h1`
    color: white;
    margin-top: 10px;
`;


const PrivatePresenter = () => (
    <>
        <Title>개인정보 취급방침<br/></Title>
        <Comment>
            
            오늘 뭐 볼까? 어플은 공부용으로 만든 어플이며 휴대폰내부에 접근해서 사용자의 개인정보는 일체 다른곳에 저장하지않습니다.
        </Comment>
    </>
);

export default PrivatePresenter;