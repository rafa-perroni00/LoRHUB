import React, { Fragment  } from 'react';
import styles from './Home.module.css'
import Header from '../components/Header/Header';


export default function Home() {
  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h1>Sobre</h1>
          <p>Esse projeto foi feito usando ReactJS e suas bibliotecas, com principal integração com a One API, que é a API baseada no mundo de O Senhor dos Aneis. O projeto foi desenvolvido com o intuito de mostrar as capacidades de desenvolvimento usando HTML, CSS, Javascript e integração com APIs.</p>
        </div>
      </div>
    </Fragment>
  );
}

