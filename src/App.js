import { useEffect } from 'react';
import './App.css';
import axios from 'axios'
import { useState } from 'react';

function App() {
  const [users, setUser] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(()=>{
    fetchNextUser(pageNumber).then((data) => {
      setUser((prevUsers)=>{
        const newUsers = [...prevUsers, ...data]
        const uniqueUsers = Array.from(new Set(newUsers.map(user => user.id)))
                          .map(id => newUsers.find(user => user.id === id))
        return uniqueUsers
      })
    })
  }, [pageNumber])
  console.log(users);

  const fetchNextUser = async (pageNumberToken) => {
    // const response = await fetch(`https://picsum.photos/v2/list?page=${pageNumberToken}&limit=10`)
    // const fetchResponseData = await response.json()
    // return fetchResponseData
    const response =  await axios.get(`https://picsum.photos/v2/list?page=${pageNumberToken}&limit=10`)
    return response.data
  }

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber+1)
  }

  return (
    <div className="App">
      <div className='gallery'>
      {users.map((user) => 
          <img 
          key={user.id}
          alt={user.author}
          src={user.download_url}
          height={400}
          width={400}
          />
      )}

      </div>
      <button className='load' onClick={loadMore}>Load</button>
    </div>
  );
}

export default App;
