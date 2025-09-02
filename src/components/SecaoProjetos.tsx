import React, { useState } from 'react';
import { Github, ExternalLink, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ModalProjeto, DadosProjeto } from './ModalProjeto';

// Componente da seção de projetos
export const SecaoProjetos: React.FC = () => {
  const [projetoSelecionado, setProjetoSelecionado] = useState<DadosProjeto | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  // Dados dos projetos (simulado)
  const projetos: DadosProjeto[] = [
    {
      id: '1',
      titulo: 'E-commerce Moderno',
      descricao: 'Plataforma completa de e-commerce com React, Node.js e PostgreSQL.',
      descricaoCompleta: 'Uma plataforma de e-commerce completa desenvolvida com as tecnologias mais modernas do mercado. O projeto incluiu desenvolvimento front-end com React, back-end com Node.js e Express, banco de dados PostgreSQL, sistema de autenticação JWT, integração com gateway de pagamento e painel administrativo completo.',
      tecnologias: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      imagem: 'https://images.unsplash.com/photo-1641567535859-c58187ac4954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTY3MDY0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      linkGithub: 'https://github.com',
      linkDemo: 'https://demo.exemplo.com',
      dataInicio: 'Jan 2024',
      dataFim: 'Mar 2024',
      equipe: ['João Silva', 'Maria Santos'],
      desafios: [
        'Implementar sistema de pagamento seguro',
        'Otimizar performance para grandes volumes de dados',
        'Criar interface responsiva para todos os dispositivos'
      ],
      resultados: [
        'Aumento de 40% nas conversões',
        'Redução de 60% no tempo de carregamento',
        'Interface 100% responsiva e acessível'
      ]
    },
    {
      id: '2',
      titulo: 'App Mobile Fitness',
      descricao: 'Aplicativo de fitness com treinos personalizados e tracking de progresso.',
      descricaoCompleta: 'Aplicativo mobile desenvolvido em React Native para auxiliar usuários em seus treinos de fitness. Inclui sistema de criação de treinos personalizados, tracking de progresso, integração com dispositivos wearables e gamificação para motivar os usuários.',
      tecnologias: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
      imagem: 'https://images.unsplash.com/photo-1678667720699-5c0fc04ac166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU2NzEzMjgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      linkGithub: 'https://github.com',
      linkDemo: 'https://demo.exemplo.com',
      dataInicio: 'Jun 2023',
      dataFim: 'Set 2023',
      equipe: ['João Silva'],
      desafios: [
        'Sincronização offline de dados',
        'Integração com dispositivos wearables',
        'Otimização de performance em dispositivos antigos'
      ],
      resultados: [
        'Mais de 10.000 downloads na primeira semana',
        'Avaliação 4.8/5 nas lojas de aplicativos',
        'Redução de 50% no abandono de treinos'
      ]
    },
    {
      id: '3',
      titulo: 'Dashboard Analytics',
      descricao: 'Dashboard interativo para visualização de dados e métricas em tempo real.',
      descricaoCompleta: 'Dashboard profissional desenvolvido para visualização de dados e analytics em tempo real. Utiliza gráficos interativos, filtros avançados, exportação de relatórios e atualizações em tempo real via WebSocket.',
      tecnologias: ['Vue.js', 'D3.js', 'Node.js', 'MongoDB', 'Socket.io'],
      imagem: 'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2Njc4ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      linkGithub: 'https://github.com',
      linkDemo: 'https://demo.exemplo.com',
      dataInicio: 'Out 2023',
      dataFim: 'Dez 2023',
      equipe: ['João Silva', 'Pedro Costa', 'Ana Lima'],
      desafios: [
        'Processamento de grandes volumes de dados',
        'Visualizações interativas em tempo real',
        'Interface intuitiva para usuários não técnicos'
      ],
      resultados: [
        'Redução de 70% no tempo de análise de dados',
        'Aumento de 85% na tomada de decisões baseadas em dados',
        'Interface utilizando por mais de 500 usuários diários'
      ]
    }
  ];

  // Categorias para filtro
  const categorias = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'dashboard', label: 'Dashboards' }
  ];

  // Filtrar projetos baseado na categoria
  const projetosFiltrados = projetos.filter(projeto => {
    if (filtroAtivo === 'todos') return true;
    if (filtroAtivo === 'web') return projeto.tecnologias.some(tech => ['React', 'Vue.js', 'Node.js'].includes(tech));
    if (filtroAtivo === 'mobile') return projeto.tecnologias.includes('React Native');
    if (filtroAtivo === 'dashboard') return projeto.titulo.toLowerCase().includes('dashboard');
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
    <section id="projetos" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho da seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Meus Projetos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas habilidades 
            em diferentes tecnologias e áreas de desenvolvimento.
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
              className={`px-4 py-2 rounded-lg transition-colors ${
                filtroAtivo === categoria.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
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
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={projeto.linkGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                    aria-label={`Ver código do projeto ${projeto.titulo} no GitHub`}
                  >
                    <Github size={24} className="text-white" />
                  </a>
                  <a
                    href={projeto.linkDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
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
                  {projeto.tecnologias.slice(0, 3).map((tecnologia, techIndex) => (
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