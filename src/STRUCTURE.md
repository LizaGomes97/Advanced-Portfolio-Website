# 📁 Estrutura de Pastas do Projeto

Esta documentação descreve a organização profissional da estrutura de pastas do portfólio.

## 📂 Estrutura Principal

```
src/
├── app/                          # Configuração da aplicação
│   ├── App.tsx                   # Componente raiz da aplicação
│   └── main.tsx                  # Ponto de entrada da aplicação
│
├── assets/                        # Assets estáticos
│   ├── images/                   # Imagens (futuro)
│   └── styles/                   # Estilos globais
│       ├── globals.css           # Estilos globais
│       └── index.css             # Estilos principais
│
├── components/                    # Componentes React
│   ├── features/                 # Componentes organizados por feature
│   │   ├── portfolio/            # Feature: Portfólio
│   │   │   ├── sections/         # Seções do portfólio
│   │   │   │   ├── SecaoInicio.tsx
│   │   │   │   ├── SecaoProjetos.tsx
│   │   │   │   ├── SecaoHabilidades.tsx
│   │   │   │   ├── SecaoCertificados.tsx
│   │   │   │   └── SecaoContato.tsx
│   │   │   ├── modals/           # Modais
│   │   │   │   └── ModalProjeto.tsx
│   │   │   └── navigation/        # Navegação
│   │   │       └── MenuLateral.tsx
│   │   └── themes/               # Feature: Temas sazonais
│   │       ├── SnowBackground.tsx
│   │       └── TesteNatal.tsx
│   ├── ui/                       # Componentes de UI base (shadcn/ui)
│   │   └── [todos os componentes ui]
│   └── shared/                   # Componentes compartilhados
│       └── ImageWithFallback.tsx
│
├── config/                       # Configurações (futuro)
│
├── constants/                     # Constantes da aplicação (futuro)
│
├── contexts/                      # Contextos React
│   └── TemaContext.tsx           # Contexto de tema claro/escuro
│
├── data/                          # Dados estáticos (JSON)
│   ├── certificados.json          # Dados dos certificados
│   ├── projetos.json              # Dados dos projetos
│   └── temas.json                 # Configuração dos temas sazonais
│
├── hooks/                         # Custom hooks
│   └── useScrollSpy.ts           # Hook para scroll spy
│
├── lib/                           # Bibliotecas e utilitários
│   └── utils/
│       └── temaUtils.ts          # Utilitários de temas
│
├── types/                         # TypeScript types/interfaces (futuro)
│
└── docs/                          # Documentação do projeto
    ├── Attributions.md            # Atribuições
    ├── Guidelines.md              # Diretrizes do projeto
    └── README_TEMAS.md            # Documentação do sistema de temas
```

## 🎯 Princípios de Organização

### 1. **Separação por Features**
Componentes relacionados são agrupados por funcionalidade (portfolio, themes, etc.)

### 2. **Componentes Reutilizáveis**
- `ui/`: Componentes de UI base (shadcn/ui)
- `shared/`: Componentes compartilhados entre features

### 3. **Assets Centralizados**
Todos os assets (imagens, estilos) ficam em `assets/`

### 4. **Dados Separados**
Dados estáticos (JSON) ficam em `data/`

### 5. **Utilitários Organizados**
Funções utilitárias ficam em `lib/utils/`

## 📝 Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `SecaoInicio.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useScrollSpy.ts`)
- **Utils**: camelCase (ex: `temaUtils.ts`)
- **Types**: PascalCase (ex: `types/index.ts`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `constants/index.ts`)

## 🔍 Como Encontrar Arquivos

- **Seções do portfólio**: `src/components/features/portfolio/sections/`
- **Modais**: `src/components/features/portfolio/modals/`
- **Navegação**: `src/components/features/portfolio/navigation/`
- **Temas sazonais**: `src/components/features/themes/`
- **Componentes UI**: `src/components/ui/`
- **Dados JSON**: `src/data/`
- **Hooks customizados**: `src/hooks/`
- **Utilitários**: `src/lib/utils/`

## 🚀 Adicionando Novos Componentes

1. **Componente de Feature**: Adicione em `components/features/[feature-name]/`
2. **Componente UI**: Adicione em `components/ui/`
3. **Componente Compartilhado**: Adicione em `components/shared/`

## 📚 Documentação Adicional

- Sistema de Temas: `src/docs/README_TEMAS.md`
- Diretrizes: `src/docs/Guidelines.md`
- Atribuições: `src/docs/Attributions.md`

