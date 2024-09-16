
import DataTable from 'react-data-table-component'
import './App.css'
import { useEffect, useState } from 'react'

interface columnsType{
  name:string,
  selector: (row:dataType) => string | number,
}
interface dataType{
  id:number,
  title:string,
  place_of_origin : string,
  artist_display:string,
  inscriptions:string,
  date_start : number,
  date_end:number
  
}
const App : React.FC = () => {

  const [records , setRecords] = useState<dataType>();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [inputValue , setInputValue] = useState('');
  const [show , setShow] = useState(false);
  const fetchData = async() => {
    const data = await fetch('https://api.artic.edu/api/v1/artworks?page=1');
    const json = await data.json();


    const formattedData = json.data.map((item:dataType, index:number) => ({
      id:index,
      title:item.title,
      place_of_origin : item.place_of_origin,
      iscriptions :item.inscriptions,
      date_start:item.date_start,
      date_end : item.date_end,
    }));
    setRecords(formattedData);
  }
  useEffect(() => {
    fetchData();
  } , [])

  const handleArrowClick = () => {
    setShow(!show);
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const handleSubmit = () => {
    const numberOfRows = parseInt(inputValue , 10);

    if(!isNaN(numberOfRows) && numberOfRows > 0 || records){
      const newSelectedRows = Array.from({length:Math.min(numberOfRows)} , (_, index) => index);
      setSelectedRows(newSelectedRows);
    }
    setShow(false);
  }
  const handleRowSelected = (row:dataType) => {
    return selectedRows.includes(row.id);
  }

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


  return (
    <div className='container'>
      <div className='arrow'>
        <img onClick={handleArrowClick} className='arrow-img' src="./arrow.png" alt="arrow" />
        {show && <div className='input-container'>
          <input className='input-box' type="text" placeholder='Select rows...' onChange={handleInputChange}/>
          <button className='submit' onClick={handleSubmit}>Submit</button>
        </div>}
      </div>
      <DataTable 
      columns={columns}
      data = {records}
      selectableRows
      fixedHeader
      pagination
      selectableRowSelected={row => handleRowSelected(row)}
      ></DataTable>
    </div>
  )
}

export default App
