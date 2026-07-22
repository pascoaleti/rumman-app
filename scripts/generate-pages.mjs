import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] || new URL('../public', import.meta.url).pathname);
const assetVersion = '20260722-2';
const published = '2026-07-22';
const origin = 'https://rumman.app.br';
const cspHashes = new Set();

const legacyBlogFile = join(root, 'blog');
if (existsSync(legacyBlogFile) && statSync(legacyBlogFile).isFile()) {
  rmSync(legacyBlogFile);
}

const articles = [
  {
    slug: 'como-fazer-fluxo-de-caixa-pequena-empresa',
    category: 'Financeiro',
    title: 'Como fazer fluxo de caixa em uma pequena empresa',
    description: 'Aprenda uma rotina simples para registrar entradas e saídas, acompanhar o saldo e usar o fluxo de caixa para decidir com mais segurança.',
    intro: 'Fluxo de caixa não é apenas uma planilha preenchida no fim do mês. É a visão contínua do dinheiro que entrou, do que saiu e dos compromissos que ainda vão vencer.',
    sections: [
      ['O que precisa entrar no controle', ['Registre toda movimentação, inclusive valores pequenos e despesas recorrentes. Separe receitas, despesas, pagamentos a fornecedores, retiradas e compromissos futuros por data e categoria.', 'O saldo do banco sozinho não conta a história completa. Uma venda feita hoje pode ser recebida depois; uma compra já assumida pode vencer na próxima semana. O controle precisa mostrar o presente e o que está contratado.']],
      ['Uma rotina que cabe no dia', ['Reserve poucos minutos no início ou no fim do expediente para lançar movimentos e conferir comprovantes. Quanto maior o intervalo entre o fato e o registro, maior a chance de esquecer detalhes ou duplicar valores.', 'No Rumman, receitas, despesas, categorias e períodos ficam no mesmo fluxo. O objetivo é reduzir o caminho entre registrar e entender, sem transformar o fechamento do caixa em um projeto separado.']],
      ['Como ler o resultado', ['Observe três sinais: saldo atual, contas próximas e diferença entre entradas e saídas no período. Uma queda pontual pode ser prevista; uma tendência recorrente exige revisar preço, prazo, custo ou volume.', 'Use o histórico para fazer perguntas concretas: quais despesas se repetem, quais clientes atrasam, em que semana o caixa aperta e quanto precisa permanecer disponível para a operação.']],
      ['Erros comuns', ['Misturar finanças pessoais e empresariais, lançar apenas valores grandes, ignorar contas futuras e confiar na memória são falhas frequentes. Outro erro é olhar o total sem conferir as categorias que explicam a mudança.', 'Comece simples, mantenha frequência e aumente o detalhamento somente quando ele melhorar uma decisão. Controle útil é aquele que continua sendo usado.']]
    ],
    sources: [['Sebrae — fluxo de caixa para MEI', 'https://meuatendimento.sebrae.com.br/sites/PortalSebrae/artigos/fluxo-de-caixa-para-mei-aprenda-a-controlar-as-financas%2C3930103bc7d1b610VgnVCM1000004c00210aRCRD'], ['Sebrae — como fazer o fluxo de caixa', 'https://sebrae.com.br/sites/PortalSebrae/ufs/ap/artigos/fluxo-de-caixa%2Ca8751947e93c9410VgnVCM2000003c74010aRCRD']]
  },
  {
    slug: 'controle-de-estoque-para-pequenas-empresas',
    category: 'Estoque',
    title: 'Controle de estoque para pequenas empresas: por onde começar',
    description: 'Entenda saldo físico, quantidade reservada, disponibilidade e estoque mínimo para comprar melhor e evitar promessas que o estoque não consegue cumprir.',
    intro: 'Estoque não é apenas contar peças na prateleira. A empresa precisa saber o que existe, o que já está comprometido e o que realmente pode ser usado em uma nova venda ou ordem.',
    sections: [
      ['Três números diferentes', ['Saldo físico é tudo o que está armazenado. Quantidade reservada corresponde ao que já foi separado para trabalhos ou pedidos em aberto. Disponibilidade é o que resta para novas operações.', 'Misturar esses conceitos cria um problema clássico: o sistema mostra dez unidades, mas oito já pertencem a ordens aprovadas. A nova promessa parece possível até o momento da execução.']],
      ['Entradas e saídas com motivo', ['Toda mudança precisa ter origem: compra recebida, consumo em ordem, ajuste de inventário, perda ou devolução. O motivo transforma uma contagem em histórico e permite investigar divergências.', 'O Rumman conecta catálogo, ordens, reservas, compras e movimentações. Assim, uma saída deixa de ser um número solto e passa a fazer parte da operação que a provocou.']],
      ['Estoque mínimo e reposição', ['Defina um ponto de atenção para itens importantes considerando consumo, prazo do fornecedor e margem para imprevistos. Estoque mínimo não é um número universal; ele muda conforme a realidade de cada item.', 'Quando a disponibilidade se aproxima desse limite, a reposição guiada ajuda a preparar uma compra sem esconder a decisão do usuário. Antes de confirmar, revise quantidade, fornecedor e necessidade real.']],
      ['Conferência periódica', ['Faça contagens menores e frequentes em vez de esperar uma grande correção anual. Comece pelos itens de maior valor, uso ou risco de falta.', 'A diferença entre o sistema e o físico deve gerar investigação. Ajustar sem registrar a causa resolve o número de hoje, mas não evita a próxima divergência.']]
    ],
    sources: [['CAIXA — recursos de educação financeira e controle de estoque', 'https://www.caixa.gov.br/educacao-financeira/recursos/Paginas/default.aspx']]
  },
  {
    slug: 'erp-para-empresa-de-servicos',
    category: 'Gestão',
    title: 'ERP para empresa de serviços: o que realmente precisa funcionar',
    description: 'Veja quais fluxos um ERP para prestadores de serviços deve conectar, do primeiro contato ao recebimento, sem criar burocracia desnecessária.',
    intro: 'Uma empresa de serviços não precisa de um ERP enorme. Precisa de continuidade entre cliente, orçamento, execução, materiais, cobrança e histórico.',
    sections: [
      ['Comece pelo fluxo real', ['Mapeie o caminho que já acontece: o cliente pede, a empresa entende a necessidade, prepara uma proposta, executa, registra materiais e recebe. O sistema deve aproximar essas etapas, não impor uma operação paralela.', 'Quando cada etapa vive em uma planilha ou conversa diferente, a equipe repete dados e perde contexto. Um ERP útil reaproveita informações e deixa claro o estado de cada trabalho.']],
      ['Cadastro com contexto', ['Nome e telefone são apenas o começo. Endereço, empresa, observações, tags e histórico ajudam a atender sem depender da memória de uma única pessoa.', 'O cadastro deve ser rápido de consultar no smartphone e próximo das ações relacionadas: orçamento, ordem, documento e financeiro.']],
      ['Da proposta ao caixa', ['Um orçamento aprovado deve poder virar ordem sem redigitação. A execução pode consumir itens, gerar compromissos e preparar o recebimento. Esse encadeamento reduz erro e mostra a situação completa.', 'No Rumman, esses módulos compartilham contexto, mas operações importantes continuam sob confirmação humana. O sistema orienta; a empresa decide.']],
      ['Como avaliar um ERP', ['Teste tarefas comuns, não apenas a tela inicial. Cadastre um cliente, monte uma proposta, transforme em ordem, reserve um item e registre o recebimento.', 'Observe também portabilidade, exportação, privacidade, funcionamento no celular e clareza dos limites do plano. A ferramenta precisa caber na rotina e continuar compreensível quando a empresa crescer.']]
    ],
    sources: [['Sebrae Conecta — soluções de gestão para pequenos negócios', 'https://meuatendimento.sebrae.com.br/sites/PortalSebrae/conecta']]
  },
  {
    slug: 'planilha-ou-sistema-de-gestao',
    category: 'Produtividade',
    title: 'Planilha ou sistema de gestão: quando é hora de mudar',
    description: 'Compare planilhas e um sistema de gestão para descobrir quando o volume, o retrabalho e a falta de contexto justificam a mudança.',
    intro: 'Planilhas são excelentes para começar e analisar dados. O problema aparece quando várias pessoas, arquivos e processos passam a depender de atualizações manuais que já não se encontram.',
    sections: [
      ['Quando a planilha ainda resolve', ['Uma planilha simples funciona bem para poucos registros, uma única pessoa responsável e uma rotina estável. Ela é flexível, conhecida e rápida para testar um controle.', 'O valor da planilha diminui quando a mesma informação precisa ser copiada para clientes, estoque, ordens e financeiro ou quando ninguém sabe qual arquivo é o mais recente.']],
      ['Sinais de que o limite chegou', ['Retrabalho, versões duplicadas, fórmulas quebradas, falta de histórico e dependência de uma pessoa são sinais claros. Outro indício é gastar mais tempo preparando o relatório do que usando o resultado.', 'Se uma venda exige atualizar quatro lugares, o custo do processo já não está apenas na ferramenta: está no tempo e no risco de inconsistência.']],
      ['O que muda com um sistema integrado', ['Cadastros passam a alimentar operações relacionadas. Um orçamento pode virar ordem; a ordem pode reservar estoque; uma compra pode gerar compromisso financeiro.', 'Integração não significa automatizar tudo. Um bom sistema mostra o efeito de cada ação e pede confirmação quando a decisão tem impacto relevante.']],
      ['Migração sem ruptura', ['Escolha um processo prioritário, limpe os dados necessários e estabeleça uma data de início. Evite migrar arquivos antigos apenas porque existem.', 'Mantenha exportações e backups. A mudança deve aumentar o controle do negócio, não criar dependência sem saída.']]
    ],
    sources: [['CAIXA — por que utilizar planilhas de controle', 'https://www.caixa.gov.br/educacao-financeira/empresa/organize-o-futuro/Paginas/default.aspx'], ['Sebrae — planejamento financeiro e planilha de gastos', 'https://meuatendimento.sebrae.com.br/sites/PortalSebrae/artigos/artigosFinancas/o-que-e-planejamento-financeiro-e-como-fazer-a-sua-planilha-de-gastos%2C94168d2dd9b3c810VgnVCM1000001b00320aRCRD']]
  },
  {
    slug: 'como-organizar-cadastro-de-clientes',
    category: 'Clientes',
    title: 'Como organizar o cadastro de clientes sem perder contexto',
    description: 'Monte um cadastro de clientes útil para atendimento, propostas e histórico, com dados necessários, atualização e cuidado com informações pessoais.',
    intro: 'Um cadastro de clientes só cria valor quando ajuda a atender, vender e acompanhar. Acumular campos sem finalidade aumenta trabalho e risco sem melhorar a relação.',
    sections: [
      ['Defina o dado necessário', ['Comece pelo que a rotina usa: nome, contato, empresa, endereço quando necessário, observações objetivas e marcadores que facilitem a busca.', 'Antes de adicionar um campo, pergunte qual decisão ou tarefa ele apoia. Esse filtro reduz cadastros incompletos e evita coletar informações sem propósito.']],
      ['Crie um padrão simples', ['Escolha uma forma única de registrar telefone, nome empresarial, endereço e tags. Defina também quem atualiza o cadastro e em qual momento.', 'Duplicidades aparecem quando a busca não acontece antes do novo registro. Procure por nome, telefone e empresa antes de criar outro cliente.']],
      ['Histórico perto da operação', ['O contexto ganha força quando propostas, ordens, documentos e lançamentos relacionados podem ser encontrados a partir do cliente.', 'No Rumman, o cadastro reúne contato, empresa, endereço, observações e tags e se conecta aos fluxos do ERP. Assim, a equipe consulta o que precisa sem reconstruir a história.']],
      ['Privacidade faz parte da organização', ['Dados pessoais devem ter finalidade clara, acesso adequado e proteção. Evite observações excessivas ou informações sensíveis que não sejam necessárias ao serviço.', 'Mantenha um canal para correção e exclusão quando aplicável. Organização também significa saber onde o dado está e por que ele é usado.']]
    ],
    sources: [['ANPD — titular de dados e boas práticas de proteção', 'https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1']]
  },
  {
    slug: 'orcamento-e-ordem-de-servico-sem-retrabalho',
    category: 'Operações',
    title: 'Orçamento e ordem de serviço sem retrabalho',
    description: 'Entenda como conectar proposta, aprovação, ordem de serviço, materiais e cobrança para reduzir redigitação e perda de informação.',
    intro: 'Orçamento e ordem de serviço cumprem papéis diferentes, mas não deveriam exigir que a equipe escrevesse tudo de novo. A aprovação é a ponte entre a promessa comercial e a execução.',
    sections: [
      ['O orçamento registra a proposta', ['Descreva escopo, itens, quantidades, valores, condições e validade de forma compreensível. O cliente precisa saber o que está incluído e a equipe precisa conseguir executar o que foi proposto.', 'Evite descrições genéricas que dependem da memória de quem negociou. A clareza reduz dúvida e protege a relação.']],
      ['A ordem organiza a execução', ['Depois da aprovação, a ordem reúne responsável, etapas, materiais, observações e estado do trabalho. Ela é o ponto de acompanhamento até a conclusão.', 'Transformar a proposta em ordem preserva cliente, itens e valores. A equipe complementa o necessário sem recriar a operação.']],
      ['Materiais e financeiro conectados', ['Itens comprometidos por uma ordem devem aparecer como reservados. Isso evita prometer a mesma unidade em outro serviço.', 'Na conclusão, o histórico da operação ajuda a conferir consumo e preparar o lançamento financeiro. Cada conexão reduz uma digitação e uma chance de divergência.']],
      ['Uma trilha que todos entendem', ['Use estados objetivos, como rascunho, aprovado, em execução e concluído. Mudanças relevantes devem ficar claras para quem assume o trabalho depois.', 'O Rumman foi desenhado para conduzir esse fluxo com confirmação antes das ações importantes, mantendo a decisão nas mãos do usuário.']]
    ],
    sources: [['Sebrae — custos na prestação de serviços', 'https://bibliotecas.sebrae.com.br/chronus/ARQUIVOS_CHRONUS/bds/bds.nsf/B83E6E16A0097D3A03257146005A1566/%24File/NT00031FB6.pdf']]
  },
  {
    slug: 'como-organizar-compras-e-fornecedores',
    category: 'Compras',
    title: 'Como organizar compras e fornecedores na pequena empresa',
    description: 'Crie um processo simples para selecionar fornecedores, preparar pedidos, conferir recebimentos e conectar compras ao estoque e ao financeiro.',
    intro: 'Comprar bem não é apenas encontrar o menor preço. Prazo, qualidade, disponibilidade e impacto no caixa precisam aparecer na mesma decisão.',
    sections: [
      ['Cadastro que ajuda a comparar', ['Registre contato, produtos atendidos, condições, prazos e observações de desempenho. Um histórico simples evita começar cada cotação do zero.', 'Não concentre toda informação em conversas individuais. O cadastro precisa continuar útil quando outra pessoa assumir a compra.']],
      ['Pedido antes do recebimento', ['Documente item, quantidade, valor, data prevista e condição de pagamento. O pedido cria uma referência para conferir o que chegou e o que foi faturado.', 'Compras sem pedido formalizado dificultam descobrir divergências de quantidade, preço ou prazo.']],
      ['Conferência e atualização', ['No recebimento, compare pedido, material e documento. Registre entrada de estoque apenas para o que foi efetivamente recebido.', 'O Rumman conecta fornecedor, pedido, recebimento, custo médio e compromisso financeiro. A informação segue o fluxo sem esconder a conferência.']],
      ['Comprar pela necessidade real', ['Use disponibilidade, estoque mínimo e demanda das ordens para preparar a reposição. Evite comprar apenas porque o saldo físico parece baixo.', 'A recomendação deve ser ponto de partida. Revise demanda, caixa e prazo antes de confirmar.']]
    ],
    sources: [['Sebrae — seleção e cadastramento de fornecedores', 'https://bibliotecas.sebrae.com.br/chronus/ARQUIVOS_CHRONUS/bds/bds.nsf/202F490181ED36B203256FA4006EA9CC/%24File/NT00030726.pdf']]
  },
  {
    slug: 'como-digitalizar-documentos-da-empresa',
    category: 'Documentos',
    title: 'Como digitalizar e organizar documentos da empresa',
    description: 'Veja uma rotina prática para capturar documentos, reconhecer texto, gerar PDF, nomear arquivos e manter cópias úteis sem acumular desordem digital.',
    intro: 'Digitalizar não é apenas fotografar um papel. O arquivo precisa ser legível, identificável, recuperável e mantido pelo tempo adequado à finalidade da empresa.',
    sections: [
      ['Capture com qualidade', ['Use iluminação uniforme, mantenha o documento plano e enquadre todas as bordas. Confira foco, páginas e orientação antes de encerrar.', 'Quando o documento tem várias páginas, preserve a ordem. Uma captura incompleta pode parecer correta na miniatura e falhar justamente quando for necessária.']],
      ['Transforme imagem em informação', ['OCR reconhece o texto presente na imagem e facilita busca, revisão e reaproveitamento. O resultado deve ser conferido, especialmente em números, nomes e documentos com baixa qualidade.', 'O scanner do Rumman permite câmera ou importação, reconhecimento de texto, documentos multipágina, PDF e compartilhamento no próprio aparelho.']],
      ['Nome e contexto', ['Use nomes consistentes com data, tipo e referência: por exemplo, 2026-07_fornecedor_pedido-103. Pastas e tags devem refletir a forma como a equipe procura.', 'Vincular o arquivo ao cliente ou operação relacionada é mais útil do que depender apenas de uma pasta extensa.']],
      ['Backup e descarte consciente', ['Defina quais documentos precisam de cópia e por quanto tempo. Verifique se o backup pode ser restaurado; uma cópia nunca testada oferece falsa segurança.', 'Antes de descartar papel ou arquivo, considere obrigações fiscais, contratuais e profissionais aplicáveis ao seu negócio. Em caso de dúvida, consulte o contador ou responsável jurídico.']]
    ],
    sources: [['ANPD — guia de segurança para agentes de pequeno porte', 'https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-vf.pdf']]
  },
  {
    slug: 'ia-na-gestao-de-pequenas-empresas',
    category: 'Inteligência',
    title: 'IA na gestão de pequenas empresas: como usar sem perder o controle',
    description: 'Use inteligência artificial para organizar informações e próximos passos, com contexto limitado, revisão humana e cuidado com dados sensíveis.',
    intro: 'A IA pode reduzir o esforço para organizar texto, resumir contexto e preparar próximos passos. Ela não deve esconder decisões financeiras nem agir como fonte única de verdade.',
    sections: [
      ['Comece por tarefas reversíveis', ['Use IA para estruturar anotações, sugerir categorias, resumir documentos e preparar rascunhos. São tarefas em que a pessoa consegue revisar o resultado antes de qualquer efeito operacional.', 'Evite delegar automaticamente pagamentos, exclusões, aprovações ou mudanças irreversíveis. Quanto maior o impacto, maior deve ser a confirmação.']],
      ['Envie apenas o necessário', ['Retire dados pessoais e sigilosos que não ajudam a responder à solicitação. Um bom pedido oferece contexto suficiente sem transmitir a operação inteira.', 'No Assistente Rumman, o envio acontece quando o usuário solicita. Texto, parte limitada do histórico, memória configurada e anexos selecionados compõem o contexto da resposta.']],
      ['Revise fatos e números', ['Respostas de IA podem ser incompletas ou incorretas. Confira nomes, datas, valores e recomendações antes de usar o resultado.', 'O melhor uso é apoiar compreensão e preparação, enquanto o registro final permanece visível e confirmado.']],
      ['Crie uma política simples', ['Defina o que pode ser enviado, quais tarefas exigem revisão e quem responde pela decisão. Mesmo uma equipe pequena se beneficia de regras claras.', 'A política não precisa ser extensa: pode começar com uma lista de dados proibidos, usos permitidos e etapas de conferência.']]
    ],
    sources: [['ANPD — guia de segurança para agentes de pequeno porte', 'https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-vf.pdf']]
  },
  {
    slug: 'privacidade-e-dados-locais-em-erp',
    category: 'Privacidade',
    title: 'Privacidade em ERP: o que significa manter dados sob controle',
    description: 'Entenda coleta necessária, acesso, armazenamento local, nuvem limitada, exportação e exclusão ao escolher um sistema de gestão para sua empresa.',
    intro: 'Um ERP reúne dados de clientes, finanças, documentos e operação. Privacidade precisa fazer parte da arquitetura e da rotina, não aparecer apenas em uma página jurídica.',
    sections: [
      ['Colete com finalidade', ['Cada dado deve apoiar uma tarefa ou obrigação compreensível. Campos sem uso aumentam exposição e dificultam atender pedidos de correção ou exclusão.', 'Mapeie quais informações são necessárias, onde ficam e quem precisa acessá-las. Esse inventário simples é um ponto de partida prático.']],
      ['Local-first e nuvem limitada', ['Arquitetura local-first prioriza o armazenamento no aparelho e usa serviços externos quando existe uma finalidade clara. Isso não elimina a necessidade de backup, proteção do dispositivo e controle de acesso.', 'No Rumman, detalhes operacionais permanecem prioritariamente no smartphone. Conta, proteção, resumo, diagnóstico, assinatura e IA solicitada usam infraestrutura de nuvem conforme a Política de Privacidade.']],
      ['Acesso, exportação e exclusão', ['A empresa precisa conseguir corrigir registros, exportar informações úteis e excluir o que não deve mais ser mantido, respeitando obrigações legais.', 'Proteção biométrica, sessão segura e backups ajudam, mas não substituem processos internos: bloqueio do aparelho, revisão de permissões e cuidado ao compartilhar arquivos.']],
      ['O que verificar em um fornecedor', ['Leia a política, identifique prestadores, finalidades e canais de contato. Pergunte como funciona a exclusão da conta, por quanto tempo diagnósticos permanecem e quais dados são enviados para IA.', 'A ANPD disponibiliza regras e guias específicos para agentes de tratamento de pequeno porte. Eles ajudam a transformar princípios da LGPD em medidas proporcionais à realidade da empresa.']]
    ],
    sources: [['ANPD — regulamentação para agentes de pequeno porte', 'https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022'], ['Política de Privacidade do Rumman', '/privacidade']]
  }
];

