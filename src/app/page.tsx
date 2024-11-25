'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput/SearchInput';
import Image from 'next/image';
import ChevronLeftSVG from './components/icons/chevron-left';
import ChevronRightSVG from './components/icons/chevron-right';
import Loader from './components/Loader';

interface ApiResponse {
  result: {
    total: number;
    hits: any[];
    links: {
      next: string;
      prev: string;
    };
  };
}

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cursorToken, setCursorToken] = useState<string>('');

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/fetchResults', {
        query,
        cursorToken,
      });
      setResults(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [cursorToken]);

  const handleSearch = () => {
    setCursorToken('');
    fetchResults();
  };

  const handleNextPage = () => {
    if (results?.result.links.next) {
      setCursorToken(results?.result.links.next);
    }
  };
  const handlePrevPage = () => {
    if (results?.result.links.prev) {
      setCursorToken(results?.result.links.prev);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='search-container'>
        <Image
          src='/censys-logo.svg'
          alt='censys-logo'
          width={200}
          height={50}
          className='pr-5 max-md:mb-5'
          priority={true}
        />
        <SearchInput
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </div>

      <div className='mt-28 max-md:mt-40'>
        {loading ? (
          <div className='loader-div'>
            <Loader />
          </div>
        ) : (
          <>
            <div className='ml-5 font-bold mb-5'>
              Results: {results?.result?.total.toLocaleString('en-US')}
            </div>
            <main className='flex justify-center pb-10 '>
              <div>
                {results?.result?.hits?.map((item: any, index: number) => (
                  <div key={item.id || index} className='border-b-2 mt-5'>
                    <p className='pb-2 text-center font-bold text-lg'>
                      {item.ip}
                    </p>
                    <div className='pb-6 text-center'>
                      Associated Protocols: {item.services.length}
                    </div>
                  </div>
                ))}
              </div>
            </main>
            <footer className='footer-container'>
              <button
                className={'previous-button'}
                onClick={handlePrevPage}
                disabled={!results?.result.links.prev}
              >
                <ChevronLeftSVG />
                Previous
              </button>
              <button
                className={'next-button'}
                onClick={handleNextPage}
                disabled={!results?.result.links.next}
              >
                Next
                <ChevronRightSVG />
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
