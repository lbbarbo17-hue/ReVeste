# 📚 Central de Documentação — ReVeste (Brechó Digital)

> **Projeto Integrador II — Documentação Oficial de Engenharia, Negócio e Arquitetura**  
> *Plataforma Web de Brechó Digital para Compra, Venda e Consumo Consciente de Roupas de Segunda Mão*

---

## 🗺️ Mapa de Navegação da Documentação

A documentação do **ReVeste** está estruturada de forma modular para facilitar a consulta por professores avaliadores, desenvolvedores e partes interessadas:

```
ReVeste/
├── README.md                           # Visão geral do repositório e quickstart
└── docs/                               # 📁 Diretório Central de Documentação
    ├── README.md                       # 📍 Você está aqui (Índice Geral e Guia)
    ├── briefing.md                     # 📄 01. Briefing Oficial do Projeto Integrador
    ├── funcionalidades.md              # 💡 02. Especificação Completa das 54 Funcionalidades
    ├── arquitetura-e-fluxos.md         # 📐 03. Diagramas de Fluxo e Arquitetura Transacional
    ├── modelagem-dados.md              # 🗄️ 04. Modelagem do Banco de Dados e Dicionário
    └── design-system.md                # 🎨 05. Design System, Tokens de Cor e Acessibilidade
```

---

## 📑 Índice Detalhado dos Documentos

| Documento | Foco Principal | Conteúdo Chave |
| :--- | :--- | :--- |
| [📄 **01. Briefing do Projeto**](./briefing.md) | **Contexto & Justificativa** | • Tema e problema de negócio (peças ociosas e desorganização de brechós)<br>• Justificativa socioambiental (economia circular)<br>• Objetivos gerais e específicos do PI II<br>• Público-alvo detalhado e divisão da equipe |
| [💡 **02. Especificação de Funcionalidades**](./funcionalidades.md) | **Requisitos & Regras de Negócio** | • Detalhamento de todos os módulos (Cliente, Vendedor, Admin, BI)<br>• Regras da "Sacolinha" (consolidação de frete até 30 dias)<br>• Provador Virtual com medidas reais em centímetros<br>• Matriz completa consolidada com **54 funcionalidades** |
| [📐 **03. Arquitetura e Fluxos**](./arquitetura-e-fluxos.md) | **Engenharia & Diagramas** | • Diagrama do Mecanismo de Reserva com Timer (Anti-Overselling)<br>• Fluxo transacional da "Sacolinha"<br>• Ciclo de vida da peça física de brechó (estados)<br>• Fluxo de custódia financeira (*Escrow*) |
| [🗄️ **04. Modelagem de Dados**](./modelagem-dados.md) | **Persistência & Auditoria** | • Diagrama Entidade-Relacionamento (DER Mermaid)<br>• Dicionário de dados relacional normalizado (PostgreSQL / MySQL)<br>• Trilha de auditoria imutável (*Audit Logs*) com histórico de alterações |
| [🎨 **05. Design System & Tokens**](./design-system.md) | **Identidade Visual & UI/UX** | • Paleta oficial de tokens com proporção 60-30-10<br>• Conformidade de contraste WCAG (11.8:1 botão primário)<br>• Variáveis CSS (`:root`) e configuração do Tailwind CSS<br>• Padrões de componentes (Cards de peça única, botões e tags) |


---

## 👥 Matriz de Responsabilidades da Equipe

| Integrante | Atribuições Primárias | Frentes de Atuação |
| :--- | :--- | :--- |
| **Laura Barbosa** | Coordenação de Requisitos, Modelagem do Banco de Dados Relacional e Desenvolvimento Back-End | APIs RESTful, Regras de Concorrência, Transações ACID, Autenticação JWT, Auditoria |
| **Nicoli Silva** | Desenvolvimento Front-End, Design de Interfaces e Integração de APIs | Interface Responsiva, Catálogo Dinâmico, Provador Virtual, Painéis Analíticos, UX/UI |
| **Laura & Nicoli** | Qualidade, Conformidade e Documentação | Segurança da Informação, Módulo de Auditoria, Documentação Técnica e Testes de Software |

---

## 🛠️ Stack Tecnológica Padronizada

- **Back-End:** Node.js (Express) ou ASP.NET Core C# com arquitetura RESTful.
- **Banco de Dados Relacional:** PostgreSQL ou MySQL com isolamento transacional para travas concorrenciais.
- **Front-End:** HTML5 Semântico, CSS3 Moderno (Vanilla CSS com Design System de tokens e micro-animações) e JavaScript / React.
- **Segurança:** BCrypt (hash de senhas), JWT (sessão stateless), Helmet e sanitização OWASP.
- **APIs Externas:** ViaCEP (endereçamento dinâmico), gateway de pagamento (PIX instantâneo) e cotação de frete.
