import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import styles from "./Characters.module.css"
import axios from 'axios';
import CharactersCard from '../components/CharactersCard/CharactersCard';
import ReactLoading from 'react-loading';
import FilterButton from '../components/FilterButton/FilterButton';


interface CharactersInfos {
  id: string;
  name: string;
  realm: string;
  race: string;
  spouse: string;
  wikiUrl: string;
  gender: string;
  birth: string;
  death: string;
}

interface CharactersInfosAPI {
  id: string;
  name: string;
  realm: string;
  race: string;
  spouse: string;
  wikiUrl: string;
  gender: string;
  birth: string;
  death: string;
  hair: string;
  height: string;
}

export default function Characters() {
  const [characters, setCharacters] = useState<CharactersInfos[]>([]);
  const [defaultCharacters, setDefaultCharacters] = useState<CharactersInfos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [races, setRaces] = useState<string[]>([]);
  const [filter, setFilter] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: "Bearer totbatka_C6KGg0JQi43",
        }
      };
      try {
        const response = await axios.get('https://the-one-api.dev/v2/character?sort=name:asc', config);
        const cleanUp = response.data.docs.filter((char: CharactersInfosAPI) => {
          if (
            char.race != "NaN" &&
            char.name != "" &&
            char.name != "MINOR_CHARACTER" &&
            char.race != "" &&
            char.wikiUrl != "" &&
            char.realm != "" &&
            char.realm != "NaN"
          ) {
            return char;
          }
        })

        const transformRaces = cleanUp.map((char: CharactersInfosAPI) => {
          if (char.race.includes("Orc") || char.race == "Uruk-hai" || char.race == "Black Uruk") {
            return { ...char, race: "Orc" }
          } else if (char.race.includes("Hobbit")) {
            return { ...char, race: "Hobbit" }
          } else if (char.race == "Half-elven") {
            return { ...char, race: "Elf" }
          } else if (char.race.includes("Men")) {
            return { ...char, race: "Human" }
          } else if (char.race == "Urulóki" || char.race == "Dragons") {
            return { ...char, race: "Dragon" }
          } else if (char.race == "Ainur") {
            return { ...char, race: "Maiar" }
          } else {
            return char
          }
        })

        const transformSpouse = transformRaces.map((char: CharactersInfosAPI) => {
          if (char.spouse == "Unnamed wife" || char.spouse.includes("Unknown") || char.spouse == "Unnamed Wife") {
            return { ...char, spouse: "Desconhecido" }
          } else if (char.spouse == "" || char.spouse == "NaN" || char.spouse == "None" || char.spouse.includes("none")) {
            return { ...char, spouse: "Não tem" }
          } else {
            return char
          }
        })

        const transformDeath = transformSpouse.map((char: CharactersInfosAPI) => {
          if (char.death.includes("Unknown") || char.death == "") {
            return { ...char, death: "Desconhecido" }
          } else if (char.death.includes("Still alive") || char.death.includes("Still Alive") || char.death == "NaN") {
            return { ...char, death: "..." }
          } else {
            return char
          }
        })

        const transformBirth = transformDeath.map((char: CharactersInfosAPI) => {
          if (char.birth.includes("NaN") || char.birth == "") {
            return { ...char, birth: "Desconhecido" }
          } else {
            return char
          }
        })

        const cleanUpData = transformBirth.map((char: CharactersInfosAPI) => {
          return {
            name: char.name,
            realm: char.realm,
            race: char.race,
            spouse: char.spouse,
            wikiUrl: char.wikiUrl,
            gender: char.gender,
            birth: char.birth,
            death: char.death,
          }
        })
        var racesArray: string[] = []
        cleanUpData.forEach((char: CharactersInfos) => {
          if (!racesArray.includes(char.race)) {
            racesArray.push(char.race)
          }
        })

        setRaces(racesArray)
        setCharacters(cleanUpData);
        setDefaultCharacters(cleanUpData)
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchAllCharacters();
  }, []);

  const searchForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    var arrayAux = new Array(10).fill(false)
    setFilter(arrayAux)
    setSearchInput(e.target.value);
    const searchData = defaultCharacters.filter((char: CharactersInfos) => {
      const capsName = char.name.toUpperCase()
      if (capsName.includes(e.target.value.toUpperCase())) {
        return char
      }
    })
    setCharacters(searchData)
  }

  const changeStateFilter = (i: number) => {
    setSearchInput("");

    if (filter[i] == true) {
      var arrayAux = new Array(10).fill(false)
      setCharacters(defaultCharacters)
    } else {
      var arrayAux = new Array(10).fill(false)
      arrayAux[i] = true
      const filterData = defaultCharacters.filter((char: CharactersInfos) => {
        if (char.race == races[i]) {
          return char
        }
      })
      setCharacters(filterData)
    }

    setFilter(arrayAux)
  }

  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        <form className={styles.searchBar}>
          <input type="text" placeholder="Buscar..." value={searchInput} onChange={(text) => { searchForm(text) }} className={styles.searchInput} />
          <button className={styles.btnImg}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill='#FBECA3'>
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </form>
        <div className={styles.filters}>
          {races.map((race, i) => (
            <FilterButton race={race} changeState={() => { changeStateFilter(i) }} filterRace={filter[i]} key={i} />
          ))}
        </div>
        <div className={styles.containerData}>
          {!isLoading ? characters.map((char, i) => (
            <CharactersCard
              nome={char.name}
              nascimento={char.birth}
              morte={char.death}
              raca={char.race}
              conjuge={char.spouse}
              reino={char.realm}
              id={char.id}
              wiki={char.wikiUrl}
              key={i}
            />
          )) :
            <ReactLoading type='spin' color={"#FBECA3"} height={300} width={300} />
          }
        </div>
      </div>
    </Fragment>
  );
}
