# 🍔 Two Burger Montijo — Website Oficial

> **Hamburgueria Artesanal, Experiência Gastronómica & Take Away**  
> Website oficial do restaurante **Two Burger** no centro histórico do Montijo, desenvolvido com foco em performance, acessibilidade WCAG, SEO Local / AEO e experiência de utilizador imersiva.

🌐 **Website:** [twoburger.com](https://twoburger.com/)  
📍 **Localização:** Rua Miguel Pais, nº 8, 2870-235 Montijo  
📞 **Take Away & Reservas:** +351 910 393 294  
📸 **Instagram:** [@2burger_montijo](https://www.instagram.com/2burger_montijo/)  

---

## 📖 Sobre o Projeto

Este projeto consiste na plataforma web oficial da hamburgueria artesanal **Two Burger Montijo**. A interface combina uma estética editorial gastronómica de alto contraste com interações inspiradas na operação real de uma cozinha artesanal, proporcionando um acesso rápido ao cardápio completo, encomendas *Take Away*, prémios de excelência e informações de contacto.

### ✨ Funcionalidades em Destaque

- **🧾 Comanda de Cozinha Interativa (*Kitchen Ticket Modal*):** Menu de navegação estilizado como um talão de pedido real de cozinha, com carimbo de data e hora atualizado em tempo real, fecho rápido por tecla `Escape` ou *light-dismiss* e gestão rigorosa de foco (`inert` e atributos ARIA).
- **🍔 Cardápio Interativo com Filtros Dinâmicos:** Exploração fluida das especialidades da casa (Entradas, Hambúrgueres Artesanais em Pão Brioche ou Bolo do Caco, Opções Vegetarianas/Vegans, Saladas & Poke Bowls e Sobremesas Caseiras), tanto na *landing page* (`index.html`) como na carta completa (`menu.html`).
- **🎨 Design System Exclusivo:** Construído estritamente sobre a paleta cromática da marca (`#000000`, `#ffffff` e `#382315`), combinando a tipografia de impacto **Bebas Neue** com a legibilidade moderna da **Plus Jakarta Sans**.
- **📍 SEO Local, Georreferenciação (GEO) & AEO:**
  - Dados estruturados **Schema.org (`JSON-LD`)** para `Restaurant` e `FAQPage`.
  - Metadados geográficos (`geo.region`, `geo.position`, `ICBM`) otimizados para pesquisas locais no Montijo.
  - Secção de Perguntas Frequentes (FAQ) em acordeão acessível para motores de resposta (*Answer Engine Optimization*).
- **♿ Acessibilidade Web (WCAG 2.2):** *Skip links* para saltar diretamente para o conteúdo principal, semântica HTML5 rigorosa, estados de foco visíveis e navegação integral via teclado e leitores de ecrã.
- **🔒 Segurança & Performance em Produção:**
  - Forçamento automático de HTTPS no cliente (`js/main.js`) e no servidor (`.htaccess`).
  - Cabeçalhos de segurança HTTP (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Content-Security-Policy`).
  - Cache de longa duração otimizada para CDN (`hcdn` / Apache).
- **📄 Páginas Legais & Página 404 Temática:** Conformidade legal completa (`politica-privacidade.html`, `politica-cookies.html`, `termos-condicoes.html`) e página de erro `404.html` personalizada.

---

## 🗂️ Estrutura do Projeto

```text
twoburger/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD (Build & Deploy automático na branch main)
├── assets/
│   ├── favicon/                # Favicon vetorial (SVG)
│   ├── imagem/
│   │   ├── logo-uber-eats/     # Recursos de parceiros de entrega
│   │   ├── menu/               # Fotografia gastronómica (Entradas, Hambúrgueres, Sobremesas)
│   │   └── premios/            # Selos e distinções (Cinco Estrelas, PME Excelência, PME Líder, etc.)
│   └── logo/                   # Logótipo oficial Two Burger
├── css/
│   └── style.css               # Folha de estilos principal (Variáveis CSS, Grid, Flexbox, Responsividade)
├── js/
│   └── main.js                 # Lógica de interface (Comanda, Filtros, Acordeão FAQ, HTTPS Enforcer)
├── .gitignore                  # Exclusão de ficheiros locais, agentes e artefactos de crawlers
├── .htaccess                   # Regras Apache / Hostinger (HTTPS 301, HSTS, Headers e Cache)
├── 404.html                    # Página de erro 404 personalizada
├── index.html                  # Página principal (Hero, Destaques, Menu, Prémios, FAQ e Contactos)
├── menu.html                   # Carta digital completa do restaurante
├── politica-cookies.html       # Política de Cookies
├── politica-privacidade.html   # Política de Privacidade e Proteção de Dados (RGPD)
├── termos-condicoes.html       # Termos e Condições de Utilização
└── README.md                   # Documentação do projeto
```

---

## 🛠️ Tecnologias Utilizadas

- **Marcação & Estrutura:** HTML5 Semântico + Schema.org JSON-LD
- **Estilização:** CSS3 Moderno (Custom Properties, CSS Grid, Flexbox, Media Queries, Animações GPU-accelerated)
- **Interatividade:** JavaScript Vanilla (ES6+, DOM API, Eventos Acessíveis)
- **Tipografia:** Google Fonts (*Bebas Neue* & *Plus Jakarta Sans*)
- **Servidor & CDN:** Apache `.htaccess` (otimizado para Hostinger / `hcdn`)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🚀 CI/CD — Build e Deploy Automático

O repositório inclui um workflow do **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) configurado para ser executado automaticamente em cada `push` na branch `main` (ou manualmente via `workflow_dispatch`):

1. **Validação de Integridade:** Verifica a presença de todas as páginas HTML principais, folha de estilos (`css/style.css`) e scripts (`js/main.js`).
2. **Build de Produção (`./dist`):** Empacota todos os ficheiros estáticos de produção (`*.html`, `.htaccess`, `css/`, `js/`, `assets/`) num diretório limpo.
3. **Publicação de Artefacto & Deploy:** Carrega o artefacto de produção (`twoburger-production-build`) e executa o deploy automático para o GitHub Pages quando ativo no repositório.

## ⚖️ Direitos de Autor e Propriedade Intelectual

Todos os direitos reservados &copy; **Two Burger Montijo**.  
As fotografias gastronómicas, logótipos, identidade visual e código-fonte presentes neste repositório destinam-se exclusivamente à operação e presença digital oficial da marca **Two Burger**.
