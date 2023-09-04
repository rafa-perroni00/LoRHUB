import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <img src={require("../../assets/anelLogo.png")} alt='Anel de O Senhor dos Aneis'/>
        <h1>LoR HUB</h1>
      </div>
      <ul className={styles.nav}>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/movies"}>Filmes</Link></li>
        <li><Link to={"/books"}>Livros</Link></li>
        <li><Link to={"/characters"}>Personagens</Link></li>
      </ul>
    </div>
  );
}