const labels = {
  pt: { home: 'Início', features: 'Recursos', how: 'Como funciona', plans: 'Planos', faq: 'FAQ', blog: 'Blog', privacy: 'Privacidade', cta: 'Conhecer o Rumman' },
  en: { home: 'Home', features: 'Features', how: 'How it works', plans: 'Plans', faq: 'FAQ', blog: 'Blog', privacy: 'Privacy', cta: 'Discover Rumman' },
  es: { home: 'Inicio', features: 'Funciones', how: 'Cómo funciona', plans: 'Planes', faq: 'FAQ', blog: 'Blog', privacy: 'Privacidad', cta: 'Conocer Rumman' },
  fr: { home: 'Accueil', features: 'Fonctions', how: 'Fonctionnement', plans: 'Forfaits', faq: 'FAQ', blog: 'Blog', privacy: 'Confidentialité', cta: 'Découvrir Rumman' }
};

function nav(locale = 'pt', current = '') {
  const l = labels[locale];
  const links = [
    ['home', '/', l.home], ['features', '/recursos', l.features], ['how', '/como-funciona', l.how],
    ['plans', '/planos', l.plans], ['faq', '/faq', l.faq], ['blog', '/blog/', l.blog], ['privacy', locale === 'en' ? '/en/privacy' : locale === 'es' ? '/es/privacidad' : locale === 'fr' ? '/fr/confidentialite' : '/privacidade', l.privacy]
  ];
  return `<div class="nav-links">${links.map(([key, href, text]) => `<a class="nav-link" href="${href}"${current === key ? ' aria-current="page"' : ''}>${text}</a>`).join('')}</div><a class="nav-cta" href="/planos">${l.cta}</a>`;
}

