import React, { useEffect, useState } from 'react';
import styles from "./CharactersCard.module.css"

interface Character {
  nome: string;
  id: string;
  nascimento: string;
  morte: string;
  raca: string;
  conjuge: string;
  reino: string;
  wiki: string;
}

export default function CharactersCard({ nome, id, nascimento, morte, raca, conjuge, reino, wiki }: Character) {
  const [color, setColor] = useState<string>('#fff')
  function openInNewTab(url: string) {
    if (url !== undefined) {
      window.open(url, '_blank')?.focus();
    }
  }

  useEffect(() => {
    if (raca == "Orc") {
      setColor("#8B9144")
    } else if (raca == "Dragon") {
      setColor("#B84336")
    } else if (raca == "Elf") {
      setColor("#002800")
    } else if (raca == "Maiar") {
      setColor("#00008B")
    } else if (raca == "Human") {
      setColor("#D47382")
    } else if (raca == "Dwarf") {
      setColor("#864D3B")
    } else if (raca == "Hobbit") {
      setColor("#F6BE00")
    } else if (raca == "Great Spiders") {
      setColor("#990000")
    } else if (raca == "Werewolves") {
      setColor("#222")
    } else if (raca == "God") {
      setColor("#A6B9E5")
    }

  }, [raca])

  return (
    <button style={{ backgroundColor: color }} className={styles.card} onClick={() => {
      openInNewTab(wiki)
    }}>
      <img src={require(`../../assets/${raca}.png`)} alt={raca} />
      <h1>{nome}</h1>
      <p>Nascimento: {nascimento}</p>
      <p>Morte: {morte}</p>
      <p>Raça: {raca == "Human" ? "Humano" : raca}</p>
      <p>Cônjuge: {conjuge}</p>
      <p>Reino: {reino}</p>
    </button>
  );
}
