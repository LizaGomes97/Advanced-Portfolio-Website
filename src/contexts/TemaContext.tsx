import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipos para o contexto do tema
type TipoTema = 'claro' | 'escuro';

interface ContextoTema {
  tema: TipoTema;
  alternarTema: () => void;
}

// Criação do contexto
const TemaContext = createContext<ContextoTema | undefined>(undefined);

// Provider do tema
export const TemaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tema, setTema] = useState<TipoTema>('claro');

  // Verificar tema salvo no localStorage ao carregar
  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema-portfolio') as TipoTema;
    if (temaSalvo) {
      setTema(temaSalvo);
    } else {
      // Verificar preferência do sistema
      const preferenciaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTema(preferenciaEscuro ? 'escuro' : 'claro');
    }
  }, []);

  // Aplicar classe ao body quando o tema muda
  useEffect(() => {
    if (tema === 'escuro') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('tema-portfolio', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema(prev => prev === 'claro' ? 'escuro' : 'claro');
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

// Hook para usar o contexto do tema
export const useTema = () => {
  const contexto = useContext(TemaContext);
  if (contexto === undefined) {
    throw new Error('useTema deve ser usado dentro de um TemaProvider');
  }
  return contexto;
};