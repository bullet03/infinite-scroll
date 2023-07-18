import { useState, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { List } from "../List";
import { Urls, Comment} from "../../@types";
import { Spinner } from "../Spinner";
import { PageNotFound } from "../PageNotFound";
import styles from "./styles.module.css";

const URL = Urls.comments;
const VIEW_IN_SCROLL = 150;
const STEP = 50;

function ListItems() {
  const [data, setData] = useState<Comment[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);
  const [indexes, setIndexes] = useState([0, 50]);

  const { loading, success, error} = useFetch(setData, URL);
  useIntersectionObserver({
    setIndexes,
    indexes,
    ulRef,
    data,
    VIEW_IN_SCROLL,
    STEP,
  });
  
  const [firstIndex, lastIndex] = indexes;
  const dataSliced = data.slice(firstIndex, lastIndex);
  
  return (
    <>
      { loading && <Spinner /> }
      { error && <PageNotFound /> }
      { success && 
        <ul className={styles.noBullets} ref={ulRef}>
          {dataSliced.map((singleEl) => {
            return <List key={singleEl.id} singleEl={singleEl} />;
          })}
        </ul>
      }
    </>
  );
}

export { ListItems };
