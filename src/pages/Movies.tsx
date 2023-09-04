import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import styles from "./Movies.module.css"
import axios from 'axios';
import ReactLoading from 'react-loading';
import MoviesCard from '../components/MoviesCard/MoviesCard';


interface MovieInfos {
  id: string;
  name: string;
  academyAwardNominations: string;
  academyAwardWins: string;
  boxOfficeRevenueInMillions: string;
  budgetInMillions: string;
  rottenTomatoesScore: string;
  runtimeInMinutes: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<MovieInfos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: "Bearer totbatka_C6KGg0JQi43",
        }
      };
      try {
        const response = await axios.get('https://the-one-api.dev/v2/movie', config);
        setMovies(response.data.docs);
        console.log(response.data.docs)
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchAllMovies();
  }, []);
  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        {!isLoading ? movies.map((movie, i) => (
          <MoviesCard
            nome={movie.name}
            id={movie.id}
            cartaz={movie.name}
            indicacoes={movie.academyAwardNominations}
            premios={movie.academyAwardWins}
            ingressos={movie.boxOfficeRevenueInMillions}
            orcamento={movie.budgetInMillions}
            nota={parseFloat(movie.rottenTomatoesScore).toFixed(2)}
            tempo={(parseInt(movie.runtimeInMinutes) / 60).toFixed(2)}
            key={i}
          />
        )) :
          <ReactLoading type='spin' color={"#FBECA3"} height={300} width={300} />
        }
      </div>
    </Fragment>
  );
}
