
import DataTable from 'react-data-table-component'
import './App.css'
import { useEffect, useState } from 'react'

interface columnsType{
  name:string,
  selector: (row:dataType) => string | number,
}
interface dataType{
  title:string,
  place_of_origin : string,
  artist_display:string,
  inscriptions:string,
  date_start : number,
  date_end:number
  
}
const App : React.FC = () => {

  const [records , setRecords] = useState<dataType>();
  const [selectedRows, setSelectedRows] = useState<number[]| string>([]);
  const fetchData = async() => {
    const data = await fetch('https://api.artic.edu/api/v1/artworks?page=1');
    const json = await data.json();
    setRecords(json.data);
     setSelectedRows(Array.from({ length: 20 }, (_, index) => index));
  }
  useEffect(() => {
    fetchData();
  } , [])
  const columns : columnsType[] = [
    {
      name:'Title',
      selector: (row:dataType) =>row.title
    },
    {
      name:'Place Of Origin',
      selector: (row:dataType) =>row.place_of_origin
    },
    {
      name:'Artist display',
      selector: (row:dataType) =>row.artist_display
    },
    {
      name:'Inscriptions',
      selector: (row:dataType) =>row.inscriptions
    },
    {
      name:'Start',
      selector: (row:dataType) =>row.date_start
    },
    {
      name:'End',
      selector: (row:dataType) =>row.date_end
    },
  ]
  const [show , setShow] = useState(false);
  const handleArrowClick = () => {
    setShow(!show);
    console.log(selectedRows);
  }

  const inputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    const enteredNum = e.target.value;
    setSelectedRows(enteredNum);
  }
  return (
    <div className='container'>
      <div className='arrow'>
        <img onClick={handleArrowClick} className='arrow-img' src="./arrow.png" alt="arrow" />
        {show && <div className='input-container'>
          <input className='input-box' type="text" placeholder='Select rows...' onChange={inputValue}/>
          <button className='submit' onClick={handleArrowClick}>Submit</button>
        </div>}
      </div>
      <DataTable 
      columns={columns}
      data = {records}
      selectableRows
      fixedHeader
      pagination
      selectedRows = {selectedRows}
      ></DataTable>
    </div>
  )
}

export default App
