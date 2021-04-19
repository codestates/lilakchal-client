import React, { useEffect } from 'react';
import Start from '../components/Navigation/Start';
import Footer from '../components/Footer/Footer';
import './style/LandingPage.scss';
import landing from '../res/landing_logo.png';
import SearchImg from '../res/landing_search.png';
import map from '../res/landing_map.png';
import thinking from '../res/thinking.png';
import apple from '../res/apple.png';
import auction from '../res/auction.png';


const LandingPage: React.FC = () => {
  localStorage.setItem('city', '');

  //   window.addEventListener('scroll', () => {
  //     yOffset = window.pageYOffset;
  //     scrollLoop();
  //   });
  //   // window.addEventListener('DOMContentLoaded', setLayout); 
  //   window.addEventListener('load', () => {
  //     setLayout();
  //   });  
  //   window.addEventListener('resize', setLayout); 
  
  // })();

  useEffect(()=> {
    
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    // const prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    // let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
    // const enterNewscene = false; //새로운 씬이 시작된 순간 true

  
    function setLayout() {
    //각 스크롤 섹션의 높이 세팅 (모바일이나 다른 크기의 화면에서도 스크롤 인터렉션이 정상적으로 잘 보일 수 있도록 하기위해)
      for (let i = 0; i < sceneInfo.length; i++) {
        sceneInfo[i].objs.container.style.height = `${window.innerHeight * 1.2}px`; 
        // sceneInfo[i].objs.container.style.width = `${window.innerWidth }px`;
      }
      yOffset = window.pageYOffset; //전체 페이지 스크롤 값을 간단하게 쓰기위해서 변수로 할당
      let totalScrollHeight = 0;
      for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= yOffset) {
          // currentScene = i;
          break;
        }
      }
    
    }
    const sceneInfo = [      
      {
      // 0
        scrollHeight: 0,
        objs: {
        // container: document.getElementById('scroll-section-0'),
          container: document.querySelector('#scroll-section-0') as HTMLElement
        }
      },
      {
        // 1
        scrollHeight: 0,
        objs: {
          // container: document.getElementById('scroll-section-0'),
          container: document.querySelector('#scroll-section-1') as HTMLElement,
          messageA: document.querySelector('.scroll-section1-message-a') as HTMLElement,
          messageB: document.querySelector('.scroll-section1-message-b') as HTMLElement,
          imgA: document.querySelector('.scroll-section1-search-img') as HTMLElement,
          imgB: document.querySelector('.scroll-section1-map-img') as HTMLElement,
          imgC: document.querySelector('.scroll-section1-thinking-img') as HTMLElement,
        },
        values: {
          messageA_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
          messageB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
          imgA_opacity_in: [0, 1, { start: 0.22, end: 0.22 }],
          imgB_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
          imgC_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
          //
          messageA_translateY_in: [20, 0, { start: 0.2, end: 0.3 }],
          messageB_translateY_in: [20, 0, { start: 0.4, end: 0.5 }],
          imgA_translateY_in: [20, 0, { start: 0.22, end: 0.22 }],
          imgB_translateY_in: [20, 0, { start: 0.2, end: 0.3 }],
          imgC_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
          //
          messageA_opacity_out: [0, 1, { start: 0.5, end: 0.6 }],
          messageB_opacity_out: [0, 1, { start: 0.6, end: 0.7 }],
          imgA_opacity_out: [1, 0, { start: 0.6, end: 0.8 }],
          imgB_opacity_out: [1, 0, { start: 0.6, end: 0.8 }],
          imgC_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
          ///
          messageA_translateY_out: [0, -20, { start: 0.5, end: 0.6 }],
          messageB_translateY_out: [0, -20, { start: 0.6, end: 0.7 }],
          imgA_translateY_out: [0, -20, { start: 0.6, end: 0.8 }],
          imgB_translateY_out: [0, -20, { start: 0.6, end: 0.8 }],
          imgC_translateY_out: [0, -20, { start: 0.8, end: 0.9 }],
        }
      },
      {
        // 2
        scrollHeight: 0,
        objs: {
          // container: document.getElementById('scroll-section-0'),
          container: document.querySelector('#scroll-section-2') as HTMLElement,
          messageA: document.querySelector('.scroll-section2-message-a') as HTMLElement,
          messageB: document.querySelector('.scroll-section2-message-b') as HTMLElement,
          imgA: document.querySelector('.scroll-section2-register-img') as HTMLElement,
          imgB: document.querySelector('.scroll-section2-auction-img') as HTMLElement,
        }
      },

    ];
    setLayout();
    console.log(sceneInfo[0].objs.container.style.height);

  }, []);
  


  return (
    <div className='landing-container'>
      <section className="scroll-section" id="scroll-section-0">
        <div className='scroll-section0-left'>
          <img className='scroll-section0-img' src={landing}/>
          <div className='scroll-section0-message-a'>
          좋은 물건을 구경하고 경매에 참여해 보세요!
          </div>
          <Start/>
        </div>
        <div className='scroll-section0-right'>
          <div className='scroll-section0-gif'/>
        </div>
      </section>

      <section className="scroll-section" id="scroll-section-1">

        <div className='scroll-section1-left'>

          <div className='scroll-section1-message-a' >원하는 물품을 검색해 보세요!</div>
          <img className='scroll-section1-search-img' src={SearchImg}/>
        </div>

        <div className='scroll-section1-right'>

          <img className='scroll-section1-map-img' src={map}/>
          <div className='scroll-section1-right-bottom'>
            <img className='scroll-section1-thinking-img' src={thinking}/>
            <div className='scroll-section1-message-b'>
            내 위치 주변의 물품들을 확인해 보세요!
            </div>
          </div>
        </div>

      </section>

      <section className="scroll-section" id="scroll-section-2">

        <div className='scroll-section2-left'>
          <img className='scroll-section2-register-img' src={apple}/>
        </div>

        <div className='scroll-section2-right'>
          <div className='scroll-section2-img'>
            <img className='scroll-section2-auction-img' src={auction}/>
          </div>
          <div className='scroll-section2-message-a'>
            경매 주최자가 되어보세요
          </div>
          <div className='scroll-section2-message-b'>
            내 물건의 경매를 시작해 보세요!
          </div>
          <Start/>
        </div>
      </section>

      <Footer/>
    </div>

  );
};

export default LandingPage;
