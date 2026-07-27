/**
 * FRENESIM — data.js v3
 * Constantes de conteúdo. Edite aqui para atualizar o site sem mexer no HTML.
 * Fonte da verdade: pastas ID/ (logo, fontes) e este arquivo (conteúdo).
 */

export const EVENTO = {
  nome:       'FRENESIM',
  edicao:     '2º edição',
  data:       '14 de Novembro de 2026',
  dataISO:    '2026-11-14',
  cidade:     'Goiânia',
  estado:     'GO',
  pais:       'Brasil',
  descricao:  'Desfile-festa em Goiânia. Passarela, performance e pista na mesma noite.',
  tagline:    'Moda é festa — Festa é moda',
  formato:    ['Passarela', 'Performance', 'Pista'],

  localConfirmado: false,
  local:       null,              // Atualizar quando confirmar
  localBairro: null,
};

export const EQUIPE = [
  { funcao: 'Criação & Direção', nomes: 'Laura Calais & Thayna Alves Morais' },
  { funcao: 'Cidade',            nomes: 'Goiânia, GO — Brasil' },
  { funcao: 'Formato',           nomes: 'Desfile-Festa Anual' },
];

export const CONTATO = {
  email:     'frenesimdf@gmail.com',
  instagram: '@frenesimm',
  instagramUrl: 'https://instagram.com/frenesimm',
};

export const EDITAL = {
  formularioUrl: '#',       // Substituir com link real do formulário
  pdfUrl:        '#',       // Substituir com link do PDF do edital
  inscricoes: {
    inicio: '03/08/2026',
    fim:    '03/09/2026',
    horario: '23h59',
    custo:  'Gratuito',
    formato: 'Online',
  },
  resultado: '09/09/2026',
  contratacao: '21/09/2026',
  pagamento: ['Pix', 'Crédito em até 12x (com taxa da maquininha)'],
  vagas: { vestuario: 6, acessorios: 4 },
};

export const PACOTES = {
  vestuario: [
    {
      id:       'vestuario-essencial',
      nome:     'Essencial',
      nomeLong: 'Apenas desfile',
      preco:    'R$ 175,00',
      destaque: false,
      inclui: [
        'Apresentação de 8 (oito) looks completos no desfile oficial',
        'Inserção em toda a campanha de comunicação pré-evento (feed, stories, assessoria de imprensa)',
        'Entrega de material fotográfico de passarela pós-evento (alta resolução com tratamento de cor)',
        'Participação e veiculação da marca no fashion film institucional da edição (com inserção nos créditos)',
        '1 ingresso de acesso geral + 1 credenciamento para o representante/estilista da marca'
      ],
    },
    {
      id:       'vestuario-expansao',
      nome:     'Expansão',
      nomeLong: 'Desfile + exposição',
      preco:    'R$ 350,00',
      destaque: true,
      inclui: [
        'Apresentação de 8 (oito) looks completos no desfile oficial',
        'Inserção em toda a campanha de comunicação pré-evento (feed, stories, assessoria de imprensa)',
        'Entrega de material fotográfico de passarela pós-evento (alta resolução com tratamento de cor)',
        'Participação e veiculação da marca no fashion film institucional da edição (com inserção nos créditos)',
        '<strong>26 imagens em formato de ensaio editorial exclusivo, editadas e tratadas pós-evento</strong>',
        '<strong>Produção e veiculação de feature promocional (conteúdo audiovisual exclusivo) nas redes do Frenesim antes do evento</strong>',
        '<strong>Produção e entrega de fashion film individualizado e exclusivo para uso livre da marca</strong>',
        '<strong>2 ingressos de acesso geral + 1 credenciamento para o representante</strong>'
      ],
    }
  ],
  acessorios: [
    {
      id:       'acessorios-essencial',
      nome:     'Essencial',
      nomeLong: 'Acessórios',
      preco:    'R$ 150,00',
      destaque: false,
      inclui: [
        'Disponibilização e curadoria de peças para composição de até 16 (dezesseis) looks na passarela oficial (em colaboração com as marcas de vestuário ou styling do evento)',
        'Inserção na campanha de comunicação digital pré-evento (feed, stories, assessoria de imprensa)',
        'Entrega de material fotográfico de passarela (detalhes e geral) pós-evento',
        'Participação e veiculação da marca no fashion film institucional da edição (com inserção nos créditos)',
        '1 ingresso de acesso geral + 1 credenciamento para o representante da marca'
      ],
    },
    {
      id:       'acessorios-expansao',
      nome:     'Expansão',
      nomeLong: 'Acessórios',
      preco:    'R$ 300,00',
      destaque: true,
      inclui: [
        'Disponibilização e curadoria de peças para composição de até 16 (dezesseis) looks na passarela oficial (em colaboração com as marcas de vestuário ou styling do evento)',
        'Inserção na campanha de comunicação digital pré-evento (feed, stories, assessoria de imprensa)',
        'Entrega de material fotográfico de passarela (detalhes e geral) pós-evento',
        'Participação e veiculação da marca no fashion film institucional da edição (com inserção nos créditos)',
        '<strong>Produção e veiculação de feature promocional (conteúdo audiovisual exclusivo) nas redes do Frenesim antes do evento</strong>',
        '<strong>26 imagens em formato de ensaio editorial individualizado e editado de cada acessório participante, entregue pós-evento</strong>',
        '<strong>2 ingressos de acesso geral + 1 credenciamento para o representante</strong>'
      ],
    }
  ],
};

export const PRIMEIRA_EDICAO = {
  ano: '2024',
  numeros: [
    { valor: '+330', label: 'Pessoas pagantes' },
    { valor: '6',    label: 'Marcas locais' },
    { valor: '165K', label: 'Alcance social' },
    { valor: '25', label: 'Looks desfilados' },
  ],
  programacao: [
    'Marcas locais de Goiânia',
    'VJ Lucas Trabachini',
    'DJ Nalú',
    'DJ KFnoBeat',
    'Gastronomia no local',
  ],
};

export const PATROCINADORES = [];

export const CRONOGRAMA = [
  { data: '03/08/2026',         titulo: 'Abertura das inscrições online', sub: '', destaque: false },
  { data: '03/09/2026',         titulo: 'Encerramento das inscrições', sub: '— até 23h59', destaque: false },
  { data: '04/09 a 08/09/2026', titulo: 'Período de análise curatorial', sub: '', destaque: false },
  { data: '09/09/2026',         titulo: 'Publicação dos resultados preliminares com pontuações', sub: '', destaque: false },
  { data: '10/09 a 14/09/2026', titulo: 'Prazo para recurso administrativo', sub: '', destaque: false },
  { data: '15/09/2026',         titulo: 'Publicação final dos resultados', sub: '', destaque: true },
];
