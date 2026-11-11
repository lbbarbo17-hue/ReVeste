# 🎨 Design System & Identidade Visual — ReVeste

> **Guia Oficial de Estilo, Tokens de Design e Acessibilidade**  
> *Identidade visual moderna com Azul Celeste (#8DB9F0), Lavanda Suave (#E9E8F8) e Pêssego Pastel (#F5B69E).*

---

## ☁️ Conceito Visual Oficial

A identidade do **ReVeste** é iluminada, serena e estética, centrada no trio harmonioso:

- **#8DB9F0 (Azul Celeste)**: Cor protagonista da marca. Preenche o **Header**, o **Hero Banner**, o **Footer**, os botões circulares principais de ação (`+`), as categorias ativas e os elementos visuais de maior peso.
- **#E9E8F8 (Lavanda Suave)**: O fundo geral de respiro da página, modais e áreas de descanso visual.
- **#F5B69E (Pêssego Pastel)**: Destaque quente para badges de *Peça Única*, botão da sacolinha, contadores de itens ativos e timer regressivo anti-overselling.
- **#FFFFFF (Branco Seda)**: Superfície dos cards de produto e inputs para destacar as fotografias das roupas.
- **#1E293B (Grafite / Ardósia Escuro)**: Usado exclusivamente para a tipografia e ícones, garantindo nitidez e contraste de leitura sem escurecer os blocos visuais.

---

## 🎨 Tabela Oficial de Tokens de Cor

| Papel na UI | Nome | HEX | RGB | Onde aplicar no ReVeste |
| :--- | :--- | :--- | :--- | :--- |
| **Principal & Marca** | **Azul Celeste** | `#8DB9F0` | `141, 185, 240` | Header, Hero Banner, Footer, botões circulares de ação (`+`), categorias selecionadas e cards de suporte. |
| **Fundo da Página** | **Lavanda Suave** | `#E9E8F8` | `233, 232, 248` | Fundo principal da aplicação e áreas de respiro. |
| **Superfície dos Cards** | **Branco Seda** | `#FFFFFF` | `255, 255, 255` | Cards de produtos, inputs de formulário e dropdowns. |
| **Destaque Extra (Accent)** | **Pêssego Pastel** | `#F5B69E` | `245, 182, 158` | Badges de *"Peça Única"*, botão da sacolinha, timer de reserva e contadores ativos. |
| **Tipografia & Ícones** | **Grafite Suave** | `#1E293B` | `30, 41, 59` | Títulos, textos informativos, preços e ícones sobre fundos claros. |
| **Bordas & Linhas** | **Lavanda Sutil** | `#D8D7EE` | `216, 215, 238` | Divisórias e contornos delicados dos cards. |

---

## 💻 Implementação Técnica

### Variáveis CSS Globais (`:root`)

```css
:root {
  --color-primary: #8DB9F0;       /* Azul Celeste Protagonista */
  --color-bg-main: #E9E8F8;       /* Lavanda Suave (Fundo) */
  --color-surface: #FFFFFF;       /* Branco (Cards) */
  --color-accent: #F5B69E;        /* Pêssego Pastel (Destaque) */
  --color-text-main: #1E293B;     /* Texto Escuro Nítido */
  --color-border: #D8D7EE;        /* Linhas & Bordas */
}
```
