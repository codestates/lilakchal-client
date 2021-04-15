import React, {useEffect} from 'react';
import { useDispatch  } from 'react-redux';
import Lottie from 'react-lottie';
import loadingBid from '../../res/lotties/bid2.json';
import { OpaqueDimmer, LoadingContainer } from './style/ModalStyle';
import axios from 'axios';
import {kakaoKey} from '../../modules/constants';
import { LocationInfoHandler } from '../../redux/modules/UserInfo';

interface Props {
  isLoading: boolean
}
const LoadingModal: React.FC<Props> = ({isLoading}) => {
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingBid,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useEffect(() => {
    if(window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({coords}) => {
        const address = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${coords.longitude}&y=${coords.latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoKey.REST_API}`,
            },
          }
        );
        const {region_1depth_name, region_2depth_name} = address.data.documents[0].address;
        dispatch(LocationInfoHandler(`${region_1depth_name} ${region_2depth_name}`));
        // localStorage.setItem('city', `${region_1depth_name} ${region_2depth_name}`);
          
      }, 
      () => {
        dispatch(LocationInfoHandler('지역 없음'));
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  });

  return (
    <OpaqueDimmer visible={isLoading}>
      <LoadingContainer>
        <Lottie options={defaultOptions} height='90%' width='90%' />
      </LoadingContainer>
    </OpaqueDimmer>
  );
};

export default LoadingModal;