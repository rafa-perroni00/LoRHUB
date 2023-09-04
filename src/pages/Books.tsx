import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import styles from "./Books.module.css"
import axios from 'axios';
import BooksCard from '../components/BooksCard/BooksCard';
import ReactLoading from 'react-loading';


interface BookInfos {
  id: string;
  name: string;
}

export default function Books() {
  const [books, setBooks] = useState<BookInfos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: "Bearer totbatka_C6KGg0JQi43",
        }
      };
      try {
        const response = await axios.get('https://the-one-api.dev/v2/book', config);
        setBooks(response.data.docs);
        console.log(response.data.docs)
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchAllBooks();
  }, []);
  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        {!isLoading ? books.map((book, i) => (
          <BooksCard nome={book.name} capa={book.name} id={book.id} key={i} />
        )) :
          <ReactLoading type='spin' color={"#FBECA3"} height={300} width={300} />
        }
      </div>
    </Fragment>
  );
}
