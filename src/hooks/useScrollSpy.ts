import { useState, useEffect } from 'react';

// Hook personalizado para detectar a seção ativa durante o scroll
export const useScrollSpy = (secaoIds: string[], offsetTop: number = 100) => {
  const [secaoAtiva, setSecaoAtiva] = useState<string>('');

  useEffect(() => {
    const observarSecoes = () => {
      const observer = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              setSecaoAtiva(entrada.target.id);
            }
          });
        },
        {
          rootMargin: `-${offsetTop}px 0px -80% 0px`,
          threshold: 0.1,
        }
      );

      // Observar todas as seções
      secaoIds.forEach((id) => {
        const elemento = document.getElementById(id);
        if (elemento) {
          observer.observe(elemento);
        }
      });

      return () => observer.disconnect();
    };

    const cleanup = observarSecoes();
    return cleanup;
  }, [secaoIds, offsetTop]);

  return secaoAtiva;
};