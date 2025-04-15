import gif from "@/assets/how-to-play.gif";

const Info = () => {
  return (
    <div>
      <p>
        Usá el ratón o el dedo para conectar las letras en la grilla para formar
        palabras.
      </p>
      <img src={gif} alt="Cómo jugar" width={300} />
      <ul>
        <li>
          Podés conectar cualquier par de letras adyacentes, incluso
          diagonalmente
        </li>
        <li>No podés usar la misma casilla más de una vez por palabra</li>
        <li>Tu línea PUEDE cruzarse a sí misma</li>
        <li>Tu palabra tiene que tener al menos 4 letras</li>
      </ul>
      <h1>Puntuación</h1>
      <p>
        Cuando crees una palabra, recibirás puntos dependiendo de cuán larga
        sea:
      </p>
      <ul>
        <li>4 letras: 1 punto</li>
        <li>5 letras: 4 puntos</li>
        <li>6 letras: 6 puntos</li>
        <li>7 letras: 8 puntos</li>
        <li>8 letras: 10 puntos</li>
        <li>9 letras: 12 puntos</li>
        <li>10 letras: 14 puntos</li>
        <li>11 letras: 16 puntos</li>
      </ul>
      <p>etc.</p>
      <i>
        Consejo: Cada tablero tendrá una palabra que tiene al menos 8 letras.
        Recordá prestarle atención!
      </i>
      <p>
        Conseguí puntos para subir de nivel. Intentá conseguir el nivel máximo
        cada día!
      </p>
      <h1>Más</h1>
      <p>
        Wordhuntle se reinicia todos los días a las 8pm EST. Volvé cada día para
        jugar un tablero nuevo!
      </p>
    </div>
  );
};

export default Info;
