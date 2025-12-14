import { ServiceOption } from './types';

export const SERVICES: ServiceOption[] = [
  { id: 'Baño', icon: 'droplets', label: 'Baño' },
  { id: 'Baño y Corte', icon: 'scissors', label: 'Baño y Corte' },
  { id: 'Adiestramiento', icon: 'award', label: 'Adiestramiento' },
  { id: 'Terapias Holísticas', icon: 'heart', label: 'Terapias Holísticas' }
];

export const DAYS_LIST = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const TIMES_LIST = ['Por la mañana', 'Mediodía', 'Por la tarde'];

export const HAIR_TYPES = ['Corto', 'Largo', 'Rizado', 'Duro', 'Doble Capa'];

export const INITIAL_DOG_STATE = {
  photo: null,
  name: '',
  ownerName: '',
  phone: '',
  breed: '',
  weight: '',
  age: '',
  hairType: 'Corto',
  tags: [],
  service: 'Baño',
  days: [],
  times: [],
  notes: ''
};
