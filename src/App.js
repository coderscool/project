import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {

  const [ticket, setTicket] = useState(true);
  const [list, setList] = useState([]);
  const [job, setJob] = useState();
  const [cout, setCout] = useState(10000000);
  const [pay, setPay] = useState(0)
  
  const randomNumber = (min, max) => {
    return min + Math.trunc(Math.random() * (max - min));
  }
  

  const handleSubmit = () => {
    if ((job > cout) || (list.length >= 1)) {
      return
    }else {
      setList(prev => [...prev, {id:list.length + 1, cost: job}])
      setJob('')
    }
  }

  const handleDelete = (jobs) => {
     const index = list.findIndex(x => x.id === jobs.id )
     if ( index < 0) return;

     const newList = [...list];
     newList.splice(index, 1);
     setList(newList)
  }


  const handleTurn = (jobs) => {
    setPay(randomNumber(10000,99999))
    // console.log(pay)
    // console.log(ticket)
     if((pay % 2 === 0 && ticket === true) || (pay % 2 === 1 && ticket === false)) {
       setCout(cout + parseInt(jobs.cost))
       console.log('win')
     }else {
       setCout(cout - parseInt(jobs.cost))
       console.log('lose')
     }
  }

  console.log(cout)

  const handleClick = () => {
       if(ticket === true) {
        setTicket(false)
       } else {
         setTicket(true)
       }
  }

  console.log(list.length)

  return (
    <header className='bcgr'>
    <div className='title'>CHÚC MỪNG NĂM MỚI</div>
    <div className='body'>
    <div>
      <input type="button" className='choice' onClick={handleClick}/>
      {ticket === true ? <div className='cuoc1'>BẠN CHỌN TÀI</div> : <div className='cuoc2'>BẠN CHỌN XỈU</div>}
      <div className='law'>
        <p className='p1'>LUẬT CHƠI</p>
        <p className='p2'>Nếu bạn chọn xỉu và quay vào số lẻ hoặc bạn chon tài và quay vào số chẵn thì bạn thắng</p>
      </div>
    </div>
    <div>
         <p className='count'>SỐ TIỀN CỦA BẠN LÀ: <span>{cout}</span> VND</p>
         <div className='nhap'>NHẬP SỐ TIỀN BẠN MUỐN CƯỢC</div>
         <input className='text' value={job} onChange={e => setJob(e.target.value)}/>
         <button className='add' onClick={handleSubmit}>Xác nhận</button>

        {list.map((jobs) => (
          <div className='body1'>
            <div className='cuoc4'>
             <div className='cuoc3'>Bạn đã cược:  <span>{jobs.cost}</span>  VND</div>
             <button className='xoa' onClick={() => handleDelete(jobs)}>X</button>
            </div>
            <div className='cuoc5'>
             <button className='quay' onClick={() => handleTurn(jobs)}>Quay số</button>
             <div className='lucky'>
              <p>SỐ MAY MẮN LÀ: <span>{pay}</span></p>
             </div>
            </div>
          </div>
        ))}
      
      {cout - job > 0 ? <p className='ok'>BẠN ĐỦ TIỀN ĐỂ ĐẶT CƯỢC</p> : <p className='ok'>BẠN KHÔNG ĐỦ TIỀN CHƠI </p>}
    </div>
    </div>
    </header>
  );
}

export default App;
