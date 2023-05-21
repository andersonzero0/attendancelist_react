import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Card } from '../../components/Card';
import './style.css';

export function Home() {
  const [people, setPeople] = useState([])
  const [peopleName, setPeopleName] = useState('')
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddPeople() {

    const alert_emptyInput = document.getElementById('alert_emptyInput');
    const inputName = document.getElementById('inputName');

    if(peopleName.trim() == '') {

      alert_emptyInput.style = "opacity: 1";

    } else {

      alert_emptyInput.style = "opacity: 0";

      const newPeople = {
        name: peopleName,
        time: new Date().toLocaleString('pt-br', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }

      setPeople(prevState => [...prevState, newPeople])

      inputName.value = "";
      setPeopleName("");
      
    }

  }

  useEffect(() => {
    fetch("https://api.github.com/users/andersonzero0")
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])
  
  return (
      <div className="conteiner">

        <header>
          <h1>ATTENDANCE LIST</h1>

          <div>
            <strong id='nameuser'>{user.name}</strong>
            <img src={user.avatar} alt="" />
          </div>
        </header>
        

        <input
          id="inputName"
          type="text" 
          onChange={e => setPeopleName(e.target.value)} 
          placeholder="Type your name here..."
        />
        
        <button type="button" onClick={handleAddPeople}>
          <UserPlus/>
        </button>

        <small id="alert_emptyInput">empty field is not allowed!</small>

        <h2>PEOPLE</h2>

        {
          /* people.map(people => <Card name={people.name} time={people.time}/>) */
          
          people == '' ? "Add people to your list!" : people.map(people => (

            <Card 
              key={people.time}
              name={people.name} 
              time={people.time}
            />

          ))
          
        }

      </div>
  )
}