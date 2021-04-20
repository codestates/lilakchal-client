import { ImSearch } from 'react-icons/im';
interface props {
  
  handleSubmit: () => void
}

const SearchBtn = ({handleSubmit}: props): JSX.Element => {
  return (
    <div className='submit-button' onClick={()=>handleSubmit()}>
      <ImSearch className= 'searchbtn'/>
    </div>
  );
};

export default SearchBtn;
