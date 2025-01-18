import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
import api from '../api';

const MemberContext = createContext();

export function useMemberContext(){
    return useContext(MemberContext);
}

export function MemberProvider({ children }) {
    const [member, setMember] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (window.location.pathname !== '/login' && !member) {
        window.location.href = '/login';
        }
    }, [member]);

    useEffect(() => {
        const fetchMember = async () => {
          try {
            const response = await api.get(`/members`);
            console.log(response);
            if (response.status === 401) {
              setMember(undefined);
              setError('Unauthorized access.');
            } else {
              setMember(response.data);
            }
          } catch (err) {
            console.log(err);
            setMember(undefined);
            setError('Erro ao buscar membro.');
          }
        };

        fetchMember();
      }, []);

    return (
        <MemberContext.Provider value={{ member, error }}>
            {children}
        </MemberContext.Provider>
    );
}