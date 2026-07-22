# Rumman - site institucional 0.2.0

Site estático oficial do **Rumman - ERP Inteligente Guiado**, preparado para `https://rumman.app.br`.

## Escopo

- arquitetura multipágina responsiva em tema claro e escuro;
- símbolo vetorial derivado da marca canônica, sem moldura ou fundo decorativo;
- páginas independentes para recursos, funcionamento, planos, FAQ e blog;
- dez artigos editoriais sobre gestão de pequenas empresas;
- Política de Privacidade em português, inglês, espanhol e francês;
- página oficial de exclusão de conta e dados;
- SEO técnico, Open Graph, JSON-LD, sitemap, feed, robots, manifest e 404;
- headers de segurança, cache, compressão e redirects para Apache/Virtualmin;
- fontes Inter e Sora locais, licenciadas sob SIL Open Font License 1.1.

## Estrutura

```text
public/       fonte estático e páginas geradas
dist/         build auditado e pronto para o Virtualmin
scripts/      gerador, auditor, build e servidor local
proof/        evidências internas; nunca entra no repositório público
qa-output/    relatórios locais; ignorados pelo Git
```

## Executar localmente

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build.ps1
node .\scripts\dev-server.mjs .\dist 8766
```

Acesse `http://127.0.0.1:8766/`.

## Build

O build gera as páginas de marketing e blog, recalcula os hashes CSP dos dados estruturados, valida metadados e links internos e copia a saída aprovada para `dist/`. O script também confirma que o destino resolvido continua dentro deste projeto antes de limpar a pasta.

## Assets do aplicativo

O site não usa capturas provisórias, mockups de celular ou telas inventadas. O símbolo vetorial publicado foi desenhado a partir da marca facetada canônica e é mantido junto das provas de origem no repositório privado.

## Rotas

- `/`
- `/recursos`
- `/como-funciona`
- `/planos`
- `/faq`
- `/blog`
- `/blog/{artigo}`
- `/privacidade`
- `/en/privacy`
- `/es/privacidad`
- `/fr/confidentialite`
- `/excluir-conta`
- `/privacy` redireciona para `/privacidade`
- `/delete-account` redireciona para `/excluir-conta`

### Termos de Uso

`/termos` não integra o build atual. O documento canônico exige nome ou razão social, CPF/CNPJ e endereço completo do fornecedor. A rota somente pode ser criada e publicada depois que o proprietário fornecer e aprovar esses dados, sem placeholders.

## Qualidade

Consulte [QA-REPORT.md](QA-REPORT.md). A medição Lighthouse da home obteve 99/100/100/100. O projeto não usa cookies não essenciais, trackers, CDN de fontes, banco de dados ou chamadas ao backend do aplicativo.

## Licença

O código e o conteúdo do site seguem [LICENSE](LICENSE). As licenças das fontes estão em `public/assets/fonts/`.
