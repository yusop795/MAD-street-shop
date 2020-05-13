import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
// common components
import { SearchModalHeader } from '../components/Header';
// style
import '../assets/styles/containers/setting.scss';
import { ShopList } from '../components/List';
import '../assets/styles/containers/favorite.scss';
import { useDispatch } from 'react-redux';
import { startTypes } from '../reducers/startReducer';
import { isEmpty } from "../util/gm";

import Spinner from "../components/Unit/Spinner";
const SearchResult = ({ onEvent }) => {
    const dummyData = [
        {
            shopName: "석정포장마차",
            shopTags: {
                title: "분식",
            },
            imageUrl: [
                "https://post-phinf.pstatic.net/MjAxOTEwMDFfNjkg/MDAxNTY5OTE5NzUxNDc2.mnGT1DcIaEY9os4ftETl5Bc_SudAwsUq8O3KaqlpQtQg.qhcMdUjcKqBoTC6hR1j7OnsY4BIpK1aulSmv0mlwO14g.JPEG/%EB%B6%84%EC%8B%9D.jpg?type=w1200",
            ],
            now: {
                active: false,
            },
            link: "/",
            vicinity: 5748.120,
            likeScore: 5
        },
        {
            shopName: "추억군고구마",
            shopTags: {
                title: "구황작물",
            },
            imageUrl: [
                "https://lh3.googleusercontent.com/proxy/Coj5zbVzfNmPwM2p0CSTb7o36HrQ4S7Tw43m_c2LNn2YGRmVbr7RgDT0rFm8dmjWODtLxaIVCBmqluarJ37iRjF2bkY9j6vOoiIIOmn8VxYFKjXcI2s0Cmkisfzpq9hZ4oxeXs7CyZCEAQvV8MrnO7HJHi1FkA",
            ],
            now: {
                active: true,
            },
            link: "/",
            vicinity: 5748.120,
            likeScore: 3,
        },
        {
            shopName: "민트칩스",
            shopTags: {
                title: "음료",
            },
            imageUrl: [
                "https://www.tefal.co.kr/medias/?context=bWFzdGVyfHJvb3R8MzA5OTN8aW1hZ2UvanBlZ3xoMTQvaDNlLzkzMzg2NTcyNDMxNjYuanBnfGFhNjgwMjlmMzZiNTQyN2M3MjVmYWI1ZGYyZGM0NTU5NzYyNDgzZjE3ZmE1ZTZlZjc4ZGY3Nzc0MWIxNzg4ZDk",
            ],
            now: {
                active: true,
            },
            link: "/",
            vicinity: 5748.120,
            likeScore: 0,
        },
    ];

    const modalPage = useRef();
    const [enterKeyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const [searchStoreList, setSearchList] = useState([]);
    // useEffect(() => {
    //     let keyword = (decodeURI(window.location.search)).split('=')[1];
    //     setKeyword(keyword);
    //     document.querySelector('.textBoxWrapper input').value = keyword;
    // });


    const getResult = useSelector(state => state.startReducer.searchResult, '');

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
                // return { lat: coords.latitude, long: coords.longitude };

            },
            e => console.log(`Geolocation 오류 [${e.code}] : ${e.message}`),
            options,
        );

        console.log('fetchGeolocation');
    };

    useEffect(() => {
        let keyword = (decodeURI(window.location.search)).split('=')[1];
        setKeyword(keyword);
        document.querySelector('.textBoxWrapper input').value = keyword;
    })

    useEffect(() => {
        if (navigator.geolocation) {
            fetchGeolocation();
        }
    }, []);

    useEffect(() => {
        if (!isEmpty(location)) {
            dispatch({
                type: startTypes.FETCH_SHOP_LIST,
                payload: {
                    type: "main",
                    long: location.long,
                    lat: location.lat,
                    type: "main",
                    active: false,
                    range: 30000,
                    search: enterKeyword,
                    name: "searchResult",
                }
            });
        }
    }, [location]);

    useEffect(() => {
        if (!isEmpty(getResult)) {
            setLoading(false);
        }
    }, [getResult])

    console.log('검색 결과??', getResult, loading);
    return (
        <div ref={modalPage}>
            <SearchModalHeader goBack={onEvent} goTo={'/searchResult'} textValue={(decodeURI(window.location.search)).split('=')[1]} />
            <div className="searchResult">
                <div className="resultInfo">내 주변 <strong>3km</strong> 이내의 검색 결과입니다</div>
                {
                    loading ? (
                        <Spinner />
                    ) : getResult === "No Content" ? (
                        <div className="resultWrapper">
                            <div className="resultCounts">검색결과 <strong>0</strong></div>
                            <div className="shopListWrapper noData">검색 결과 없음</div>
                        </div>) : (<div className="resultWrapper">
                            <div className="resultCounts">검색결과 <strong>{getResult.length}</strong></div>
                            <ShopList items={getResult} type="serchResult" />
                        </div>)
                }
            </div>
        </div>
    );
};

export default withRouter(SearchResult);
