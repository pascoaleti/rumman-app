# Relatorio de qualidade - Rumman site 0.3.4

Data: 28 de julho de 2026.

## Escopo validado

- 89 paginas HTML geradas;
- 88 URLs indexaveis no sitemap;
- 10 artigos publicados em quatro idiomas;
- oito capturas finais do aplicativo, convertidas para WebP e usadas na pagina Como usar;
- home, Recursos, Como funciona, Como usar, Casos de uso, Planos, FAQ, Blog, paginas legais, suporte e 404;
- status comercial apresentado como testes fechados no Google Play.

## Lighthouse local

Auditoria mobile da home em Chromium headless:

| Categoria | Resultado |
|---|---:|
| Performance | 84 |
| Accessibility | 100 |
| Best Practices | 92 |
| SEO | 100 |

- FCP: 1,6 s;
- LCP: 4,5 s;
- TBT: 0 ms;
- CLS: 0.

O teste foi executado em ambiente local compartilhado. A validacao de producao deve considerar tambem cache, compressao e latencia reais do dominio.

## Teste visual e responsivo

Temas claro e escuro auditados em desktop e celular.

- viewport mobile de 390 x 844 sem rolagem horizontal;
- margem lateral de 15 px preservada no cabecalho, conteudo e rodape;
- menu recolhido funcional, com estado e rotulo acessiveis;
- galeria com uma tela por linha no celular, duas no tablet e quatro no desktop;
- imagens sem cortes, distorcao ou sobreposicao;
- oito telas finais renderizadas em 720 x 1280;
- rodape, seletor de idioma, botoes e links sem colisao;
- foco visivel e navegacao por teclado preservados.

## Rotas, semantica e SEO

- um H1 por pagina;
- `lang`, `title`, description, canonical, robots e hreflang conferidos;
- `x-default` aponta para a versao em portugues;
- 404 com `noindex, follow`;
- JSON-LD validado no build;
- sitemap com 88 URLs e links internos sem quebra;
- Open Graph e Twitter Card com dimensoes e texto alternativo;
- conteudo essencial disponivel sem JavaScript.

## Conteudo e produto

- nenhuma tela provisoria ou inventada;
- planos e periodo de teste descritos sem prometer compra pelo site;
- backup portatil `.rumman`, restauracao e sincronizacao descritos com seus limites;
- estoque por local, locacoes e fluxo guiado apresentados sem promessas futuras;
- nenhum acesso indiscriminado a testes ou disponibilidade publica anunciados.

## Seguranca

- CSP sem `unsafe-inline`;
- hashes SHA-256 calculados automaticamente para cada JSON-LD;
- Cloudflare Web Analytics permitido apenas pelos hosts oficiais na CSP;
- `nosniff`, protecao contra framing, Referrer Policy e Permissions Policy;
- HTML sem atributos de evento, estilos inline ou scripts executaveis inline;
- varredura do conteudo publico sem chaves, senhas, hosts internos ou credenciais.

## Validacao de producao

- pacote 0.3.4 publicado em `https://rumman.app.br`;
- home, Recursos, Como usar, Planos, FAQ, Blog, Privacidade e Termos retornam HTTP 200;
- sitemap, robots e as oito telas finais retornam HTTP 200;
- rota inexistente retorna HTTP 404 com `noindex, follow`;
- HTML usa os assets versionados `20260728-1`;
- home e FAQ informam corretamente o teste fechado no Google Play;
- pagina Como usar referencia as oito capturas finais;
- CSP, HSTS, `nosniff` e protecao contra framing confirmados no dominio.
- viewport de 390 x 844 sem overflow e com 15 px nas laterais de cabecalho, conteudo e rodape;
- nenhum erro ou aviso no console durante a verificacao da home e da galeria.
