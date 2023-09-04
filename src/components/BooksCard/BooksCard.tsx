import React from 'react';
import styles from "./BooksCard.module.css"

interface Book {
  nome: string;
  capa: string;
  id: string;
}

export default function BooksCard({ nome, capa, id }: Book) {
  return (
    <button className={styles.card}>
      <h1>{nome}</h1>
      <img src={require(`../../assets/${capa}.jpg`)} alt={'Capa do livro' + nome} />
    </button>
  );
}
