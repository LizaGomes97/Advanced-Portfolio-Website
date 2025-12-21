# 📁 Nova Estrutura de Pastas - Proposta

## Estrutura Atual vs. Proposta

### ❌ Estrutura Atual (Problemas)

- Componentes misturados (seções, UI, backgrounds)
- Utils com testes misturados
- Data com documentação
- Styles separado
- Difícil encontrar arquivos

### ✅ Estrutura Proposta (Profissional)

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx
│   └── main.tsx
│
├── assets/                 # Assets estáticos
│   ├── images/            # Imagens
│   └── styles/            # Estilos globais
│       ├── globals.css
│       └── index.css
│
├── components/            # Componentes reutilizáveis
│   ├── features/          # Componentes por feature/domínio
│   │   ├── portfolio/     # Feature: Portfólio
│   │   │   ├── sections/  # Seções do portfólio
│   │   │   │   ├── SecaoInicio.tsx
│   │   │   │   ├── SecaoProjetos.tsx
│   │   │   │   ├── SecaoHabilidades.tsx
│   │   │   │   ├── SecaoCertificados.tsx
│   │   │   │   └── SecaoContato.tsx
│   │   │   ├── modals/    # Modais
│   │   │   │   └── ModalProjeto.tsx
│   │   │   └── navigation/ # Navegação
│   │   │       └── MenuLateral.tsx
│   │   └── themes/        # Feature: Temas sazonais
│   │       ├── SnowBackground.tsx
│   │       └── TesteNatal.tsx
│   ├── ui/                # Componentes de UI base (shadcn/ui)
│   │   └── [todos os componentes ui]
│   └── shared/              # Componentes compartilhados
│       └── ImageWithFallback.tsx
│
├── config/                 # Configurações
│   └── vite.config.ts (na raiz, mas referenciado aqui)
│
├── constants/              # Constantes da aplicação
│   └── index.ts
│
├── contexts/               # Contextos React
│   └── TemaContext.tsx
│
├── data/                   # Dados estáticos
│   ├── certificados.json
│   ├── projetos.json
│   └── temas.json
│
├── hooks/                  # Custom hooks
│   └── useScrollSpy.ts
│
├── lib/                    # Bibliotecas e utilitários
│   └── utils/
│       ├── temaUtils.ts
│       └── index.ts
│
├── types/                  # TypeScript types/interfaces
│   └── index.ts
│
└── docs/                   # Documentação do projeto
    ├── Attributions.md
    ├── Guidelines.md
    └── README_TEMAS.md
```

## Benefícios

1. **Organização por Features**: Componentes agrupados por funcionalidade
2. **Separação Clara**: UI, features, utils, data separados
3. **Escalabilidade**: Fácil adicionar novas features
4. **Manutenibilidade**: Fácil encontrar e modificar arquivos
5. **Padrão de Mercado**: Estrutura usada em projetos profissionais

## Próximos Passos

1. Criar a nova estrutura
2. Mover arquivos
3. Atualizar imports
4. Testar funcionamento
