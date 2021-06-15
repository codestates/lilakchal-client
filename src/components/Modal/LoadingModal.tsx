import React, {useEffect} from 'react';
import Lottie from 'react-lottie';
import loadingBid from '../../res/lotties/bid2.json';
import { OpaqueDimmer, LoadingContainer } from './style/ModalStyle';

interface Props {
  isLoading: boolean,
  callback?: () => void,
}
const LoadingModal: React.FC<Props> = ({isLoading, callback}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingBid,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    callback && callback();
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