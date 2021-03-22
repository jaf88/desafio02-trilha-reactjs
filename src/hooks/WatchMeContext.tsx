import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { api } from "../services/api";

interface WatchMeProviderProps {
  children: ReactNode;
}

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface WatchMeContextData {
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
  selectedGenreId: number;
}

export const WatchMeContext = createContext<WatchMeContextData>({} as WatchMeContextData);

export function WatchMeProvider({ children }: WatchMeProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <WatchMeContext.Provider
      value={{
        genres,
        selectedGenreId,
        handleClickButton,
        movies,
        selectedGenre
      }}>
      {children}
    </WatchMeContext.Provider>
  );
}

export function useWatchMe() {
  const context = useContext(WatchMeContext);
  return context;
}