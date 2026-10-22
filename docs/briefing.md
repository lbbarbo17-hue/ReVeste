# ReVeste — Brechó Digital
> **Projeto Integrador II — Briefing do Projeto**

---

## 1. Tema do Projeto
**ReVeste — Plataforma Web de Brechó Digital para Compra, Venda e Consumo Consciente de Roupas de Segunda Mão.**

### Descrição da Proposta
O **ReVeste** é uma solução web integrada voltada ao comércio de roupas usadas e sustentáveis, conectando pessoas interessadas em desapegar de itens de vestuário em bom estado a consumidores que buscam moda acessível e consciente.

A plataforma oferece:
- **Catálogo Dinâmico:** Apresentação visual detalhada com fotos em alta resolução.
- **Filtros Refinados:** Busca facilitada por categoria, tamanho, estilo, faixa de preço e estado de conservação.
- **Carrinho com Reserva Segura:** Mecanismos de controle e garantia durante a compra.
- **Gestão de Peças Únicas:** Controle individualizado de estoque focado no modelo de SKU exclusivo de unidade única.
- **Controle de Pedidos:** Acompanhamento completo do ciclo de vida dos pedidos.
- **Perfis de Acesso Diferenciados (RBAC):** Níveis para *Administrador*, *Vendedor* e *Cliente*.
- **Auditoria e Rastreabilidade:** Registro e trilhas de auditoria para ações sensíveis.
- **Painel Analítico Socioambiental:** Métricas de vendas, inventário e quantificação de peças reaproveitadas (impacto ecológico).

---

## 2. Problema

No cenário atual do varejo de moda, observa-se:
1. **Ociosidade e Barreiras de Consumo:** Um volume expressivo de peças em excelente estado de conservação permanece sem uso em guarda-roupas devido à carência de canais práticos e confiáveis para comercialização P2P (pessoa para pessoa) ou por pequenos brechós locais. Consumidores enfrentam barreiras como falta de padronização, desconfiança quanto à procedência e dificuldades de busca ao procurar itens de segunda mão online.
2. **Gargalo no Controle de Peças Únicas:** Pequenos empreendedores do segmento de brechó sofrem com o controle manual de estoque. Diferente do comércio tradicional com múltiplos itens por SKU, peças de brechó são itens físicos únicos. A ausência de um sistema informatizado e transacional provoca problemas recorrentes de duplicidade de vendas (*overselling*), desorganização nos pedidos e ausência de métricas comerciais consolidadas.

---

## 3. Justificativa

* **Impacto Ambiental e Economia Circular:** A indústria têxtil é uma das mais poluentes do planeta, gerando toneladas de resíduos e exigindo consumo intensivo de água e recursos naturais. O estímulo à economia circular e ao consumo consciente por meio da reutilização prolonga a vida útil dos produtos e mitiga impactos ecológicos negativos.
* **Solução Tecnológica e de Negócios:** O desenvolvimento do ReVeste justifica-se pela criação de uma plataforma centralizada e confiável que digitaliza pequenos brechós e vendedores autônomos. A automação do fluxo de vendas com travas concorrenciais para peças únicas resolve o gargalo operacional do estoque, enquanto relatórios gerenciais e dashboards analíticos apoiam decisões estratégicas e quantificam o impacto ecológico gerado.

---

## 4. Objetivos

### 4.1 Objetivo Geral
Desenvolver e implementar um sistema computacional web completo para intermediação de compra e venda de roupas usadas, dotado de autenticação segura, controle rigoroso de concorrência em estoque de peças únicas, múltiplos perfis de acesso, geração de relatórios gerenciais e monitoramento de auditoria e impacto socioambiental.

### 4.2 Objetivos Específicos
* **Modelagem e Persistência:** Estruturar banco de dados relacional normalizado para gerenciar usuários, roupas, pedidos, itens de pedidos, histórico de auditoria e controle de fotos.
* **Autenticação e Permissões:** Implementar autenticação segura (com criptografia hash para senhas) e controle de acesso baseado em papéis (*Role-Based Access Control* - RBAC) para perfis de *Administrador*, *Vendedor* e *Cliente*.
* **Catálogo e Experiência de Busca:** Construir catálogo responsivo com busca textual e múltiplos filtros (categoria, tamanho, estilo, faixa de preço e estado de conservação).
* **Consistência de Negócio e Concorrência:** Implementar regras de negócio no backend para garantir a unicidade de venda da peça física e tratamento contra compras simultâneas da mesma roupa (*concurrency control*).
* **Gestão Operacional e Pedidos:** Desenvolver módulos para cadastro/edição de anúncios pelos vendedores, fluxo de carrinho e acompanhamento do ciclo de vida dos pedidos.
* **Inteligência de Dados:** Criar dashboard interativo com métricas de vendas, inventário e reaproveitamento de roupas, além de emitir relatórios analíticos com suporte à exportação (PDF/CSV).
* **Auditoria e Segurança:** Registrar logs rastreáveis de ações sensíveis (criação, edição, exclusão e alteração de status) e aplicar prevenção a vulnerabilidades web fundamentais (SQL Injection, XSS e CSRF).

