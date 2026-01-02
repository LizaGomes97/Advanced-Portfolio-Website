import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Code,
  Database,
  Smartphone,
  Globe,
  Server,
  Palette,
  Brain,
  Bot,
  LucideIcon,
} from "lucide-react";
import { SnowBackground } from "../../themes/SnowBackground";
import dadosHabilidades from "../../../../data/habilidades.json";

// Tipo para habilidade do JSON
interface HabilidadeJSON {
  id: string;
  nome: string;
  nivel: number;
  categoria?: string;
  categorias?: string[];
  icone: string;
  descricao: string;
}

// Tipo para categoria do JSON
interface CategoriaJSON {
  id: string;
  label: string;
  icone: string;
}

// Mapeamento de strings para componentes de ícones
const iconeMap: Record<string, LucideIcon> = {
  code: Code,
  database: Database,
  smartphone: Smartphone,
  globe: Globe,
  server: Server,
  palette: Palette,
  brain: Brain,
  bot: Bot,
  robot: Bot,
};

// Função para obter o componente de ícone
const getIcone = (nomeIcone: string, size: number = 24) => {
  const IconeComponente = iconeMap[nomeIcone.toLowerCase()] || Code;
  return <IconeComponente size={size} />;
};

// Componente da seção de habilidades
export const SecaoHabilidades: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");

  // Dados das categorias do JSON
  const categorias = dadosHabilidades.categorias as CategoriaJSON[];

  // Todas as habilidades do JSON
  const todasHabilidades = dadosHabilidades.habilidades as HabilidadeJSON[];

  // Dados das habilidades organizadas por categoria
  const habilidadesPorCategoria = useMemo(() => {
    return todasHabilidades.reduce((acc, habilidade) => {
      // Suporta tanto 'categoria' (string) quanto 'categorias' (array)
      const cats =
        habilidade.categorias ||
        (habilidade.categoria ? [habilidade.categoria] : []);
      cats.forEach((cat) => {
        if (!acc[cat]) {
          acc[cat] = [];
        }
        acc[cat].push(habilidade);
      });
      return acc;
    }, {} as Record<string, HabilidadeJSON[]>);
  }, [todasHabilidades]);

  // Habilidades a serem exibidas (todas ou filtradas por categoria)
  const habilidadesExibidas = useMemo(() => {
    if (categoriaAtiva === "todas") {
      return todasHabilidades;
    }
    return habilidadesPorCategoria[categoriaAtiva] || [];
  }, [categoriaAtiva, todasHabilidades, habilidadesPorCategoria]);

  return (
    <section id="habilidades" className="py-20 px-6 bg-muted/30 relative">
      <SnowBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Habilidades Técnicas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Minhas competências técnicas desenvolvidas ao longo dos anos de
            experiência em desenvolvimento de software e tecnologias modernas.
          </p>
        </motion.div>

        {/* Navegação por categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaAtiva(categoria.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                categoriaAtiva === categoria.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-card-foreground hover:bg-accent border border-border"
              }`}
            >
              {getIcone(categoria.icone, 20)}
              <span>{categoria.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Lista de habilidades */}
        <motion.div
          key={categoriaAtiva}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {habilidadesExibidas.map((habilidade, index) => (
            <motion.div
              key={`${categoriaAtiva}-${habilidade.nome}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card p-6 rounded-xl shadow-lg border border-border 
                       hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Cabeçalho da habilidade */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary 
                              group-hover:text-primary-foreground transition-colors"
                >
                  {getIcone(habilidade.icone)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{habilidade.nome}</h3>
                  <p className="text-sm text-muted-foreground">
                    {habilidade.nivel}% de proficiência
                  </p>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="mb-4">
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${habilidade.nivel}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Descrição */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {habilidade.descricao}
              </p>

              {/* Indicador de nível */}
              <div className="mt-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < Math.ceil(habilidade.nivel / 20)
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">
                  {habilidade.nivel >= 70
                    ? "Avançado"
                    : habilidade.nivel >= 40
                    ? "Intermediário"
                    : habilidade.nivel >= 30
                    ? "Básico"
                    : "Iniciante"}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Resumo de experiência */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">+4Mil</div>
              <div className="text-muted-foreground">
                Horas de Desenvolvimento
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">+20</div>
              <div className="text-muted-foreground">Tecnologias Dominadas</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">+10</div>
              <div className="text-muted-foreground">Anos no mercado</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
