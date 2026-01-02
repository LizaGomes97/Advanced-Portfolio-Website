import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

// Importar contextos e hooks
import { TemaProvider } from "../contexts/TemaContext";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { deveExibirEfeitoNatal } from "../utils/natalUtils";

// Importar componentes
import { MenuLateral } from "../components/features/portfolio/navigation/MenuLateral";
import { SecaoInicio } from "../components/features/portfolio/sections/SecaoInicio";
import { SecaoProjetos } from "../components/features/portfolio/sections/SecaoProjetos";
import { SecaoHabilidades } from "../components/features/portfolio/sections/SecaoHabilidades";
import { SecaoCertificados } from "../components/features/portfolio/sections/SecaoCertificados";
import { SecaoContato } from "../components/features/portfolio/sections/SecaoContato";
import { TesteNatal } from "../components/features/themes/TesteNatal";

// Componente principal do portfólio
const PortfolioApp: React.FC = () => {
  const [mostrarBotaoTopo, setMostrarBotaoTopo] = useState(false);

  // IDs das seções para scroll spy
  const idsSecoes = [
    "inicio",
    "projetos",
    "habilidades",
    "certificados",
    "contato",
  ];

  // Hook para detectar seção ativa
  const secaoAtiva = useScrollSpy(idsSecoes);

  // Verificar scroll para mostrar botão "voltar ao topo"
  useEffect(() => {
    const verificarScroll = () => {
      setMostrarBotaoTopo(window.scrollY > 500);
    };

    window.addEventListener("scroll", verificarScroll);
    return () => window.removeEventListener("scroll", verificarScroll);
  }, []);

  // Trocar favicon baseado na época do ano (Natal)
  useEffect(() => {
    const isNatal = deveExibirEfeitoNatal();
    const favicon = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement;

    if (favicon) {
      favicon.href = isNatal ? "/meu-icone-natal.png" : "/meu-icone.png";
    }
  }, []);

  // Função para scroll suave para o topo
  const voltarAoTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Menu lateral */}
      <MenuLateral secaoAtiva={secaoAtiva} />

      {/* Conteúdo principal */}
      <main className="lg:ml-80">
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
                  Desenvolvedora de Software apaixonado por criar soluções
                  digitais inovadoras e experiências de usuário excepcionais.
                </p>
              </div>

              {/* Links rápidos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { nome: "Início", id: "inicio" },
                    { nome: "Projetos", id: "projetos" },
                    { nome: "Habilidades", id: "habilidades" },
                    { nome: "Certificados", id: "certificados" },
                    { nome: "Contato", id: "contato" },
                  ].map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => {
                          const elemento = document.getElementById(link.id);
                          elemento?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
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
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      lizandraplacido@gmail.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+5511915959763"
                      className="hover:text-primary transition-colors cursor-pointer"
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
                <p>© 2025 Lizandra Santos. Todos os direitos reservados.</p>
                <p>Desenvolvido com React, TypeScript e Tailwind CSS</p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Botões flutuantes */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* Botão WhatsApp */}
        <motion.a
          href="https://wa.me/5511915959763?text=Olá! Vi seu portfólio e gostaria de conversar."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-[#25D366] text-white rounded-full shadow-lg 
                   hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Contato pelo WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>

        {/* Botão voltar ao topo */}
        {mostrarBotaoTopo && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={voltarAoTopo}
            className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg 
                     hover:shadow-xl hover:scale-110 transition-all duration-300"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </div>
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