function brand() {
  return `<span class="brand-icon"><img src="/assets/rumman-symbol.svg" width="360" height="360" alt=""></span><span class="brand-name">Rumman</span>`;
}

function header(current = '', locale = 'pt') {
  const menuOpen = locale === 'en' ? 'Open menu' : locale === 'es' ? 'Abrir menú' : locale === 'fr' ? 'Ouvrir le menu' : 'Abrir menu';
  const dark = locale === 'en' ? 'Use dark theme' : locale === 'es' ? 'Usar tema oscuro' : locale === 'fr' ? 'Utiliser le thème sombre' : 'Usar tema escuro';
  const light = locale === 'en' ? 'Use light theme' : locale === 'es' ? 'Usar tema claro' : locale === 'fr' ? 'Utiliser le thème clair' : 'Usar tema claro';
  return `<header class="topbar"><nav class="nav" aria-label="Navegação principal"><a class="brand" href="/" aria-label="Rumman — início">${brand()}</a><div class="nav-panel" id="primary-navigation" data-menu-panel data-open="false">${nav(locale, current)}</div><div class="nav-controls"><button class="theme-toggle" type="button" data-theme-toggle data-label-light="${light}" data-label-dark="${dark}" aria-label="${dark}" title="${dark}"><span aria-hidden="true">☾</span></button><button class="menu-toggle" type="button" data-menu-toggle aria-controls="primary-navigation" aria-expanded="false" aria-label="${menuOpen}"><span></span><span></span><span></span></button></div></nav></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="wrap footer-main"><div class="footer-brand-block"><a class="brand footer-brand" href="/">${brand()}</a><p>ERP Android inteligente e guiado para pequenas empresas.</p></div><div class="footer-links"><strong>Produto</strong><a href="/recursos">Recursos</a><a href="/como-funciona">Como funciona</a><a href="/planos">Planos</a><a href="/faq">FAQ</a></div><div class="footer-links"><strong>Conteúdo</strong><a href="/blog">Blog</a><a href="/privacidade">Privacidade</a><a href="/excluir-conta">Excluir conta</a><a href="mailto:e-mail@rumman.app.br">Suporte</a></div><div class="footer-links"><strong>Desenvolvimento</strong><a href="https://pascoal.eti.br" rel="external noopener">Pascoal Eti</a><a href="mailto:devs@pascoal.eti.br">Contato técnico</a></div></div><div class="wrap footer-bottom"><span>© 2026 Rumman</span><span>Desenvolvido por <a href="https://pascoal.eti.br" rel="external noopener">pascoal.eti.br</a></span></div></footer>`;
}

