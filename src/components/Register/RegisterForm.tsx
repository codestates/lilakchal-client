import axios from 'axios';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import { BsPlus } from 'react-icons/bs';
import SubmitBtn from '../Common/SubmitBtn';
import constantStrings from '../../modules/strings';
import './style/RegisterForm.scss';

const RegisterForm: React.FC<RouteComponentProps> = ({history}) => {

  const userState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, city } = userState;
  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const { isLogin } = loginState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [photo, setImage] = useState<any>(null);
  const [imgbase64, setImgbase64] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [endtime, setEndTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [priceErr, setPriceErr] = useState<string>('');
  const [titleErr, setTitleErr] = useState<string>('');
  const [fixTime, setFixTime] = useState<string>('');

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgbase64(base64.toString());
      }
    };

    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const submitHandler = async () => {
    
    if (!title || !price || !photo || !description || !endtime || priceErr !== '') {
      setErrorMessage(constantStrings.registerInputError1);
      return;
    } else if (description.length > 100) {
      setErrorMessage(constantStrings.registerInputError2);
      return;
    } else if (!isLogin) {
      setErrorMessage(constantStrings.loginError);
      return;
    }

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('userId', String(id));
    formData.append('photo', photo.name);
    formData.append('title', title);
    formData.append('price', String(price));
    formData.append('endTime', fixTime);
    formData.append('description', description);
    city && formData.append('city', city);

    await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auction/register`, formData, { headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true });
    history.push('/ko/search');
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value.replace(/(<([^>]+)>)/ig, ''); 
    setTitle(newText);

    if (!title) {
      setTitleErr(constantStrings.registerInputError3);
    }
  };

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMoneyStr = e.target.value;

    if (!/^(0|[1-9]+[0-9]*)$/g.test(newMoneyStr)) {
      setPriceErr(constantStrings.registerInputError4);
    } else if (Number(newMoneyStr) <= 0) {
      setPriceErr(constantStrings.registerInputError5);
    } else if (newMoneyStr === '') {
      setPriceErr(constantStrings.registerInputError3);
    } else if (Number(newMoneyStr) >= 2100000000) {
      setPriceErr(constantStrings.registerInputError6);
    } else {
      setPrice(Number(e.target.value));
      setPriceErr('');
    }
  };

  const getEndTime = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
      setEndTime(getTime());
      date.setHours(date.getHours() - 9);
      setFixTime(getTime());
    } else if (e.currentTarget.value === '3d') {
      date.setDate(date.getDate() + 3);
      setEndTime(getTime());
      date.setHours(date.getHours() - 9);
      setFixTime(getTime());
    } else if (e.currentTarget.value === '7d') {
      date.setDate(date.getDate() + 7);
      setEndTime(getTime());
      date.setHours(date.getHours() - 9);
      setFixTime(getTime());
    }
    changeSelectedPeriodBtnColor(e.target as HTMLElement);
  };

  const changeSelectedPeriodBtnColor = (selectedBtn: HTMLElement): void => {
    const lastSelectedBtn = document.querySelector('.selected-period');
    lastSelectedBtn?.classList.remove('selected-period');
    selectedBtn.classList.add('selected-period');
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.replace(/(<([^>]+)>)/ig, ''); // html 태그 제거
    setDescription(newText);

  };

  return (
    <section className="register">
      <h1 className="register-header">{constantStrings.registerTitle}</h1>
      <article className="register-topbox">
        <div className="register-filebox">
          <div className={imgbase64 ? 'register-photobox bordernone' : 'register-photobox'}>
            {imgbase64 ? <img className="register-photo" src={imgbase64} /> : <></>}
            <div className={!photo ? 'register-iconbox' : 'register-visible'}><BsPlus className="register-icon"/></div>
            <input className="register-file" type="file" accept="image/jpeg, image/png" onChange={fileChange}/>
          </div>
          {!photo ? <div className="register-photoerror">{constantStrings.registerInputError7}</div> : <div className="register-photoerror"></div>}
        </div>
        <div className="register-infobox">
          <div className="register-titlebox">
            <input className="register-title" type="text" onChange={titleHandler} placeholder={constantStrings.registerPlaceholder1} />
            {!title ? <div className="register-titleErr">{titleErr}</div> : <div className="register-titleErr"></div>}
          </div>
          <div className="register-pricebox">
            <input className="register-price" type="text" onChange={priceHandler} placeholder={constantStrings.registerPlaceholder2}/>
            {priceErr !== '' ? <div className="register-priceErr">{priceErr}</div> : <div className="register-priceErr"></div>}
          </div>
          <div className="register-period-box">
            <div className="register-period-button-box">
              <button className="register-period 1d" value="1d" onClick={getEndTime} >{constantStrings.registerDay1}</button>
              <button className="register-period 3d" value="3d" onClick={getEndTime} >{constantStrings.registerDay3}</button>
              <button className="register-period 7d" value="7d" onClick={getEndTime} >{constantStrings.registerDay7}</button>
            </div>
            {!endtime ? <div className="register-endtime">{constantStrings.registerInputError8}</div> : <div className="register-endtime">{constantStrings.registerEndDay} {endtime}</div>}
          </div>
        </div>
      </article>
      <article className="register-bottombox">
        <textarea className="register-description" placeholder={constantStrings.registerPlaceholder3} onChange={descriptionHandler}></textarea>
        <SubmitBtn classname="register-submit" str="등록" submitHandler={submitHandler}/>
        {errorMessage ? <div className="register-error">{errorMessage}</div> : <div className="register-error"></div>}
      </article>
    </section>
  );
};

export default withRouter(RegisterForm);