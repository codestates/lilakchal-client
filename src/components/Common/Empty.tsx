import React from 'react';
import errImg from '../../res/empty.png';
import './style/Empty.scss';

interface IEmpty {
  emptyTitle: string,
  emptyText: string
}

const Empty: React.FC<IEmpty> = ({ emptyTitle, emptyText}) => {

  return (
    <div className="empty-container">
      <div className="empty-animation-text">?</div>
      <img className="empty-img" src={errImg} alt=""/>
      <div className="empty-title">{emptyTitle}</div>
      <div className="empty-text">{emptyText}</div>
    </div>
  );
};

export default Empty;