function jsonScript(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  cspHashes.add(`'sha256-${createHash('sha256').update(json).digest('base64')}'`);
  return `<script type="application/ld+json">${json}</script>`;
}

function collectInlineScriptHashes(html) {
  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    cspHashes.add(`'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`);
  }
}

function shell({ title, description, canonical, current, body, structured, type = 'website', locale = 'pt' }) {
  const url = `${origin}${canonical}`;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index, follow, max-image-preview:large"><link rel="canonical" href="${url}"><meta property="og:locale" content="pt_BR"><meta property="og:type" content="${type}"><meta property="og:site_name" content="Rumman"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/rumman-social.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${origin}/assets/rumman-social.png"><meta name="theme-color" content="#FCF9FD" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#17121F" media="(prefers-color-scheme: dark)"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/sora-latin-variable.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/inter-latin-variable.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/site.css?v=${assetVersion}"><script src="/assets/theme-init.js?v=${assetVersion}"></script>${jsonScript(structured)}</head><body><a class="skip-link" href="#conteudo">Ir para o conteúdo</a>${header(current, locale)}<main id="conteudo">${body}</main>${footer()}<script src="/assets/site.js?v=${assetVersion}" defer></script></body></html>`.replaceAll('href="/blog"', 'href="/blog/"');
}

