import { useState, useEffect } from 'react';
import FichaProgramacion from './FichaProgramacion';
import { getFichas } from '../service/fichaService';
import { getJornadas } from '../service/jornadaService';
import { getInstructores } from '../service/intructorService'; 
import { getAllAsignaciones } from '../service/asignacionService';

const Pruebas = () => {
    const [fichas, setFichas] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);
    const [instructores, setInstructores] = useState([]);
    const [jornadas, setJornadas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedFichas = await getFichas();
                setFichas(fetchedFichas);

                const fetchedJornadas = await getJornadas();
                setJornadas(fetchedJornadas);

                const fetchedInstructores = await getInstructores();
                setInstructores(fetchedInstructores);

                const fetchedAsignaciones = await getAllAsignaciones();
                setAsignaciones(fetchedAsignaciones);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchData();
    }, []);

    return (
      <div>
          {fichas.map((ficha) => {
              return (
                  <FichaProgramacion
                      key={ficha.codigo} 
                      ficha={ficha}
                      asignaciones={asignaciones}
                      instructores={instructores}
                      jornadas={jornadas}
                  />
              );
          })}
      </div>
  );
  
}

export default Pruebas;
