import axios from 'axios';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import { BsPlus } from 'react-icons/bs';

import SubmitBtn from '../Common/SubmitBtn';
import './style/RegisterForm.scss';

const RegisterForm: React.FC<RouteComponentProps> = ({history}) => {

  const userState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, city } = userState;

  const [photo, setImage] = useState<any>(null);
  const [imgbase64, setImgbase64] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [endtime, setEndtime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [priceErr, setPriceErr] = useState<string>('');
  const [titleErr, setTitleErr] = useState<string>('');

  const fileChange = (e: any): void => {

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgbase64(base64.toString());
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const submitHandler = async () => {
    
    if (!title || !price || !photo || !description || !endtime) {
      setErrorMessage('모두 입력되어야 등록이 가능합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('userId', String(id));
    formData.append('photo', photo.name);
    formData.append('title', title);
    formData.append('price', String(price));
    formData.append('endTime', endtime);
    formData.append('description', description);
    city && formData.append('city', city);

    // eslint-disable-next-line prefer-const
    for (let key of formData.keys()) {
      console.log(key);
    }
    // eslint-disable-next-line prefer-const
    for (let value of formData.values()) {
      console.log(value);
    }

    await axios.post('https://localhost:4000/auction/register', formData, { headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true });
    history.push('/ko/search');
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (!title) {
      setTitleErr('필수 입력사항입니다.');
    }
  };

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));

    if (price <= 0) {
      setPriceErr('최소 가격을 1원 이상 가격을 정해주세요!');
    } else if (!/^[0-9]/g.test(String(price))) {
      setPriceErr('최소 가격은 숫자만 입력 가능합니다!');
    } else {
      setPriceErr('필수 입력사항입니다.');
    }
  };

  const getEndtime = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const date = new Date();

    const getTime = () => {
      const YYMMDD = date.toLocaleDateString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});

      type Union = string | number;

      let hh: Union = date.getHours();
      if(hh < 10) {
        hh = `0${hh}`;
      }

      let mm: Union = date.getMinutes();
      if(mm < 10) {
        mm = `0${mm}`;
      }

      let ss: Union = date.getSeconds();
      if(ss < 10) {
        ss = `0${ss}`;
      }

      return `${YYMMDD} ${hh}:${mm}:${ss}`;
    };

    if (e.currentTarget.value === '1d') {
      date.setDate(date.getDate() + 1);
      setEndtime(getTime());
    } else if (e.currentTarget.value === '3d') {
      date.setDate(date.getDate() + 3);
      setEndtime(getTime());
    } else if (e.currentTarget.value === '7d') {
      date.setDate(date.getDate() + 7);
      setEndtime(getTime());
    }
  };

  const str = '등록';

  return (
    <section className="register">
      <article className="register-topbox">
        <div className="register-filebox">
          <div className="register-photobox">
            {imgbase64 ? <img className="register-photo" src={imgbase64} /> : <></>}
            <div className={!photo ? 'register-iconbox' : 'register-visible'}><BsPlus size="60"/></div>
            <input className="register-file" type="file" accept="image/jpeg, image/png" onChange={fileChange}/>
          </div>
          {!photo ? <div className="register-photoerror">사진을 등록해주세요!</div> : <div className="register-photoerror"></div>}
        </div>
        <div className="register-infobox">
          <div className="register-titlebox">
            <input className="register-title" type="text" onChange={titleHandler} placeholder="제목을 입력해주세요" />
            {!title ? <div className="register-titleErr">{titleErr}</div> : <div className="register-titleErr"></div>}
          </div>
          <div className="register-pricebox">
            <input className="register-price" type="text" onChange={priceHandler} placeholder="최소 가격을 입력해주세요"/>
            {!price ? <div className="register-priceErr">{priceErr}</div> : <div className="register-priceErr"></div>}
          </div>
          <div>
            <button className="register-period" value="1d" onClick={getEndtime} >1일</button>
            <button className="register-period" value="3d" onClick={getEndtime} >3일</button>
            <button className="register-period" value="7d" onClick={getEndtime} >7일</button>
            {!endtime ? <div className="register-endtime">경매 기간을 선택해주세요!</div> : <div className="register-endtime">경매 마감일 {endtime}</div>}
          </div>
        </div>
      </article>
      <article className="register-bottombox">
        <textarea className="register-description" onChange={e => setDescription(e.target.value)}></textarea>
        {errorMessage ? <div>{errorMessage}</div> : null}
        <SubmitBtn str={str} submitHandler={submitHandler}/>
      </article>
    </section>
  );
};

export default withRouter(RegisterForm);