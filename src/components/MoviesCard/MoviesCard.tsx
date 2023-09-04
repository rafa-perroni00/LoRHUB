import React from 'react';
import styles from "./MoviesCard.module.css"

interface Movie {
  nome: string;
  cartaz: string;
  id: string;
  indicacoes: string;
  premios: string;
  ingressos: string;
  orcamento: string;
  nota: string;
  tempo: string;
}

export default function MoviesCard({ nome, cartaz, id, indicacoes, premios, ingressos, orcamento, nota, tempo }: Movie) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <h1>{nome}</h1>
          <img src={require(`../../assets/${cartaz}.png`)} alt={'Capa do livro' + nome} />
        </div>
        <div className={styles.cardBack}>
          <h1>{nome}</h1>
          <p>Indicações: {indicacoes}</p>
          <p>Premiações: {premios}</p>
          <p>Venda de ingressos: U${ingressos} M</p>
          <p>Orçamento: U${orcamento} M</p>
          <p>Nota: {nota}</p>
          <p>Duração: {tempo} H</p>
        </div>
      </div>
    </div>
  );
}
