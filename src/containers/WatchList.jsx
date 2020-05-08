import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { startTypes } from '../reducers/startReducer';


import ModalPageUtill from '../util/ModalPageUtill.js';

import { Header } from '../components/Header';
import { SettingCategory, SettingTime } from './ModalPage';

import '../assets/styles/containers/favorite.scss';
import { ShopList } from '../components/List';

import { isEmpty } from "../util/gm";

import Spinner from "../components/Unit/Spinner";

const WatchList = ({ history }) => {
    const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();
    const dispatch = useDispatch();
    const storeShopList = useSelector(state => state.startReducer.main, {});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('userEffect', storeShopList);
        dispatch({
            type: startTypes.FETCH_SHOP_LIST,
            payload: {
                type: "main",
                name: "main",
            }
        });
    }, []);

    const rederModalPage = () => {
        switch (targetModalPage) {
            case 'SettingCategory':
                return <SettingCategory isOpen={isModalOpen} onEvent={setModalPage} />;
            case 'SettingTime':
                return <SettingTime isOpen={isModalOpen} onEvent={setModalPage} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (!isEmpty(storeShopList)) {
            setLoading(false);
        }
    }, [storeShopList])

    return (
        <div className="main ranking">
            <Header title="관심리스트" onEvent={history.goBack} />
            {
                loading ? <Spinner /> : <ShopList items={storeShopList} type="watchList" />
            }
            {rederModalPage()}
        </div>
    );
};

export default withRouter(WatchList);
