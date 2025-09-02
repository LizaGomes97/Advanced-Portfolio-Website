import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Tipo para certificado
interface Certificado {
  id: string;
  titulo: string;
  instituicao: string;
  dataObtencao: string;
  dataVencimento?: string;
  descricao: string;
  tecnologias: string[];
  credencial: string;
  linkVerificacao: string;
  imagem: string;
  ativo: boolean;
}

// Componente da seção de certificados
export const SecaoCertificados: React.FC = () => {
  
  // Dados dos certificados (simulado)
  const certificados: Certificado[] = [
    {
      id: '1',
      titulo: 'AWS Certified Developer - Associate',
      instituicao: 'Amazon Web Services',
      dataObtencao: 'Janeiro 2024',
      dataVencimento: 'Janeiro 2027',
      descricao: 'Certificação que valida as habilidades técnicas para desenvolver e manter aplicações na plataforma AWS.',
      tecnologias: ['AWS Lambda', 'EC2', 'S3', 'DynamoDB', 'API Gateway'],
      credencial: 'AWS-CDA-12345',
      linkVerificacao: 'https://aws.amazon.com/verification',
      imagem: 'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2Njc4ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ativo: true
    },
    {
      id: '2',
      titulo: 'Meta Front-End Developer Professional',
      instituicao: 'Meta / Coursera',
      dataObtencao: 'Novembro 2023',
      descricao: 'Programa profissional abrangente cobrindo React, JavaScript avançado, UX/UI design e desenvolvimento front-end moderno.',
      tecnologias: ['React', 'JavaScript', 'HTML/CSS', 'Figma', 'UX Design'],
      credencial: 'META-FE-67890',
      linkVerificacao: 'https://coursera.org/verify',
      imagem: 'https://images.unsplash.com/photo-1641567535859-c58187ac4954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTY3MDY0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ativo: true
    },
    {
      id: '3',
      titulo: 'Google Cloud Professional Developer',
      instituicao: 'Google Cloud',
      dataObtencao: 'Setembro 2023',
      dataVencimento: 'Setembro 2025',
      descricao: 'Certificação que demonstra proficiência em design, construção e deployment de aplicações na Google Cloud Platform.',
      tecnologias: ['GCP', 'Cloud Functions', 'Cloud Storage', 'BigQuery', 'Kubernetes'],
      credencial: 'GCP-PD-11111',
      linkVerificacao: 'https://cloud.google.com/certification',
      imagem: 'https://images.unsplash.com/photo-1678667720699-5c0fc04ac166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU2NzEzMjgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ativo: true
    },
    {
      id: '4',
      titulo: 'Scrum Master Certified (SMC)',
      instituicao: 'Scrum Alliance',
      dataObtencao: 'Junho 2023',
      dataVencimento: 'Junho 2025',
      descricao: 'Certificação em metodologias ágeis e gestão de projetos usando framework Scrum.',
      tecnologias: ['Scrum', 'Agile', 'Project Management', 'Team Leadership'],
      credencial: 'SMC-22222',
      linkVerificacao: 'https://scrumalliance.org/verify',
      imagem: 'https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NTY3MTgwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ativo: true
    }
  ];

  // Verificar se certificado está próximo do vencimento
  const verificarVencimento = (dataVencimento: string | undefined): boolean => {
    if (!dataVencimento) return false;
    
    // Simular verificação de vencimento (30 dias)
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTempo = vencimento.getTime() - hoje.getTime();
    const diffDias = Math.ceil(diffTempo / (1000 * 3600 * 24));
    
    return diffDias <= 30 && diffDias > 0;
  };

  return (
    <section id="certificados" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho da seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Certificações</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Certificações profissionais que demonstram meu comprometimento com o aprendizado 
            contínuo e expertise em tecnologias modernas.
          </p>
        </motion.div>

        {/* Estatísticas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="text-center bg-card p-6 rounded-xl shadow-lg border border-border">
            <div className="flex justify-center mb-3">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">
              {certificados.filter(cert => cert.ativo).length}
            </div>
            <div className="text-muted-foreground">Certificações Ativas</div>
          </div>
          
          <div className="text-center bg-card p-6 rounded-xl shadow-lg border border-border">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-500 mb-2">
              {certificados.filter(cert => !cert.dataVencimento || !verificarVencimento(cert.dataVencimento)).length}
            </div>
            <div className="text-muted-foreground">Válidas</div>
          </div>
          
          <div className="text-center bg-card p-6 rounded-xl shadow-lg border border-border">
            <div className="flex justify-center mb-3">
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-500 mb-2">2024</div>
            <div className="text-muted-foreground">Última Obtida</div>
          </div>
        </motion.div>

        {/* Grid de certificados */}
        <div className="grid md:grid-cols-2 gap-8">
          {certificados.map((certificado, index) => (
            <motion.div
              key={certificado.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-xl shadow-lg border border-border overflow-hidden
                       hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Imagem do certificado */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={certificado.imagem}
                  alt={`Certificado ${certificado.titulo}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge de status */}
                <div className="absolute top-4 right-4">
                  {certificado.ativo ? (
                    <div className="flex items-center gap-1 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm">
                      <CheckCircle size={16} />
                      <span>Ativo</span>
                    </div>
                  ) : (
                    <div className="bg-gray-500/90 text-white px-3 py-1 rounded-full text-sm">
                      Expirado
                    </div>
                  )}
                </div>

                {/* Aviso de vencimento próximo */}
                {verificarVencimento(certificado.dataVencimento) && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm">
                      Vence em breve
                    </div>
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {certificado.titulo}
                    </h3>
                    <p className="text-primary font-medium mb-1">{certificado.instituicao}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Obtido: {certificado.dataObtencao}</span>
                      {certificado.dataVencimento && (
                        <span>Válido até: {certificado.dataVencimento}</span>
                      )}
                    </div>
                  </div>
                  
                  <a
                    href={certificado.linkVerificacao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary 
                             hover:text-primary-foreground transition-colors"
                    aria-label={`Verificar certificado ${certificado.titulo}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                {/* Descrição */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {certificado.descricao}
                </p>

                {/* Credencial */}
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">ID da Credencial:</p>
                  <p className="font-mono text-sm">{certificado.credencial}</p>
                </div>

                {/* Tecnologias */}
                <div>
                  <p className="text-sm font-medium mb-2">Tecnologias Cobertas:</p>
                  <div className="flex flex-wrap gap-2">
                    {certificado.tecnologias.map((tecnologia, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                      >
                        {tecnologia}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-card p-8 rounded-xl shadow-lg border border-border"
        >
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Aprendizado Contínuo</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Estou sempre buscando novas certificações e aprendendo as tecnologias mais recentes 
            para me manter atualizado com as melhores práticas do mercado.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>📚 Próxima meta: React Native Certification</span>
            <span>🎯 Meta 2024: 2 novas certificações</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};