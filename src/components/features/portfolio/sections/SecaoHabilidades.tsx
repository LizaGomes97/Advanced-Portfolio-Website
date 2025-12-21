import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Database, Smartphone, Globe, Server, Palette } from 'lucide-react';
import { SnowBackground } from '../../themes/SnowBackground';

// Tipo para habilidade
interface Habilidade {
  nome: string;
  nivel: number;
  categoria: string;
  icone?: React.ReactNode;
  descricao: string;
}

// Componente da seção de habilidades
export const SecaoHabilidades: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('frontend');

  // Dados das habilidades organizadas por categoria
  const habilidades: Record<string, Habilidade[]> = {
    frontend: [
      {
        nome: 'React / Next.js',
        nivel: 60,
        categoria: 'frontend',
        icone: <Code size={24} />,
        descricao: 'Desenvolvimento de aplicações modernas com React, hooks, context API e Next.js para SSR/SSG.'
      },
      {
        nome: 'TypeScript',
        nivel: 45,
        categoria: 'frontend',
        icone: <Code size={24} />,
        descricao: 'Tipagem estática para JavaScript, interfaces, generics e desenvolvimento type-safe.'
      },
      {
        nome: 'HTML5 / CSS3',
        nivel: 75,
        categoria: 'frontend',
        icone: <Globe size={24} />,
        descricao: 'Marcação semântica, acessibilidade, CSS Grid, Flexbox e animações CSS.'
      },
      {
        nome: 'Tailwind CSS',
        nivel: 30,
        categoria: 'frontend',
        icone: <Palette size={24} />,
        descricao: 'Framework CSS utility-first para criação rápida de interfaces responsivas.'
      },
      {
        nome: 'Vue.js',
        nivel: 30,
        categoria: 'frontend',
        icone: <Code size={24} />,
        descricao: 'Framework progressivo para construção de interfaces de usuário interativas.'
      }
    ],
    backend: [
      {
        nome: 'Node.js',
        nivel: 70,
        categoria: 'backend',
        icone: <Server size={24} />,
        descricao: 'Desenvolvimento de APIs REST, GraphQL e aplicações server-side com JavaScript.'
      },
      {
        nome: 'Python',
        nivel: 80,
        categoria: 'backend',
        icone: <Code size={24} />,
        descricao: 'Desenvolvimento com Django, Flask e automação de tarefas.'
      },
      {
        nome: 'PostgreSQL',
        nivel: 30,
        categoria: 'backend',
        icone: <Database size={24} />,
        descricao: 'Banco de dados relacional avançado, queries complexas e otimização.'
      },
    ],
    mobile: [
      {
        nome: 'React Native',
        nivel: 30,
        categoria: 'mobile',
        icone: <Smartphone size={24} />,
        descricao: 'Desenvolvimento de aplicativos nativos para iOS e Android.'
      },
    ],
    devops: [
      {
        nome: 'Docker',
        nivel: 30,
        categoria: 'devops',
        icone: <Server size={24} />,
        descricao: 'Containerização de aplicações e orquestração com Docker Compose.'
      },
      {
        nome: 'AWS',
        nivel: 30,
        categoria: 'devops',
        icone: <Server size={24} />,
        descricao: 'Serviços de nuvem: EC2, S3, Lambda, RDS e deployment automatizado.'
      },
      {
        nome: 'Git / GitHub',
        nivel: 92,
        categoria: 'devops',
        icone: <Code size={24} />,
        descricao: 'Controle de versão, branching strategies e CI/CD com GitHub Actions.'
      },
    ]
  };

  // Categorias disponíveis
  const categorias = [
    { id: 'frontend', label: 'Frontend', icone: <Globe size={20} /> },
    { id: 'backend', label: 'Backend', icone: <Server size={20} /> },
    { id: 'mobile', label: 'Mobile', icone: <Smartphone size={20} /> },
    { id: 'devops', label: 'DevOps', icone: <Database size={20} /> }
  ];

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
            Minhas competências técnicas desenvolvidas ao longo dos anos de experiência 
            em desenvolvimento de software e tecnologias modernas.
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
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card text-card-foreground hover:bg-accent border border-border'
              }`}
            >
              {categoria.icone}
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
          {habilidades[categoriaAtiva]?.map((habilidade, index) => (
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
                <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary 
                              group-hover:text-primary-foreground transition-colors">
                  {habilidade.icone}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{habilidade.nome}</h3>
                  <p className="text-sm text-muted-foreground">{habilidade.nivel}% de proficiência</p>
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
                        ? 'bg-primary'
                        : 'bg-secondary'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">
                  {habilidade.nivel >= 90 ? 'Avançado' :
                   habilidade.nivel >= 70 ? 'Intermediário' :
                   habilidade.nivel >= 50 ? 'Básico' : 'Iniciante'}
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
              <div className="text-3xl font-bold text-primary mb-2">2+</div>
              <div className="text-muted-foreground">Anos de Experiência</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Tecnologias Dominadas</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Projetos Concluídos</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};