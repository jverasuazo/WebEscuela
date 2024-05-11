import React, { useState, useEffect } from 'react';
import EventCalendar from './EventCalendar';
import EventList from './EventList';
import Publications from './Publications';
import MantenedorPublicaciones from './MantenedorPublicaciones';
import axios from 'axios'; // Import axios for making API requests
import LogoSection from './LogoSection';
import Header from './Header';
import Eventos from './Eventos'; 
import Footer from './Footer';
import './App.css'; // Importar el CSS aquí
import PublicacionesPrivadas from './PublicacionesPrivadas';
import Usuarios from './Usuarios';
function App() {
  const [events, setEvents] = useState([]);
  const [publications, setPublications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario ha iniciado sesión
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario logeado


  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleDateChange = async (date) => {
    console.log('Fecha seleccionada:', date);

    const formattedDate = date.toISOString().slice(0, 10);
    console.log('Fecha seleccionada:', formattedDate);
    try {
      const response = await axios.get(`http://localhost:3001/eventos?fecha=${formattedDate}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/publicaciones/publicas');
        setPublications(response.data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    };

    fetchPublications();
  }, []);


  
  // Función para manejar el inicio de sesión
  const handleLogin = async (username, password) => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      const userData = data.user; // Datos del usuario devueltos por el servidor
      setUser(userData); // Guardar los datos del usuario en el estado
      setIsLoggedIn(true);
    } else {
      alert('Login failed: ' + data.message);
    }
  };

  useEffect(() => {
    // Optional: Fetch initial events on component mount (if needed)
  }, []);

  return (
    <div className="App">
       <Header isLoggedIn={user !== null} handleLogin={handleLogin} handleLogout={handleLogout} />
      {user  ? (
        <>
          <div className="tab-container">
            <div  >  
              <Eventos usuario={user} /> 
              <MantenedorPublicaciones usuario={user} /> 
              {user.id_rol==1  ? (
           

           <div  >  
             <Usuarios usuario={user} /> 
             
           </div>
               
           ) : ( 
             
               <div>
                 
               </div>
          
           )}

            </div>
           
           
            <div  > 
              <PublicacionesPrivadas usuario={user} /> 
              </div>
            
              


          </div>
        </>
      ) : ( 
        <>
          <div className="non-user-section">
          <div>
            <EventList events={events} />
          </div>
          <div>
            <EventCalendar onDateChange={handleDateChange} />
          </div>

     
          </div>

          <div>
            <Publications publications={publications} />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;