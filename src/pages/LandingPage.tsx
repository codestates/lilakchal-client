import React, { useEffect } from 'react';
import Start from '../components/Navigation/Start';
import Footer from '../components/Footer/Footer';
import './style/LandingPage.scss';
import landing from '../res/landing_logo.png';

const LandingPage: React.FC = () => {
  localStorage.setItem('city', '');

  useEffect(()=> {
    
    let yOffset = 0;
    let prevScrollHeight = 0; 
    let currentScene = 0; 
    let enterNewscene = false; 
    
    const sceneInfo = [      
      
      {
        heightNum: 1.2,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-0') as HTMLElement,
          messageA: document.querySelector('.scroll-section1-message-a') as HTMLElement,
          messageB: document.querySelector('.scroll-section1-message-b') as HTMLElement,
          imgA: document.querySelector('.scroll-section1-search-img') as HTMLElement,
          imgB: document.querySelector('.scroll-section1-map-img') as HTMLElement,
          imgC: document.querySelector('.scroll-section1-thinking-img') as HTMLElement,
          
        },
        values: {
          messageA_opacity_in: [0, 1, { start: 0.6, end: 0.8 }],
          messageB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
          imgA_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          imgB_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          
          messageA_translateY_in: [20, 0, { start: 0.6, end: 0.8 }],
          messageB_translateY_in: [20, 0, { start: 0.4, end: 0.5 }],
          imgA_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          imgB_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

        }
      },
      {
        heightNum: 1.2,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-1') as HTMLElement,
          messageA: document.querySelector('.scroll-section1-message-a') as HTMLElement,
          messageB: document.querySelector('.scroll-section1-message-b') as HTMLElement,
          messageD: document.querySelector('.scroll-section2-message-a') as HTMLElement,
          messageE: document.querySelector('.scroll-section2-message-b') as HTMLElement,
          imgA: document.querySelector('.scroll-section1-search-img') as HTMLElement,
          imgB: document.querySelector('.scroll-section1-map-img') as HTMLElement,
          imgC: document.querySelector('.scroll-section1-thinking-img') as HTMLElement,
          imgD: document.querySelector('.scroll-section2-register-img') as HTMLElement,
          imgE: document.querySelector('.scroll-section2-auction-img') as HTMLElement,
        },
        values: {
          imgC_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          imgC_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          
          messageB_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageA_opacity_out: [1, 0, { start: 0.1, end: 0.2 }],
          messageB_opacity_out: [1, 0, { start: 0.5, end: 0.6 }],
          imgA_opacity_out: [1, 0, { start: 0.4, end: 0.5 }],
          imgB_opacity_out: [1, 0, { start: 0.4, end: 0.5 }],
          imgC_opacity_out: [1, 0, { start: 0.5, end: 0.6 }],
          
          messageA_translateY_out: [0, -20, { start: 0.1, end: 0.2 }],
          messageB_translateY_out: [0, -20, { start: 0.5, end: 0.6 }],
          imgA_translateY_out: [0, -20, { start: 0.4, end: 0.5 }],
          imgB_translateY_out: [0, -20, { start: 0.4, end: 0.5 }],
          imgC_translateY_out: [0, -20, { start: 0.5, end: 0.6 }],
          
          imgD_opacity_in: [0, 1, { start: 0.5, end: 0.7 }],
          imgD_translateY_in: [20, 0, { start: 0.5, end: 0.7 }],
          messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          messageE_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
          messageE_translateY_in: [20, 0, { start: 0.8, end: 0.9 }],
          imgE_opacity_in: [0, 1, { start: 0.5, end: 0.7 }],
          imgE_translateY_in: [20, 0, { start: 0.5, end: 0.7 }],
        }
      },
      {
        // 2
        heightNum: 1.2,
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

    const setLayout = () => {
      //각 스크롤 섹션의 높이 세팅 (모바일이나 다른 크기의 화면에서도 스크롤 인터렉션이 정상적으로 잘 보일 수 있도록 하기위해)
      for (let i = 0; i < sceneInfo.length; i++) {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        sceneInfo[i].objs.container.style.width = `${window.innerWidth}px`;
      }
      yOffset = window.pageYOffset; //전체 페이지 스크롤 값을 간단하게 쓰기위해서 변수로 할당
      let totalScrollHeight = 0;
      for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= yOffset) {
          currentScene = i;
          break;
        }
      }
      
    };

    const playAnimation = () => {
      const objs: any = sceneInfo[currentScene].objs; //위에 scenceInfo 배열 안에 있는 objs = html dom객체 요소들
      const values = sceneInfo[currentScene].values; // 위에 scenceInfo 배열 안에 있는 values = 처음과 끝에 적용될 opacity(투명도)
      const currentYOffset = yOffset - prevScrollHeight; // 현재 스크롤 위치 = (전체 스크롤 값) - (이미 지나간 스크롤 값)
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      const scrollRatio = currentYOffset / scrollHeight; //현재 씬에서 얼만큼 스크롤을 했는지 비율로
      
      switch (currentScene) {

      case 0:
        if (scrollRatio <= 0.8) {
          // in
          objs.messageA.style.opacity = calcValues(values?.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(${calcValues(values?.messageA_translateY_in, currentYOffset)}%, 0, 0)`;
          objs.imgA.style.opacity =  calcValues(values?.imgA_opacity_in, currentYOffset);
          objs.imgA.style.transform = `translate3d(-${calcValues(values?.imgA_translateY_in, currentYOffset)}%, 0, 0)`;
          objs.imgB.style.opacity = calcValues(values?.imgB_opacity_in, currentYOffset);
          objs.imgB.style.transform = `translate3d(${calcValues(values?.imgA_translateY_in, currentYOffset)}%, 0, 0)`;
          objs.imgC.style.opacity = 0;
          objs.messageB.style.opacity = 0;
        }
        break;

      case 1:

        if(scrollRatio <= 0.3) {
          objs.imgC.style.opacity =  calcValues(values?.imgC_opacity_in, currentYOffset);
          objs.imgC.style.transform = `translate3d(0,${calcValues(values?.imgC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values?.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(${calcValues(values?.messageB_translateY_in, currentYOffset)}%, 0, 0)`;
          objs.messageA.style.opacity = calcValues(values?.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(${calcValues(values?.messageA_translateY_out, currentYOffset)}%, 0, 0)`;
        } 
        else {
          objs.imgC.style.opacity =  calcValues(values?.imgC_opacity_out, currentYOffset);
          objs.imgC.style.transform = `translate3d(0,${calcValues(values?.imgC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values?.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d( ${calcValues(values?.messageB_translateY_out, currentYOffset)}%, 0, 0)`;
        }
        if(scrollRatio <= 0.9) {
          // 사진 2개 없애기, 그 이후에 messageb랑 imbC없애기
          objs.imgA.style.opacity =  calcValues(values?.imgA_opacity_out, currentYOffset);
          objs.imgA.style.transform = `translate3d(${calcValues(values?.imgA_translateY_out, currentYOffset)}%, 0, 0)`;
          objs.imgB.style.opacity =  calcValues(values?.imgB_opacity_out, currentYOffset);
          objs.imgB.style.transform = `translate3d(${calcValues(values?.imgB_translateY_out, currentYOffset)}%, 0, 0)`;

          ////다음 페이지에 보일 것들 만들기
          if(scrollRatio <= 0.7) {
            objs.imgD.style.opacity =  calcValues(values?.imgD_opacity_in, currentYOffset);
            objs.imgE.style.opacity =  calcValues(values?.imgE_opacity_in, currentYOffset);
            objs.imgD.style.transform = `translate3d(0, ${calcValues(values?.imgD_translateY_in, currentYOffset)}%, 0)`;
            objs.imgE.style.transform = `translate3d(${calcValues(values?.imgE_translateY_in, currentYOffset)}%, 0, 0)`;
          }
          if(scrollRatio <= 0.8) {
            objs.messageD.style.opacity = calcValues(values?.messageD_opacity_in, currentYOffset);
            objs.messageD.style.transform = `translate3d(${calcValues(values?.messageD_translateY_in, currentYOffset)}%, 0, 0)`;
          }
          if(scrollRatio <= 0.95) {
            objs.messageE.style.opacity = calcValues(values?.messageE_opacity_in, currentYOffset);
            objs.messageE.style.transform = `translate3d(-${calcValues(values?.messageE_translateY_in, currentYOffset)}%, 0, 0)`;
          }
        }
        break;
      }
    };

    const calcValues = (values: any, currentYOffset: number) => {
      let rv;
  
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      const scrollRatio = currentYOffset / scrollHeight; //현재씬에서 스크롤된 범위를 비율로 구하기
  
      if (values.length === 3) {
        //start~end 사이에 애니메이션 실행
        //부분 스크롤된 비율을 반영
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
  
        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
          rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else if (currentYOffset < partScrollHeight) {
          rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
          rv = values[1];
        }
      }
  
      else {
        //현재 씬의 전체범위에서 현재 스크롤된 비율을 곱한것
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }
      return rv;
  
    };

    const scrollLoop = () => {
      enterNewscene = false;
      prevScrollHeight = 0;
      
      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight; 
      }
  
      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        enterNewscene = true;
        currentScene++;
      }
  
      if (yOffset < prevScrollHeight) {
        enterNewscene = true;
        if (currentScene === 0) {return;} //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
        currentScene--;
      }
  
      if (enterNewscene) {return;} 
  
      playAnimation();
    };
  
    // window.addEventListener('scroll', () => {
    //   yOffset = window.pageYOffset;
    //   scrollLoop();
    // });

    // window.addEventListener('load', () => {
    //   setLayout();
    // }); //로드됬을 때 
    // window.addEventListener('resize', setLayout);
    // setLayout();

    window.onscroll = () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    };

    window.onload = () => {
      setLayout();
    };

    window.onresize = setLayout;
    setLayout();

    return () => {
      // process.removeAllListeners('scroll');
      // process.removeAllListeners('load');
      // process.removeAllListeners('resize');
      window.onscroll = null;
      window.onload = null;
      window.onresize = null;
    };
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
          <div className='scroll-section1-search-img'/>
        </div>
        <div className='scroll-section1-right'>
          <div className='scroll-section1-map-img'/>
          <div className='scroll-section1-right-bottom'>
            <div className='scroll-section1-thinking-img'/>
            <div className='scroll-section1-message-b'>
            내 위치 주변의 물품들을 확인해 보세요!
            </div>
          </div>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-2">
        <div className='scroll-section2-left'>
          <div className='scroll-section2-register-img'/>
        </div>
        <div className='scroll-section2-right'>
          <div className='scroll-section2-img'>
            <div className='scroll-section2-auction-img'/>
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
