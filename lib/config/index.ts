import 'react-native';

/*
 * Importa a lib de forma inline e opcional para não obrigar os demais repositórios
 * a instalarem o também.
 */
let CalendarLocaleConfig: any = {
  locales: {},
};
/* istanbul ignore next */
try {
  if (require('react-native-calendars')) {
    CalendarLocaleConfig = require('react-native-calendars').LocaleConfig;
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(err);
  }
}

// TODO: essas strings de internacionalização devem vir do módulo de tradução no futuro, assim como as cores vem do tema.

CalendarLocaleConfig.locales['pt-BR'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: ['Hoje'],
};

CalendarLocaleConfig.defaultLocale = 'pt-BR';
