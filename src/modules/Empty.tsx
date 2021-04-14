import React from 'react';
import errImg from '../res/error.png';

interface IEmpty {
  emptyTitle: string,
  emptyText: string
}

const Empty: React.FC<IEmpty> = ({ emptyTitle, emptyText}) => {

  return (
    <>
      <img className="empty-img" src={errImg} alt=""/>
      <div className="empty-title">{emptyTitle}</div>
      <div className="empty-text">{emptyText}</div>
    </>
  );
};

export default Empty;