---

## 5. Público-Alvo

| Perfil | Descrição e Comportamento |
| :--- | :--- |
| **Compradores / Clientes** | Homens e mulheres (predominantemente jovens e adultos entre 18 e 45 anos) adeptos do consumo sustentável, estudantes e profissionais que buscam peças exclusivas, estilo vintage ou preços econômicos através de navegação web intuitiva em desktops e dispositivos móveis. |
| **Vendedores / Pequenos Brechós** | Pessoas físicas que desejam monetizar peças de desapego e pequenos lojistas/brechós físicos que buscam um canal digital estruturado para gestão de estoque e expansão das vendas. |
| **Administradores da Plataforma** | Gestores responsáveis pela mediação, moderação de conteúdos, auditoria do sistema e monitoramento da sustentabilidade e métricas do ecossistema. |

---

## 6. Integrantes da Equipe e Responsabilidades Iniciais

| Integrante | Responsabilidades Iniciais no Projeto |
| :--- | :--- |
| **Laura Barbosa** | Coordenação de Requisitos, Modelagem do Banco de Dados e Desenvolvimento Back-End (Regras de Negócio e APIs) |
| **Nicoli Silva** | Desenvolvimento Front-End (Interface, Responsividade, Catálogo e Painéis) e Integração de APIs |
| **Laura e Nicoli** | Segurança da Informação, Módulo de Auditoria, Elaboração da Documentação Técnica e Testes de Software |

---

## 7. Tecnologias Previstas

A arquitetura prevista segue o padrão **Front-End desacoplado** com **Back-End em API RESTful** e **Banco de Dados Relacional**:

| Componente | Tecnologias Previstas | Justificativa |
| :--- | :--- | :--- |
| **Back-End** | Node.js com Express *(ou ASP.NET Core C#)* | Alta performance, facilidade na construção de APIs RESTful estruturadas, suporte maduro a middlewares de autenticação (JWT) e tratamento assíncrono de requisições concorrentes. |
| **Banco de Dados Relacional** | PostgreSQL / MySQL | Suporte robusto a transações ACID (essenciais para garantir que uma peça física única jamais seja vendida em duplicidade), integridade referencial rígida e facilidade em consultas analíticas para relatórios. |
| **Front-End** | HTML5, CSS3, JavaScript *(React ou Bootstrap)* | Criação de interface moderna, limpa e responsiva, garantindo acessibilidade e usabilidade tanto no catálogo para clientes quanto nos painéis administrativos. |
| **Segurança e Criptografia** | BCrypt e JSON Web Tokens (JWT) | Atendimento rigoroso aos requisitos de segurança para hash de senhas e controle de sessão semântico e protegido baseado em perfis (RBAC). |
| **APIs e Serviços Integrados** | ViaCEP e Serviço de E-mail / Notificação | Enriquecimento automático do endereço no cadastro do usuário e automação de alertas transacionais de alteração de status dos pedidos. |
| **Controle de Versão** | Git e GitHub | Rastreabilidade do código-fonte, trabalho colaborativo entre os integrantes com branches organizadas e comprovação da evolução no ciclo de vida do projeto. |

---

## 📚 Documentos Relacionados
- 📚 [**Central de Documentação (Índice Geral)**](./README.md): Mapa completo de navegação.
- 💡 [**02. Especificação Completa de Funcionalidades**](./funcionalidades.md): Catálogo completo das 54 funcionalidades, regras de negócio e provador virtual.
- 📐 [**03. Arquitetura e Fluxos Transacionais**](./arquitetura-e-fluxos.md): Diagramas de sequência Mermaid e controle de concorrência.
- 🗄️ [**04. Modelagem do Banco de Dados**](./modelagem-dados.md): Dicionário de dados, DER relacional e trilha de auditoria.
