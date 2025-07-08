const CREATE_PLANNING_EXISTE = 'E0001';
const UPDATE_PLANNING_EXISTE = 'E0002';
const PLANNING_NOT_FOUND = 'E0003';
const INSUFFICIENT_SOLDE = 'E0004';
const PLANNING_HAS_SESSION = 'E0005';
const PLANNING_HAS_SESSION_OR_HAS_ALREADY_PROPOSITION = 'E0006';
const PROPOSITION_HAS_ALREADY_ACTIVATED = 'E0007';
const ANNULATION_DOSNT_ANNULABLE = 'E0008';
const ANNULATION_ALREADY_JUSTIFIED = 'E0009';

export const errorsMessages = {
    [CREATE_PLANNING_EXISTE]: 'Le planning ou disponibilité existe déja',
    [UPDATE_PLANNING_EXISTE]: 'Le planning ou disponibilité existe déja',
    [PLANNING_NOT_FOUND]: "Le planning n'existe pas",
    [INSUFFICIENT_SOLDE]: 'Solde insuffisant',
    [PLANNING_HAS_SESSION]: 'Le planning existe déja',
    [PLANNING_HAS_SESSION_OR_HAS_ALREADY_PROPOSITION]:
        'Impossible de réserver cette proposition, il est déjà réservée!',
    [PROPOSITION_HAS_ALREADY_ACTIVATED]: 'Le Créneau à déjà été pris',
    [ANNULATION_DOSNT_ANNULABLE]: "l'annulation n'est pas annulable",
    [ANNULATION_ALREADY_JUSTIFIED]: "l'annulation est déjà justifiée",
};
