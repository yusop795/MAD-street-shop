import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from "react-router-dom";
// common components
import { SearchModalHeader } from '../../components/Header';
// style
import '../../assets/styles/containers/setting.scss';
import { isEmpty } from "../../util/gm";

import { localStorageSet } from '../../util/LocalStorage.js';

const SearchModal = ({ isOpen, currentKeyword }) => {
    const [keywordList, setKewordList] = useState(currentKeyword);
    const [location, setLocation] = useState('');

    const modalPage = useRef();

    const onKeywordRemove = useCallback(keyword => {
        keywordList.splice(keywordList.indexOf(keyword), 1)
        setKewordList([...keywordList]);
        console.log('adgdsg', keywordList);
        localStorageSet('MadShopCurrentKeyword', JSON.stringify(keywordList));
    }, [keywordList])

    const searchForKeyword = (keyword) => {
        window.location = `/searchResult?keyword=${keyword}`
    }
    // 위치정보 조회
    const fetchGeolocation = () => {
        const options = {
            enableHighAccuracy: true,
            maximumAge: 300000,
            timeout: 50000,
        };

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log('SearchModal coords', coords);
                setLocation({ lat: coords.latitude, long: coords.longitude });
            },
            e => console.log(`Geolocation 오류 [${e.code}] : ${e.message}`),
            options,
        );
    };

    useEffect(() => {
        if (isOpen) {
            modalPage.current.style = 'transform: translateX(0)'
            modalPage.current.scrollTop = 0
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            modalPage.current.style = 'transform: translateX(0)'
            modalPage.current.scrollTop = 0
        }
    }, [keywordList]);

    useEffect(() => {
        if (navigator.geolocation) {
            fetchGeolocation();
        }
    }, []);

    return (
        <div ref={modalPage} className={`searchModal modalPageRight ${isOpen ? 'open' : ''}`}>
            <SearchModalHeader goTo={'/searchResult'} />
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
