import React from 'react';
import { AiFillYoutube, AiFillGithub } from 'react-icons/ai';
import logo from '../../res/logo_footer.png';
import './style/Footer.scss';

const Footer: React.FC = () => {
  return (
    <section className="footer">
      <article className="footer-topbox">
        <img className="footer-logo" src={logo} alt=""/>
        <a className="footer-service" href="https://github.com/codestates/lilakchal-server">서비스 소개</a>
        <div className="footer-team">
          <span>팀원</span>
          <a className="footer-teamlink" href="https://github.com/Pangho297">Baek Kwangho</a>
          <a className="footer-teamlink" href="https://github.com/kimyoosang">Kim Yoosang</a>
          <a className="footer-teamlink" href="https://github.com/ImHyeLim1209">Im Hyelim</a>
          <a className="footer-teamlink" href="https://github.com/flobeeee">Lee Eunjeong</a>
        </div>
      </article>
      <article className="footer-midbox">
        <div className="footer-leftbox">
          <div className="footer-emailbox">
            <div className="footer-question">고객 문의</div>
            <span className="footer-email">yoo99485@gmail.com</span>
          </div>
          <div className="footer-emailbox">
            <div className="footer-question">지역 광고</div>
            <span className="footer-email">sssver28@gmail.com</span>
          </div>
        </div>
        <div className="footer-rightbox">
          <div className="footer-emailbox">
            <div className="footer-question">제휴 문의</div>
            <span className="footer-email">imhyelim1091@gmail.com</span>
          </div>
          <div className="footer-emailbox">
            <div className="footer-question prquestion">PR 문의</div>
            <span className="footer-email">moananazzang@gmail.com</span>
          </div>
        </div>
      </article>
      <article className="footer-bottombox">
        <div className="footer-textbox">
          <span className="footer-address">서울특별시 서초구 서초4동 서초대로77길 19</span>
          <span className="footer-copyright">Copyright © 2021 Lilakchal all rights reserved</span>
        </div>
        <div className="footer-iconbox">
          <a href="https://www.youtube.com/c/CodeStates/featured"><AiFillYoutube className="footer-youtube"/></a>
          <a href="https://github.com/codestates/lilakchal-server"><AiFillGithub className="footer-github"/></a>
        </div>
      </article>
    </section>
  );
};

export default Footer;