function pageHero(eyebrow, title, lead, extra = '') {
  return `<section class="page-hero marketing-hero"><div class="wrap page-hero-inner"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="hero-lead">${lead}</p></div>${extra}</div></section>`;
}

function cta() {
  return `<section class="final-cta"><div class="wrap final-cta-inner"><div><p class="eyebrow">Rumman · ERP Inteligente Guiado</p><h2>Gestão clara para trabalhar com menos atrito.</h2><p>Organize clientes, caixa, documentos e decisões do dia a dia em uma experiência Android guiada.</p></div><a class="button primary" href="mailto:e-mail@rumman.app.br?subject=Quero%20conhecer%20o%20Rumman">Falar com o Rumman</a></div></section>`;
}

function writeRoute(route, html) {
  const file = route === '/'
    ? join(root, 'index')
    : route === '/blog' || route === '/blog/'
      ? join(root, 'blog', 'index')
      : join(root, route.replace(/^\//, ''));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html, 'utf8');
}

const software = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Rumman', alternateName: 'Rumman: ERP Guiado', applicationCategory: 'BusinessApplication', operatingSystem: 'Android', inLanguage: 'pt-BR', description: 'ERP Android inteligente, local-first e guiado para micro e pequenas empresas.', url: `${origin}/`, image: `${origin}/assets/rumman-social.png`, author: { '@type': 'Organization', name: 'Pascoal Eti', url: 'https://pascoal.eti.br' } };

const homeBody = `<section class="hero"><div class="wrap hero-inner"><div class="hero-copy"><p class="eyebrow"><span class="signal" aria-hidden="true"></span>ERP inteligente guiado · Local-first</p><h1>Seu negócio pede decisões, não planilhas infinitas.</h1><p class="hero-lead">Clientes, vendas, ordens, estoque, compras, caixa, documentos e orientação inteligente em uma experiência Android feita para pequenas empresas.</p><div class="actions"><a class="button primary" href="/recursos">Conhecer os recursos</a><a class="button secondary" href="/como-funciona">Ver como funciona</a></div><p class="release-note">Em preparação para testes fechados no Google Play.</p></div><div class="guided-visual" role="img" aria-label="Ciclo guiado do Rumman"><div class="visual-axis" aria-hidden="true"></div><div class="brand-orbit"><img src="/assets/rumman-symbol.svg" width="360" height="360" alt="Símbolo vetorial do Rumman" fetchpriority="high"></div><ol class="guided-nodes"><li class="node-capture"><span>01</span>Capturar</li><li class="node-understand"><span>02</span>Entender</li><li class="node-confirm"><span>03</span>Confirmar</li><li class="node-register"><span>04</span>Registrar</li><li class="node-follow"><span>05</span>Acompanhar</li></ol></div></div></section><section class="section problem-section"><div class="wrap split-intro"><div class="section-heading"><p class="eyebrow">Menos atrito na gestão</p><h2>Um ERP que ajuda a seguir em frente.</h2></div><div class="section-copy"><p>O Rumman conecta informações que hoje vivem entre mensagens, documentos, planilhas e banco.</p><p>Em vez de esperar que você encontre a tela certa, organiza a operação a partir do contexto e mantém a confirmação humana nas ações importantes.</p><a class="text-link" href="/como-funciona">Conhecer o ciclo guiado <span aria-hidden="true">→</span></a></div></div></section><section class="section home-feature-overview"><div class="wrap"><div class="section-head"><p class="eyebrow">Uma operação conectada</p><h2>Do primeiro contato ao acompanhamento financeiro.</h2><p class="lead">Os módulos compartilham contexto para reduzir redigitação e tornar o próximo passo mais claro.</p></div><div class="overview-grid"><article><span>01</span><h3>Clientes e operações</h3><p>Cadastros, propostas, ordens e histórico no mesmo caminho.</p></article><article><span>02</span><h3>Estoque e compras</h3><p>Saldo físico, reservas, disponibilidade, fornecedores e reposição.</p></article><article><span>03</span><h3>Financeiro</h3><p>Receitas, despesas, categorias, períodos e exportações.</p></article><article><span>04</span><h3>Scanner e assistente</h3><p>Documentos, OCR, texto, voz e anexos com revisão do usuário.</p></article></div><a class="button secondary section-action" href="/recursos">Ver todos os recursos</a></div></section><section class="section privacy-section"><div class="wrap privacy-grid"><div class="privacy-mark" aria-hidden="true"><img src="/assets/rumman-symbol.svg" width="360" height="360" alt="" loading="lazy"></div><div class="privacy-copy"><p class="eyebrow">Privacidade por projeto</p><h2>Seus dados de trabalho continuam sob seu controle.</h2><p>Clientes, lançamentos detalhados, conversas, fotos e documentos ficam prioritariamente no armazenamento privado do aplicativo.</p><p>O Rumman não vende dados e não exibe anúncios.</p><a class="text-link" href="/privacidade">Ler a Política de Privacidade <span aria-hidden="true">→</span></a></div></div></section><section class="section blog-preview"><div class="wrap"><div class="section-head"><p class="eyebrow">Conteúdo para pequenas empresas</p><h2>Organização que começa antes do sistema.</h2><p class="lead">Guias diretos para melhorar caixa, estoque, operação e cuidado com dados.</p></div><div class="blog-grid">${articles.slice(0, 3).map(articleCard).join('')}</div><a class="button secondary section-action" href="/blog">Acessar o blog</a></div></section>${cta()}`;
writeRoute('/', shell({ title: 'Rumman | ERP inteligente e guiado para pequenas empresas', description: 'Organize clientes, vendas, ordens, estoque, compras, caixa e documentos com um ERP Android moderno, local-first e guiado.', canonical: '/', current: 'home', body: homeBody, structured: software }));

const features = [['Painel para entender o momento', 'Clientes, pendências, saldo e o pulso da operação sem atravessar menus intermináveis.'], ['Clientes com contexto', 'Contatos, empresa, endereço, observações, tags, busca e filtros próximos do histórico.'], ['Da proposta à execução', 'Orçamentos, aprovação, conversão em ordem e acompanhamento sem redigitar as mesmas informações.'], ['Estoque que orienta', 'Entradas, saídas, saldo físico, reservas, disponibilidade, mínimo e reposição guiada.'], ['Compras conectadas', 'Fornecedores, pedidos, recebimento, custo médio e compromisso financeiro no mesmo fluxo.'], ['Financeiro direto', 'Receitas, despesas, categorias, períodos, saldo, fluxo de caixa, PDF, XLSX e backup local.'], ['Documentos que viram informação', 'Câmera ou importação, OCR, texto, multipágina, PDF e compartilhamento no aparelho.'], ['Assistente Rumman', 'Texto, voz, anexos, histórico, favoritos, pesquisa e memória sob solicitação do usuário.']];
const featuresBody = `${pageHero('Recursos', 'Os controles essenciais no mesmo fluxo de trabalho.', 'Um sistema de gestão para pequenas empresas organizarem clientes, operações, estoque, compras, financeiro e documentos sem perder contexto.', '<div class="page-symbol"><img src="/assets/rumman-symbol.svg" width="360" height="360" alt=""></div>')}<section class="section features-section"><div class="wrap"><div class="feature-grid page-feature-grid">${features.map((f, i) => `<article class="feature"><span class="feature-code">${String(i + 1).padStart(2, '0')}</span><h2>${f[0]}</h2><p>${f[1]}</p></article>`).join('')}</div><div class="capability-strip"><span>Login por e-mail ou Google</span><span>Proteção biométrica</span><span>Temas claro e escuro</span><span>Dados locais por projeto</span></div></div></section>${cta()}`;
writeRoute('/recursos', shell({ title: 'Recursos do Rumman | ERP para pequenas empresas', description: 'Conheça os recursos do Rumman para clientes, orçamentos, ordens, estoque, compras, financeiro, documentos e assistência guiada.', canonical: '/recursos', current: 'features', body: featuresBody, structured: { ...software, url: `${origin}/recursos` } }));

const cycle = [['Capturar', 'Texto, foto, documento ou informação operacional entram no fluxo.'], ['Entender', 'O conteúdo ganha estrutura e contexto dentro do negócio.'], ['Confirmar', 'O usuário revisa e mantém o controle das operações importantes.'], ['Registrar', 'A informação se transforma em histórico útil e rastreável.'], ['Acompanhar', 'O Rumman traz de volta o que exige atenção e contexto.']];
const howBody = `${pageHero('Como funciona', 'Da informação solta ao histórico que ajuda a decidir.', 'O ciclo guiado reduz o caminho entre entender e agir, sem tirar o comando de quem trabalha.', '<div class="page-symbol"><img src="/assets/rumman-symbol.svg" width="360" height="360" alt=""></div>')}<section class="section guided-section"><div class="wrap"><ol class="cycle-list">${cycle.map((step, i) => `<li><span class="cycle-number">${String(i + 1).padStart(2, '0')}</span><div><h2>${step[0]}</h2><p>${step[1]}</p></div></li>`).join('')}</ol></div></section><section class="section comparison-section"><div class="wrap comparison-grid"><div class="comparison-intro"><p class="eyebrow">Uma diferença prática</p><h2>Gestão guiada, com confirmação humana.</h2><p>O Rumman aproxima contexto e histórico para tornar o próximo passo compreensível.</p></div><table class="comparison-table"><thead><tr class="comparison-row comparison-header"><th>ERP passivo</th><th>Rumman guiado</th></tr></thead><tbody><tr class="comparison-row"><td>Espera que você encontre a tela certa</td><td>Organiza o fluxo a partir da próxima decisão</td></tr><tr class="comparison-row"><td>Módulos desconectados</td><td>Clientes, ordens, estoque, compras e caixa conectados</td></tr><tr class="comparison-row"><td>Automação sem contexto visível</td><td>Confirmação antes das ações importantes</td></tr></tbody></table></div></section>${cta()}`;
writeRoute('/como-funciona', shell({ title: 'Como funciona o Rumman | ERP inteligente guiado', description: 'Entenda o ciclo guiado do Rumman: capturar, entender, confirmar, registrar e acompanhar a operação da pequena empresa.', canonical: '/como-funciona', current: 'how', body: howBody, structured: { ...software, url: `${origin}/como-funciona` } }));

const plansBody = `${pageHero('Planos', 'Escolha o espaço que a sua operação precisa.', 'Planos de lançamento para pequenas empresas, com avaliação Premium e limites transparentes.', '<p class="effective-date">Valores sujeitos à oferta final exibida pela Google Play.</p>')}<section class="section plans-section"><div class="wrap"><div class="plans-grid"><article class="plan"><p class="plan-name">Essencial</p><p class="plan-price"><strong>R$ 49,90</strong><span>/mês</span></p><p class="plan-annual">ou R$ 499 por ano</p><ul><li>1 empresa</li><li>1 usuário</li><li>50 ações de IA por mês</li><li>Fluxos essenciais do ERP</li></ul></article><article class="plan plan-featured"><p class="plan-label">Mais capacidade</p><p class="plan-name">Pro</p><p class="plan-price"><strong>R$ 89,90</strong><span>/mês</span></p><p class="plan-annual">ou R$ 899 por ano</p><ul><li>Até 3 usuários</li><li>Backup e sincronização</li><li>Relatórios avançados</li><li>500 ações de IA por mês</li></ul></article><article class="plan"><p class="plan-name">Equipe</p><p class="plan-price"><strong>R$ 149,90</strong><span>/mês</span></p><p class="plan-annual">ou R$ 1.499 por ano</p><ul><li>Até 10 usuários</li><li>Papéis e permissões</li><li>Auditoria</li><li>1.500 ações de IA compartilhadas</li></ul></article></div><div class="billing-note"><p><strong>15 dias de avaliação Premium.</strong> A avaliação exige ativação da assinatura Google Play. Depois do período, o plano é cobrado se não houver cancelamento.</p><p>Não existe plano gratuito permanente, IA ilimitada ou armazenamento ilimitado.</p></div></div></section>${cta()}`;
writeRoute('/planos', shell({ title: 'Planos do Rumman | ERP guiado para pequenas empresas', description: 'Compare os planos Essencial, Pro e Equipe do Rumman, com 15 dias de avaliação Premium e limites transparentes.', canonical: '/planos', current: 'plans', body: plansBody, structured: { ...software, url: `${origin}/planos`, offers: [{ '@type': 'Offer', priceCurrency: 'BRL', price: '49.90' }, { '@type': 'Offer', priceCurrency: 'BRL', price: '89.90' }, { '@type': 'Offer', priceCurrency: 'BRL', price: '149.90' }] } }));

const faqItems = [['O Rumman é um ERP?', 'Sim. É um ERP guiado para micro e pequenas empresas, reunindo clientes, financeiro, operações, estoque, compras, documentos e assistência operacional.'], ['Tudo fica na nuvem?', 'Não. Os dados detalhados ficam prioritariamente no aparelho. A nuvem é usada de forma limitada para conta, proteção, resumo, diagnóstico, assinatura e IA solicitada.'], ['O Rumman vende meus dados ou mostra anúncios?', 'Não. O Rumman não vende dados e não exibe anúncios.'], ['A IA toma decisões financeiras sozinha?', 'Não. A proposta é orientar e organizar. Operações importantes permanecem sob confirmação e controle do usuário.'], ['Já está disponível no Google Play?', 'Ainda não há ficha pública. O produto está em preparação para testes fechados.'], ['O Rumman controla estoque?', 'Sim. O fluxo registra entradas e saídas, separa saldo físico, reservado e disponível e orienta a reposição. Multi-almoxarifado e logística avançada não fazem parte da oferta atual.']];
const faqBody = `${pageHero('Perguntas frequentes', 'O que saber antes de começar.', 'Respostas objetivas sobre produto, dados, inteligência, estoque e disponibilidade.')}<section class="section faq-section"><div class="wrap faq-layout"><div class="section-heading"><p class="eyebrow">Rumman</p><h2>Clareza também faz parte do produto.</h2></div><div class="faq-list">${faqItems.map(item => `<details><summary>${item[0]}</summary><p>${item[1]}</p></details>`).join('')}</div></div></section>${cta()}`;
writeRoute('/faq', shell({ title: 'Perguntas frequentes sobre o Rumman', description: 'Tire dúvidas sobre o ERP Rumman, funcionamento local-first, inteligência artificial, estoque, privacidade e disponibilidade.', canonical: '/faq', current: 'faq', body: faqBody, structured: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) } }));

