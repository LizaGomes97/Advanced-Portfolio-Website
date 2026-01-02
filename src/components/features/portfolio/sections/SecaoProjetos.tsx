import React, { useState } from "react";
import { Github, ExternalLink, Filter } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../../shared/ImageWithFallback";
import { ModalProjeto, DadosProjeto } from "../modals/ModalProjeto";
import projetosData from "../../../../data/projetos.json";
import { SnowBackground } from "../../themes/SnowBackground";

// Componente da seção de projetos
export const SecaoProjetos: React.FC = () => {
  const [projetoSelecionado, setProjetoSelecionado] =
    useState<DadosProjeto | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");

  // Dados dos projetos importados do JSON
  const projetos: DadosProjeto[] = projetosData as DadosProjeto[];

  // Categorias para filtro
  const categorias = [
    { id: "todos", label: "Todos os Projetos" },
    { id: "web", label: "Web Development" },
    { id: "ia", label: "IA Development" },
    { id: "bots", label: "Bot's" },
    { id: "softwares", label: "Softwares" },
  ];

  // Filtrar projetos baseado na categoria
  const projetosFiltrados = projetos.filter((projeto) => {
    if (filtroAtivo === "todos") return true;
    if (filtroAtivo === "web")
      return projeto.tecnologias.some((tech) => ["HTML", "CSS", "Tailwind CSS"].includes(tech));
    if (filtroAtivo === "ia")
      return projeto.tecnologias.includes("IA, LangChain, OpenAI");
    if (filtroAtivo === "bots")
      return projeto.titulo.toLowerCase().includes("bot");
    if (filtroAtivo === "softwares")
      return projeto.titulo.toLowerCase().includes("software") || projeto.titulo.toLowerCase().includes("app");
    return true;
  });

  // Abrir modal do projeto
  const abrirModalProjeto = (projeto: DadosProjeto) => {
    setProjetoSelecionado(projeto);
    setModalAberto(true);
  };

  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setProjetoSelecionado(null);
  };

  return (
    <section id="projetos" className="py-20 px-6 relative">
      <SnowBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Meus Projetos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas
            habilidades em diferentes tecnologias e áreas de desenvolvimento.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Filter size={20} />
            <span>Filtrar por:</span>
          </div>

          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setFiltroAtivo(categoria.id)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                filtroAtivo === categoria.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {categoria.label}
            </button>
          ))}
        </motion.div>

        {/* Grid de projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetosFiltrados.map((projeto, index) => (
            <motion.div
              key={projeto.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-xl shadow-lg overflow-hidden border border-border
                       hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => abrirModalProjeto(projeto)}
            >
              {/* Imagem do projeto */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={projeto.imagem}
                  alt={`Captura de tela do projeto ${projeto.titulo}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay com links */}
                <div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 flex items-center justify-center gap-4"
                >
                  <a
                    href={projeto.linkGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors cursor-pointer"
                    aria-label={`Ver código do projeto ${projeto.titulo} no GitHub`}
                  >
                    <Github size={24} className="text-white" />
                  </a>
                  <a
                    href={projeto.linkDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors cursor-pointer"
                    aria-label={`Ver demo do projeto ${projeto.titulo}`}
                  >
                    <ExternalLink size={24} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {projeto.titulo}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {projeto.descricao}
                </p>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2">
                  {projeto.tecnologias
                    .slice(0, 3)
                    .map((tecnologia, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                      >
                        {tecnologia}
                      </span>
                    ))}
                  {projeto.tecnologias.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{projeto.tecnologias.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensagem quando não há projetos filtrados */}
        {projetosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              Nenhum projeto encontrado para esta categoria.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal do projeto */}
      <ModalProjeto
        projeto={projetoSelecionado}
        estaAberto={modalAberto}
        aoFechar={fecharModal}
      />
    </section>
  );
};
