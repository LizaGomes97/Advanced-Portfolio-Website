import React, { useState } from 'react';
import { 
  Home, 
  FolderOpen, 
  Code, 
  Award, 
  Mail, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Github,
  Linkedin,
  Download
} from 'lucide-react';
import { useTema } from '../contexts/TemaContext';

interface MenuLateralProps {
  secaoAtiva: string;
}

// Componente do menu lateral com navegação
export const MenuLateral: React.FC<MenuLateralProps> = ({ secaoAtiva }) => {
  const { tema, alternarTema } = useTema();
  const [menuAberto, setMenuAberto] = useState(false);

  // Lista de itens do menu
  const itensMenu = [
    { id: 'inicio', label: 'Início', icone: Home },
    { id: 'projetos', label: 'Projetos', icone: FolderOpen },
    { id: 'habilidades', label: 'Habilidades', icone: Code },
    { id: 'certificados', label: 'Certificados', icone: Award },
    { id: 'contato', label: 'Contato', icone: Mail },
  ];

  // Função para scroll suave até a seção
  const rolarParaSecao = (idSecao: string) => {
    const elemento = document.getElementById(idSecao);
    if (elemento) {
      elemento.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuAberto(false);
  };

  // Função para baixar currículo (simulado)
  const baixarCurriculo = () => {
    // Simular download do currículo
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'curriculo.pdf';
    link.click();
    alert('Download do currículo iniciado!');
  };

  return (
    <>
      {/* Botão hambúrguer mobile */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg lg:hidden"
        aria-label="Abrir menu"
      >
        {menuAberto ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay mobile */}
      {menuAberto && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Menu lateral */}
      <aside className={`
        fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${menuAberto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Cabeçalho do menu */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Portfolio</h2>
            <button
              onClick={alternarTema}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label={`Mudar para tema ${tema === 'claro' ? 'escuro' : 'claro'}`}
            >
              {tema === 'claro' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>

        {/* Navegação principal */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {itensMenu.map((item) => {
              const IconeItem = item.icone;
              const estaAtivo = secaoAtiva === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => rolarParaSecao(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                      transition-all duration-200 text-left
                      ${estaAtivo 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'hover:bg-accent hover:text-accent-foreground'
                      }
                    `}
                    aria-current={estaAtivo ? 'page' : undefined}
                  >
                    <IconeItem size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Ações do rodapé */}
        <div className="p-6 border-t border-border space-y-4">
          {/* Botão de download do currículo */}
          <button
            onClick={baixarCurriculo}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 
                     bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 
                     transition-colors"
          >
            <Download size={20} />
            <span>Baixar Currículo</span>
          </button>

          {/* Links sociais */}
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/lizandra-ribeiro-p-santos/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg hover:bg-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/LizaGomes97"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:lizandraplacido@gmail.com"
              className="p-3 rounded-lg hover:bg-accent transition-colors"
              aria-label="E-mail"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};