function articleCard(article) {
  return `<article class="blog-card"><a class="blog-card-visual" href="/blog/${article.slug}" aria-hidden="true" tabindex="-1"><img src="/assets/rumman-symbol.svg" width="360" height="360" alt="" loading="lazy"></a><div><p class="blog-meta">${article.category} · 6 min</p><h3><a href="/blog/${article.slug}">${article.title}</a></h3><p>${article.description}</p><a class="text-link" href="/blog/${article.slug}">Ler artigo <span aria-hidden="true">→</span></a></div></article>`;
}

const blogBody = `${pageHero('Blog Rumman', 'Gestão prática para pequenas empresas.', 'Conteúdo direto sobre clientes, caixa, estoque, operações, documentos, inteligência e privacidade.')}<section class="section blog-listing"><div class="wrap"><div class="blog-grid">${articles.map(articleCard).join('')}</div></div></section>${cta()}`;
writeRoute('/blog/', shell({ title: 'Blog Rumman | Gestão para pequenas empresas', description: 'Guias sobre fluxo de caixa, estoque, clientes, ordem de serviço, compras, documentos, ERP, inteligência e privacidade.', canonical: '/blog/', current: 'blog', body: blogBody, structured: { '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog Rumman', url: `${origin}/blog/`, inLanguage: 'pt-BR', publisher: { '@type': 'Organization', name: 'Rumman' } } }));

