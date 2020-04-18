import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { startTypes, startAction } from '../reducers/startReducer';


import ModalPageUtill from '../util/ModalPageUtill.js';

import { Header } from '../components/Header';
import { SettingCategory, SettingTime } from './ModalPage';

import '../assets/styles/containers/favorite.scss';
import { ShopList } from '../components/List';

const Ranking = ({ history }) => {
  // 스토어 값 가져오기
  /* 테스트용 더미데이터 */
  const dummyData = [
    {
      name: "석정포장마차",
      category: "분식",
      photo: "https://post-phinf.pstatic.net/MjAxOTEwMDFfNjkg/MDAxNTY5OTE5NzUxNDc2.mnGT1DcIaEY9os4ftETl5Bc_SudAwsUq8O3KaqlpQtQg.qhcMdUjcKqBoTC6hR1j7OnsY4BIpK1aulSmv0mlwO14g.JPEG/%EB%B6%84%EC%8B%9D.jpg?type=w1200",
      open: true,
      link: "/",
      info: {
        distance: 8,
        like: 674,
        userLike: true,
      }
    },
    {
      name: "추억군고구마",
      category: "구황작물",
      photo: "https://lh3.googleusercontent.com/proxy/Coj5zbVzfNmPwM2p0CSTb7o36HrQ4S7Tw43m_c2LNn2YGRmVbr7RgDT0rFm8dmjWODtLxaIVCBmqluarJ37iRjF2bkY9j6vOoiIIOmn8VxYFKjXcI2s0Cmkisfzpq9hZ4oxeXs7CyZCEAQvV8MrnO7HJHi1FkA",
      open: false,
      link: "/",
      info: {
        distance: 12,
        like: 521,
        userLike: false,
      }
    },
    {
      name: "청춘샌드위치",
      category: "샌드위치",
      photo: "https://www.spcmagazine.com/wp-content/uploads/2019/04/SPC%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98_%EC%8D%B8%EB%84%A4%EC%9D%BC.png",
      open: true,
      link: "/",
      info: {
        distance: 40,
        like: 500,
        userLike: false,
      }
    },
    {
      name: "민트칩스",
      category: "음료",
      photo: "https://www.tefal.co.kr/medias/?context=bWFzdGVyfHJvb3R8MzA5OTN8aW1hZ2UvanBlZ3xoMTQvaDNlLzkzMzg2NTcyNDMxNjYuanBnfGFhNjgwMjlmMzZiNTQyN2M3MjVmYWI1ZGYyZGM0NTU5NzYyNDgzZjE3ZmE1ZTZlZjc4ZGY3Nzc0MWIxNzg4ZDk",
      open: false,
      link: "/",
      info: {
        distance: 45,
        like: 329,
        userLike: false,
      }
    },
    {
      name: "애플철판아이스크림",
      category: "디저트",
      photo: "https://lh3.googleusercontent.com/proxy/fwR3WYUjQaQZt1mvTlR6WzOJt-gUy5mhGiCplgDlkv5yByOcsSprE6f6wC4Pe9fo-bvOrlkShNqyJP4HtkxLUlb-2Uo-8bho9EYFYTZ5NMxS",
      open: true,
      link: "/",
      info: {
        distance: 111,
        like: 301,
        userLike: true,
      }
    },
    {
      name: "츄로킹",
      category: "디저트",
      photo: "https://www.polinews.co.kr/data/photos/20150415/art_1428394625.jpg",
      open: true,
      link: "/",
      info: {
        distance: 129,
        like: 196,
        userLike: false,
      }
    },
    {
      name: "원조가마솥순대",
      category: "분식",
      photo: "https://t1.daumcdn.net/liveboard/dailylife/946d34355aab4a4a922de5215f8dc3ce.jpg",
      open: true,
      link: "/",
      info: {
        distance: 149,
        like: 165,
        userLike: true,
      }
    },
  ];
  // const loading = useSelector(({ authReducer }) => authReducer.loading, true);
  // 모달
  // const { isShowing, title, contents, setAlert } = AlertUtil();
  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  const dispatch = useDispatch();

  // const storeCategory = useSelector(state => state.userReducer.storeCategory, {});

  useEffect(() => {
    dispatch({
      type: startTypes.FETCH_SHOP_LIST,
    });
    // if(KAKAO.Auth.getAccessToken()){
    //   dispatch({
    //     type: userTypes.SET_LOGIN,
    //     payload: {
    //       token: {
    //         accessToken: KAKAO.Auth.getAccessToken(),
    //       },
    //       isLogin: true
    //     },
    //   })
    // } 
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

  return (
    <div className="main ranking">
      <Header title="내주변 랭킹" onEvent={history.goBack} />
      {/* <button
        type="button"
        onClick={() => {
          setModalPage({
            target: 'SettingCategory',
          });
        }}
      >
        모달 테스트
      </button> */}
      <ShopList items={dummyData} type="rank" />
      <ShopList items={dummyData} />
      {rederModalPage()}
    </div>
  );
};

export default withRouter(Ranking);
