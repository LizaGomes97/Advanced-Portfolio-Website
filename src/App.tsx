import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

// Importar contextos e hooks
import { TemaProvider } from './contexts/TemaContext';
import { useScrollSpy } from './hooks/useScrollSpy';

// Importar componentes
import { MenuLateral } from './components/MenuLateral';
import { SecaoInicio } from './components/SecaoInicio';
import { SecaoProjetos } from './components/SecaoProjetos';
import { SecaoHabilidades } from './components/SecaoHabilidades';
import { SecaoCertificados } from './components/SecaoCertificados';
import { SecaoContato } from './components/SecaoContato';

import { ChatWidget } from './components/ChatWidget';

// Componente principal do portfólio
const PortfolioApp: React.FC = () => {
  const [mostrarBotaoTopo, setMostrarBotaoTopo] = useState(false);
  
  // IDs das seções para scroll spy
  const idsSecoes = ['inicio', 'projetos', 'habilidades', 'certificados', 'contato'];
  
  // Hook para detectar seção ativa
  const secaoAtiva = useScrollSpy(idsSecoes);

  // Verificar scroll para mostrar botão "voltar ao topo"
  useEffect(() => {
    const verificarScroll = () => {
      setMostrarBotaoTopo(window.scrollY > 500);
    };

    window.addEventListener('scroll', verificarScroll);
    return () => window.removeEventListener('scroll', verificarScroll);
  }, []);

  // Função para scroll suave para o topo
  const voltarAoTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Menu lateral */}
      <MenuLateral secaoAtiva={secaoAtiva} />

      {/* Conteúdo principal */}
      <main className="lg:ml-80 pb-32">
        {/* Seção Início */}
        <SecaoInicio />
        
        {/* Seção Projetos */}
        <SecaoProjetos />
        
        {/* Seção Habilidades */}
        <SecaoHabilidades />
        
        {/* Seção Certificados */}
        <SecaoCertificados />
        
        {/* Seção Contato */}
        <SecaoContato />
        
        {/* Rodapé */}
        <footer className="py-12 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              
              {/* Informações pessoais */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Lizandra Santos</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Desenvolvedora de Software apaixonado por criar soluções digitais 
                  inovadoras e experiências de usuário excepcionais.
                </p>
              </div>

              {/* Links rápidos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { nome: 'Início', id: 'inicio' },
                    { nome: 'Projetos', id: 'projetos' },
                    { nome: 'Habilidades', id: 'habilidades' },
                    { nome: 'Certificados', id: 'certificados' },
                    { nome: 'Contato', id: 'contato' }
                  ].map(link => (
                    <li key={link.id}>
                      <button
                        onClick={() => {
                          const elemento = document.getElementById(link.id);
                          elemento?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.nome}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Informações de contato */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contato</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>São Paulo, SP - Brasil</p>
                  <p>
                    <a 
                      href="mailto:lizandraplacido@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      lizandraplacido@gmail.com
                    </a>
                  </p>
                  <p>
                    <a 
                      href="tel:+5511915959763"
                      className="hover:text-primary transition-colors"
                    >
                      +55 (11) 91595-9763
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Linha divisória */}
            <div className="border-t border-border mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>
                  © 2025 Lizandra Santos. Todos os direitos reservados.
                </p>
                <p>
                  Desenvolvido com React, TypeScript e Tailwind CSS
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Botão voltar ao topo */}
      {mostrarBotaoTopo && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={voltarAoTopo}
          className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground 
                   rounded-full shadow-lg hover:shadow-xl hover:scale-110 
                   transition-all duration-300 z-40"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
      <ChatWidget />
    </div>
  );
};

// Componente principal com providers
export default function App() {
  return (
    <TemaProvider>
      <PortfolioApp />
    </TemaProvider>
  );
}