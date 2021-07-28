import { useContext } from 'react';
import { authContext } from '../contexts/AuthContexts';

export function useAuth() {
  const value = useContext(authContext)

  return value;
}