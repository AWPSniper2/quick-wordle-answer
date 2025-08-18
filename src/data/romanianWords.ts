export const ROMANIAN_WORDS: string[] = [
  "CARTE", "LUMEA", "MUNTE", "PAINE", "VREME", "LEMON", "PRIMU", "DORIN", "CARTI", "VERDE",
  "ALBAS", "NEGRU", "GALBI", "ROSIE", "BLOND", "BRUNA", "CALEA", "PIATA", "STRAD", "PUNTE",
  "CUTIE", "BIROU", "SCAUN", "MASUT", "PAHAR", "FARFU", "LINGR", "CUTIT", "TOCAT", "COAPT",
  "FIART", "PRAJI", "GATIT", "MANAC", "BAUTU", "DORMI", "VENIT", "PLEAC", "INTRA", "IESEI",
  "UITAT", "VAZUT", "AUZIT", "SIMTI", "MIROS", "GUSTA", "ATINS", "CANTA", "DANEZ", "JUCAS",
  "ALESG", "MUNCI", "ODIHN", "CITIT", "SCRIS", "DESNA", "COLAT", "VOPSI", "SPALA", "USUCA",
  "CALCA", "COASE", "TRIUC", "TUNDE", "PIEPT", "BARBE", "UNGHH", "OCHII", "NASUL", "GURAT",
  "DINTP", "LIMBA", "URECHH", "CAPUL", "PARUL", "FRUNT", "OBRAJ", "BUZTL", "MENTM", "GATULP",
  "UMARI", "BRATL", "CODRU", "PALMA", "DEGTH", "PIEPT", "SPATE", "BURTA", "SOLDP", "COAPSP",
  "PICIA", "GENUN", "GLEZN", "PICIOP", "DEGTP", "UNGHP", "CARNE", "PIELE", "SANGE", "OASEP",
  "INIMA", "PLAMA", "CREIE", "STOMA", "FIERA", "RINIP", "VESIC", "TIMUS", "PANCR", "SPLINA"
];

export const getRandomWord = (): string => {
  return ROMANIAN_WORDS[Math.floor(Math.random() * ROMANIAN_WORDS.length)];
};

export const isValidWord = (word: string): boolean => {
  return ROMANIAN_WORDS.includes(word.toUpperCase());
};