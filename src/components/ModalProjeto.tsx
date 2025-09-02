import React, { useEffect } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Tipo para os dados do projeto (atualizado)
export interface DadosProjeto {
  id: string;
  titulo: string;
  descricao: string;
  descricaoCompleta: string;
  tecnologias: string[];
  imagem: string;
  linkGithub: string;
  linkDemo: string;
}

interface ModalProjetoProps {
  projeto: DadosProjeto | null;
  estaAberto: boolean;
  aoFechar: () => void;
}

// Componente modal para exibir detalhes completos do projeto
export const ModalProjeto: React.FC<ModalProjetoProps> = ({ 
  projeto, 
  estaAberto, 
  aoFechar 
}) => {
  
  // Fechar modal com tecla ESC
  useEffect(() => {
    const lidarComTecla = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        aoFechar();
      }
    };

    if (estaAberto) {
      document.addEventListener('keydown', lidarComTecla);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', lidarComTecla);
      document.body.style.overflow = 'unset';
    };
  }, [estaAberto, aoFechar]);

  if (!projeto) return null;

  return (
    <AnimatePresence>
      {estaAberto && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={aoFechar}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabeçalho do modal */}
              <div className="relative">
                <div className="h-60 overflow-hidden">
                  <ImageWithFallback
                    src={projeto.imagem}
                    alt={`Captura de tela do projeto ${projeto.titulo}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Botão fechar */}
                <button
                  onClick={aoFechar}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full 
                           hover:bg-black/70 transition-colors"
                  aria-label="Fechar modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Conteúdo do modal */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-15rem)]">
                
                {/* Título e links */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <h2 className="text-3xl font-bold">{projeto.titulo}</h2>
                  
                  <div className="flex gap-3">
                    <a
                      href={projeto.linkGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg 
                               hover:bg-accent transition-colors"
                    >
                      <Github size={20} />
                      <span>Código</span>
                    </a>
                    
                    <a
                      href={projeto.linkDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                               rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Ver Demo</span>
                    </a>
                  </div>
                </div>

                {/* Descrição completa */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Sobre o Projeto</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {projeto.descricaoCompleta}
                  </p>
                </div>

                {/* Tecnologias */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Tecnologias Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {projeto.tecnologias.map((tecnologia, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {tecnologia}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};