import React from 'react'
import "./Profile.css"
function Profile() {
  return (
    <div className="profile-container">
    <h1>Martin Toomas Kripsaar </h1>
    <ul>
        <li>Lemmikmängud: Final Fantasy XIV, Deltarune, Undertale, Hearts of Iron 4, Celeste.</li>
        <li>Sport: Jooksmine, jalgratta sõitmine ja jõusaal</li>
        <li>Praegune mäng mida mängin: Final Fantasy XIV</li>
        <li>Praegune anime mida vaatan: Bocchi the Rock!</li>
    </ul>
    E-meil: <input type='email' />
    Tekstiväli: <textarea></textarea>
    </div>
  )
}

export default Profile