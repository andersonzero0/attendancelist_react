import './style.css';

export function Card({name, time}) {

    return (
        <div className="card">
            <strong class="namePerson">{name}</strong>
            <small>{time}</small>
        </div>
    )
    
}