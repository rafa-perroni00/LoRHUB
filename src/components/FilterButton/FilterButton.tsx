import React, {useEffect, useState} from 'react';
import styles from './FilterButton.module.css'

interface buttonRace{
  race: string;
  filterRace: boolean;
  changeState: () => void;
}

export default function FilterButton({race, filterRace, changeState}: buttonRace) {
  const [color, setColor] = useState<string>('#fff')

  useEffect(() => {
    if(race == "Orc"){
      setColor("#8B9144")
    }else if(race == "Dragon"){
      setColor("#B84336")
    }else if(race == "Elf"){
      setColor("#002800")
    }else if(race == "Maiar"){
      setColor("#00008B")
    }else if(race == "Human"){
      setColor("#D47382")
    }else if(race == "Dwarf"){
      setColor("#864D3B")
    }else if(race == "Hobbit"){
      setColor("#F6BE00")
    }else if(race == "Great Spiders"){
      setColor("#990000")
    }else if(race == "Werewolves"){
      setColor("#222")
    }else if(race == "God"){
      setColor("#A6B9E5")
    }
    
  }, [race])
  return (
    <button className={styles.btnRace} style={{backgroundColor: color, opacity: filterRace ? 0.5 : 1}} onClick={changeState}>
      <img src={require(`../../assets/${race}.png`)}/>
    </button>
  );
}