for (const article of articles) {
  const body = `<article class="article"><header class="article-header"><div class="wrap article-header-grid"><div><nav class="breadcrumbs" aria-label="Navegação estrutural"><a href="/">Início</a><span>/</span><a href="/blog">Blog</a><span>/</span><span>${article.category}</span></nav><p class="eyebrow">${article.category}</p><h1>${article.title}</h1><p class="hero-lead">${article.description}</p><p class="article-byline">Equipe Rumman · Atualizado em 22 de julho de 2026 · 6 min de leitura</p></div><div class="article-symbol" aria-hidden="true"><img src="/assets/rumman-symbol.svg" width="360" height="360" alt=""></div></div></header><div class="wrap article-layout"><div class="article-content"><p class="article-intro">${article.intro}</p>${article.sections.map(([heading, paragraphs]) => `<section><h2>${heading}</h2>${paragraphs.map(p => `<p>${p}</p>`).join('')}</section>`).join('')}<section class="article-sources"><h2>Fontes e leitura complementar</h2><ul>${article.sources.map(([name, href]) => `<li><a href="${href}"${href.startsWith('http') ? ' rel="external noopener"' : ''}>${name}</a></li>`).join('')}</ul></section></div><aside class="article-aside"><strong>Leve o controle para a rotina</strong><p>O Rumman conecta clientes, operações, estoque, compras, caixa e documentos em um fluxo guiado.</p><a class="button primary" href="/recursos">Conhecer recursos</a></aside></div></article>${cta()}`;
  const structured = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.description, datePublished: published, dateModified: published, inLanguage: 'pt-BR', mainEntityOfPage: `${origin}/blog/${article.slug}`, image: `${origin}/assets/rumman-social.png`, author: { '@type': 'Organization', name: 'Equipe Rumman' }, publisher: { '@type': 'Organization', name: 'Rumman', logo: { '@type': 'ImageObject', url: `${origin}/assets/icon-512.png` } } };
  writeRoute(`/blog/${article.slug}`, shell({ title: `${article.title} | Rumman`, description: article.description, canonical: `/blog/${article.slug}`, current: 'blog', body, structured, type: 'article' }));
}

