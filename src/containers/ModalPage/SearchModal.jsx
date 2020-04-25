import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from "react-router-dom";
// common components
import { SearchModalHeader } from '../../components/Header';
// style
import '../../assets/styles/containers/setting.scss';
import { isEmpty } from "../../util/gm";

const SearchModal = ({ isOpen, onEvent }) => {
    const [keywordList, setKewordList] = useState([]);

    const modalPage = useRef();

    const onKeywordRemove = useCallback(keyword => {
        keywordList.splice(keywordList.indexOf(keyword), 1)
        setKewordList([...keywordList]);
    }, [keywordList])

    const searchForKeyword = (keyword) => {
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
            <SearchModalHeader goBack={onEvent} goTo={'/searchResult'} />
            {
                isEmpty(keywordList) ? <div className="currentSearch"><div>최근검색어가 없습니다</div></div> : (
                    <div className="currentSearch">
                        <div>최근검색어</div>
                        <ul>
                            {
                                keywordList.map((v, i) => {
                                    return (
                                        <li key={i}>
                                            <button className="searchForKeyword" onClick={() => searchForKeyword(v)} type="button">{v}</button>
                                            <button type="button" className="deleteKeyword" onClick={() => onKeywordRemove(v)}></button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default withRouter(SearchModal);
