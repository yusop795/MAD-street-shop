import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from "react-router-dom";
// common components
import { SearchModalHeader } from '../../components/Header';
// style
import '../../assets/styles/containers/setting.scss';

const SearchModal = ({ isOpen, onEvent }) => {
    const [keywordList, setKewordList] = useState(['붕어빵', '호떡', '고구마', '순대', '철판']);

    const modalPage = useRef();

    const onKeywordRemove = useCallback(keyword => {
        keywordList.splice(keywordList.indexOf(keyword), 1)
        setKewordList([...keywordList]);
    })

    const searchForKeyword = (keyword)=>{
       window.location = `/searchResult?keyword=${keyword}`
    }

    useEffect(() => {
        if (isOpen) {
            console.log(modalPage)
            modalPage.current.style = 'transform: translateX(0)'
            modalPage.current.scrollTop = 0
        }
    }, [isOpen]);


    return (
        <div ref={modalPage} className={`searchModal modalPageRight ${isOpen ? 'open' : ''}`}>
            <SearchModalHeader goBack={onEvent} goTo={'/searchResult'}/>
            <div className="currentSearch">
                <div>최근검색어</div>
                <ul>
                    {
                        keywordList.map((v, i) => {
                            return (
                                <li key={i}>
                                    <button className="searchForKeyword" onClick={() => searchForKeyword(v)}type="button">{v}</button>
                                    <button type="button" className="deleteKeyword" onClick={() => onKeywordRemove(v)}></button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default withRouter(SearchModal);
