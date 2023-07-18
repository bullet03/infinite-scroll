import React, { useEffect, useReducer } from "react";
import { Urls, Comment, FetchAction, FetchStatus } from "../@types";

function reducer(state: FetchStatus, action: FetchAction): FetchStatus {
  switch (action.type) {
    case 'loading':
      return {
        loading: true, success: false, error: false
      }
    case 'error': 
      return {
        loading: false, success: false, error: true
      }
    case 'success': 
      return {
        loading: false, success: true, error: false
      }
    default:
      return state
  }
}

const STATUSES = {
  loading: false,
  error: false,
  success: false
}
function useFetch(setData: React.Dispatch<React.SetStateAction<Comment[]>>, url: Urls) {
  const [status, dispatch]: [status: FetchStatus, dispatch: React.Dispatch<FetchAction>] = useReducer(reducer, STATUSES);
  
  useEffect(() => {
    async function fetchData() {
      dispatch({type: 'loading'});
      try {
        const res = await fetch(url);
        if (res.ok) {
          const jsonRes = await res.json() as Comment[];
          setData(jsonRes);
          dispatch({type: 'success'})
        }  else {
          dispatch({type: 'error'});
        }
      } catch(error) {
        dispatch({type: 'error'});
      }
    }

    void fetchData();
  }, [url, setData]);
  
  return status;
}

export { useFetch };
