import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  ExternalLink,
  Calendar,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "../../../shared/ImageWithFallback";
import certificados from "../../../../data/certificados.json";
import { Button } from "../../../../components/ui/button";
import { SnowBackground } from "../../themes/SnowBackground";

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

const ITENS_POR_PAGINA = 4;

// Componente da seção de certificados
export const SecaoCertificados: React.FC = () => {
  const [itensVisiveis, setItensVisiveis] = useState(ITENS_POR_PAGINA);

  const certificadosVisiveis = certificados.slice(0, itensVisiveis);

  const carregarMais = () => {
    setItensVisiveis((prev) => prev + ITENS_POR_PAGINA);
  };

  // Verificar se certificado está próximo do vencimento
  const verificarVencimento = (dataVencimento: string | undefined): boolean => {
    if (!dataVencimento) return false;

    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTempo = vencimento.getTime() - hoje.getTime();
    const diffDias = Math.ceil(diffTempo / (1000 * 3600 * 24));

    return diffDias <= 30 && diffDias > 0;
  };

  return (
    <section id="certificados" className="py-20 px-6 relative">
      <SnowBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Certificações</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Certificações profissionais que demonstram meu comprometimento com o
            aprendizado contínuo e expertise em tecnologias modernas.
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
              {certificados.filter((cert) => cert.ativo).length}
            </div>
            <div className="text-muted-foreground">Certificações Ativas</div>
          </div>

          <div className="text-center bg-card p-6 rounded-xl shadow-lg border border-border">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-500 mb-2">
              {
                certificados.filter(
                  (cert) =>
                    !cert.dataVencimento ||
                    !verificarVencimento(cert.dataVencimento)
                ).length
              }
            </div>
            <div className="text-muted-foreground">Válidas</div>
          </div>

          <div className="text-center bg-card p-6 rounded-xl shadow-lg border border-border">
            <div className="flex justify-center mb-3">
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-500 mb-2">2025</div>
            <div className="text-muted-foreground">Última Obtida</div>
          </div>
        </motion.div>

        {/* Grid de certificados */}
        <div className="grid md:grid-cols-2 gap-8">
          {certificadosVisiveis.map((certificado, index) => (
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
                    <p className="text-primary font-medium mb-1">
                      {certificado.instituicao}
                    </p>
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
                             hover:text-primary-foreground transition-colors cursor-pointer"
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
                  <p className="text-xs text-muted-foreground mb-1">
                    ID da Credencial:
                  </p>
                  <p className="font-mono text-sm">{certificado.credencial}</p>
                </div>

                {/* Tecnologias */}
                <div>
                  <p className="text-sm font-medium mb-2">
                    Tecnologias Cobertas:
                  </p>
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

        {/* Botão Ver mais */}
        {itensVisiveis < certificados.length && (
          <div className="text-center mt-12">
            <Button variant="outline" onClick={carregarMais} className="group">
              Ver mais
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        )}

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
            Estou sempre buscando novas certificações e aprendendo as
            tecnologias mais recentes para me manter atualizado com as melhores
            práticas do mercado.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>📚 Próxima meta: Totvs Protheus</span>
            <span>🎯 Meta 2026: Inglês Avançado</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