const notFound = shell({ title: 'Página não encontrada | Rumman', description: 'A página solicitada não foi encontrada no site do Rumman.', canonical: '/404', current: '', body: `<section class="page-hero"><div class="wrap page-hero-inner"><div><p class="eyebrow">Erro 404</p><h1>Página não encontrada.</h1><p class="hero-lead">O endereço pode ter mudado ou não existir.</p><div class="actions"><a class="button primary" href="/">Voltar ao início</a><a class="button secondary" href="/blog">Acessar o blog</a></div></div></div></section>`, structured: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Página não encontrada' } }).replace('index, follow, max-image-preview:large', 'noindex, follow');
writeRoute('/404', notFound);

const fixedRoutes = [
  ['privacidade', 'pt', 'privacy'], ['en/privacy', 'en', 'privacy'], ['es/privacidad', 'es', 'privacy'], ['fr/confidentialite', 'fr', 'privacy'], ['excluir-conta', 'pt', '']
];
for (const [route, locale, current] of fixedRoutes) {
  const file = join(root, route);
  let html = readFileSync(file, 'utf8');
  html = html.replaceAll('20260721-1', assetVersion)
    .replace(/<span class="brand-icon">[\s\S]*?<\/span><span class="brand-name">Rumman<\/span>/g, brand())
    .replace(/<div class="nav-links">[\s\S]*?<\/div><a class="nav-cta"[\s\S]*?<\/a>/, nav(locale, current))
    .replaceAll('href="/#recursos"', 'href="/recursos"')
    .replaceAll('href="/#como-funciona"', 'href="/como-funciona"')
    .replaceAll('href="/#planos"', 'href="/planos"')
    .replaceAll('href="/#faq"', 'href="/faq"');
  collectInlineScriptHashes(html);
  writeFileSync(file, html, 'utf8');
}

const routes = ['/', '/recursos', '/como-funciona', '/planos', '/faq', '/blog/', ...articles.map(a => `/blog/${a.slug}`), '/privacidade', '/en/privacy', '/es/privacidad', '/fr/confidentialite', '/excluir-conta'];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route, index) => `  <url><loc>${origin}${route}</loc><lastmod>${published}</lastmod><changefreq>${route === '/blog/' ? 'weekly' : 'monthly'}</changefreq><priority>${index === 0 ? '1.0' : route.startsWith('/blog/') ? '0.7' : '0.8'}</priority></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(root, 'sitemap.xml'), sitemap, 'utf8');

const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog Rumman</title><link>${origin}/blog/</link><description>Gestão prática para pequenas empresas.</description><language>pt-BR</language>${articles.map(a => `<item><title>${a.title}</title><link>${origin}/blog/${a.slug}</link><guid>${origin}/blog/${a.slug}</guid><pubDate>Wed, 22 Jul 2026 12:00:00 -0300</pubDate><description>${a.description}</description></item>`).join('')}</channel></rss>`;
writeFileSync(join(root, 'feed.xml'), feed, 'utf8');

const accessFile = join(root, '.htaccess');
let access = readFileSync(accessFile, 'utf8');
access = access.replace(/script-src 'self'(?: '[^']+')*;/, `script-src 'self' ${[...cspHashes].join(' ')};`);
writeFileSync(accessFile, access, 'utf8');

process.stdout.write(`Páginas geradas: ${routes.length} rotas e ${articles.length} artigos.\n`);
