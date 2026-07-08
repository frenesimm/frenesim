/**
 * FRENESIM — data.js v2
 * Constantes de conteúdo. Edite aqui para atualizar o site sem mexer no HTML.
 * Fonte da verdade: pastas ID/ (logo, fontes) e este arquivo (conteúdo).
 */

export const EVENTO = {
  nome:       'FRENESIM',
  edicao:     '2ª Edição',
  data:       '14 de Novembro de 2026',
  dataISO:    '2026-11-14',
  cidade:     'Goiânia',
  estado:     'GO',
  pais:       'Brasil',
  descricao:  'Desfile-festa de moda autoral e alternativa.',
  formato:    ['Passarela', 'Performance', 'Música ao vivo', 'Gastronomia'],

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
  contratacao: 'Até 21/09/2026',
  pagamento: ['Pix', 'Crédito em até 12x (com taxa da maquininha)'],
  vagas: { vestuario: 6, acessorios: 3 },
  criterios: [
    'Design autoral',
    'Alinhamento estético com a proposta do evento',
    'Enraizamento e pertencimento (valorização de grupos sub-representados)',
    'Impacto cultural',
    'Maturidade produtiva',
    'Consistência da proposta',
  ],
};

export const PACOTES = {
  vestuario: [
    {
      id:       'vestuario-essencial',
      nome:     'Pacote Vestuário',
      nomeLong: 'Pacote Essencial (apenas desfile)',
      preco:    'R$ 175,00',
      destaque: false,
      inclui: [
        '8 looks completos no desfile oficial',
        'Inclusão no mapa do evento',
        'Presença na campanha pré-evento',
        'Fotos de passarela pós-evento',
        'Participação no fashion film institucional',
        '1 ingresso + 1 credenciamento',
      ],
    },
    {
      id:       'vestuario-plus',
      nome:     'Pacote Vestuário Plus',
      nomeLong: 'Pacote Expansão (desfile + exposição)',
      preco:    'R$ 350,00',
      destaque: true,
      inclui: [
        'Tudo do Pacote Vestuário',
        'Pop-up store no local do evento',
        '26 imagens de ensaio editorial exclusivo',
        '2 ingressos + 2 credenciamentos',
      ],
    },
    {
      id:       'vestuario-premium',
      nome:     'Pacote Vestuário Premium',
      nomeLong: 'Pacote Exclusivo (desfile + exposição + mídia)',
      preco:    'R$ 600,00',
      destaque: false,
      inclui: [
        'Tudo do Pacote Vestuário Plus',
        'Feature exclusivo pré-evento',
        'Mini-documentário/fashion film exclusivo da marca',
        '48 imagens de ensaio editorial',
        '3 ingressos + 2 credenciamentos',
      ],
    },
  ],
  acessorios: [
    {
      id:       'acessorios-essencial',
      nome:     'Pacote Acessórios',
      nomeLong: 'Pacote Essencial',
      preco:    'R$ 150,00',
      destaque: false,
      inclui: [
        'Curadoria de peças para até 16 looks',
        'Presença na campanha digital pré-evento',
        'Fotos pós-evento',
        'Participação no fashion film institucional',
        '1 ingresso + 1 credenciamento',
      ],
    },
    {
      id:       'acessorios-plus',
      nome:     'Pacote Acessórios Plus',
      nomeLong: 'Pacote Expansão',
      preco:    'R$ 300,00',
      destaque: true,
      inclui: [
        'Tudo do Pacote Acessórios',
        'Inclusão no mapa do evento',
        'Pop-up store no local',
        'Feature exclusivo pré-evento',
        'Material fotográfico editorial individualizado',
        '2 ingressos + 2 credenciamentos',
      ],
    },
  ],
};

export const PRIMEIRA_EDICAO = {
  ano: '2024',
  numeros: [
    { valor: '+300', label: 'Pessoas pagantes' },
    { valor: '6',    label: 'Marcas locais' },
    { valor: '165K', label: 'Alcance social' },
    { valor: '+600', label: 'Looks na passarela' },
  ],
  programacao: [
    'Marcas locais de Goiânia',
    'VJ Lucas Trabachini',
    'DJ Nalú',
    'DJ KFnoBeat',
    'Gastronomia no local',
  ],
};

export const PATROCINADORES = [
  {
    id:        'glimmer',
    nome:      'Glimmer',
    categoria: 'Parceiro Oficial de Bebidas',
    descricao: 'Bebida low-calorie com e sem álcool. Ativação e open bar no FRENESIM 2ª edição.',
    logo:      null,             // Substituir com caminho da logo quando disponível
    destaque:  true,
  },
];

export const CRONOGRAMA = [
  { data: '02/08',    titulo: 'Publicação do Edital', sub: 'Abertura oficial das informações para marcas', destaque: false },
  { data: '03/08',    titulo: 'Inscrições Abertas',   sub: 'Online, gratuito, formulário', destaque: false },
  { data: '03/09',    titulo: 'Encerramento',         sub: 'Até 23h59', destaque: false },
  { data: '09/09',    titulo: 'Resultado do Edital',  sub: 'Divulgação das marcas selecionadas', destaque: false },
  { data: 'Até 21/09',titulo: 'Contratação',          sub: 'Confirmação e pagamento dos pacotes', destaque: false },
  { data: 'Out-Nov',  titulo: 'Pré-Produção',         sub: 'Ensaios, curadoria de looks — datas a confirmar', destaque: false },
  { data: '14/11',    titulo: 'FRENESIM — 2ª Edição', sub: 'Goiânia, GO · Da passarela pra pista', destaque: true },
  { data: 'Nov',      titulo: 'Pós-Evento',           sub: 'Entrega de fotos, fashion film e conteúdo editorial', destaque: false },
];
