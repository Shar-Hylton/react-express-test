import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());
  const controllerRef = useRef(null);

    const fetchData = useCallback(async () => {
        if (!url) return;
        if(controllerRef.current){
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError(null);

        if (cacheRef.current.has(url)){
            setData(cacheRef.current.get(url));
            setLoading(false);
            return;
        }

        try{
            const response = await axios.get(url, {signal: controller.signal});
            cacheRef.current.set(url, response.data);
            setData(response.data);
        } catch(err){
            if (err.name !== "CanceledError"){
                setError(err);
            }
        }finally{
            setLoading(false);
        }

    }, [url]);

  useEffect(() => {
    fetchData();
    return ()=>{
        if(controllerRef.current){
            controllerRef.current.abort();
        }
    };
}, [fetchData]);

  return { data, loading, error, reFetch: fetchData };
}
