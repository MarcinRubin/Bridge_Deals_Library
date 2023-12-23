import React from 'react'
import { useState, useEffect } from 'react'
import client from './axiosClient'

const useScrapData = async(url) => {


    const [link, setLink] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let scrappedData = {}

    try {
        setIsLoading(true)
        const response = await client.post("/api/scrap_deal/", { "url": url });
        scrappedData = response.data;
        setIsLoading(false)
        setIsLoaded(true)
      } catch (err) {
        const error = error;
      }

  return [isLoaded, isLoading, scrappedData, error]
}

export default useScrapData
