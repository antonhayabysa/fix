import UserStore from './UserStore.js';
import geoPskov from '../pskov.json';
import geoSmolensk from '../smolensk.json';
import velizh from '../Velizh.json';
import vyazma from '../Vyazma.json';
import gagarin from '../Gagarino.json';
import demidov from '../Demidov.json';
import dorogobuzh from '../Dorogobuzh.json';
import dukhovishchina from '../Dukhovshchina.json';
import roslavl from '../Roslavl.json';
import shumyachi from '../Shumyachi.json';
import yershichi from '../Yershichi.json';
import yelnya from "../Yelnya.json";
import yarotsev from "../Yartsevo.json";
import ugra from "../Ugra.json";
import temkino from "../Temkino.json";
import sychevka from "../Sychevka.json";
import safonovo from "../Safonovo.json";
import rudnya from "../Rudnya.json";
import repair from "../Repairs.json";
import red from "../Red.json";
import novodugino from "../Novodugino.json";
import monast from "../Monast.json";
import khislavichi from "../Khislavichi.json";
import kardymovo from "../Kardymovo.json";
import holm_Zhirkovsky from "../Holm-Zhirkovsky.json";
import glinkа from "../Glinka.json";
import desnogorsk from "../Desnogorsk.json";

export const citySelector = [
  {label: 'Псков', value: 'Pskov'},
  {label: 'Смоленск', value: 'Smolensk'},
  {label: 'Велиж', value: 'Velizh'},
  {label: 'Вязьма', value: 'Vyazma'},
  {label: 'Гагарин', value: 'Gagarin'},
  {label: 'Демидов', value: 'Demidov'},
  {label: 'Дорогобуж', value: 'Dorogobuzh'},
  {label: 'Духовщина', value: 'Dukhovshchina'},
  {label: 'Рославль', value: 'Roslavl'},
  {label: 'Шумячи', value: 'Shumyachi'},
  {label: 'Ершичи', value: 'Yershichi'},
  {label: 'Ельня', value: 'Yelnya'},
  {label: 'Ярцево', value: 'Yartsevo'},
  {label: 'Угра', value: 'Ugra'},
  {label: 'Темкино', value: 'Temkino'},
  {label: 'Сычёвка', value: 'Sychevka'},
  {label: 'Сафоново', value: 'Safonovo'},
  {label: 'Рудня', value: 'Rudnya'},
  {label: 'Починок', value: 'Repairs'},
  {label: 'Красный', value: 'Red'},
  {label: 'Новодугино', value: 'Novodugino'},
  {label: 'Монастырщина', value: 'Monast'},
  {label: 'Хиславичи', value: 'Khislavichi'},
  {label: 'Кардымово', value: 'Kardymovo'},
  {label: 'Холм-Жирковский', value: 'Holm-Zhirkovsky'},
  {label: 'Глинка', value: 'Glinkа'},
  {label: 'Десногорск', value: 'Desnogorsk'},
];

export const cityRelations = {
  ['Pskov']: geoPskov,
  ['Smolensk']: geoSmolensk,
  ['Velizh']: velizh,
  ['Vyazma']: vyazma,
  ['Gagarin']: gagarin,
  ['Demidov']: demidov,
  ['Dorogobuzh']: dorogobuzh,
  ['Dukhovshchina']: dukhovishchina,
  ['Roslavl']: roslavl,
  ['Shumyachi']: shumyachi,
  ['Yershichi']: yershichi,
  ['Yelnya']: yelnya,
  ['Yartsevo']: yarotsev,
  ['Ugra']: ugra,
  ['Temkino']: temkino,
  ['Sychevka']: sychevka,
  ['Safonovo']: safonovo,
  ['Rudnya']: rudnya,
  ['Repairs']: repair,
  ['Red']: red,
  ['Novodugino']: novodugino,
  ['Monast']: monast,
  ['Khislavichi']: khislavichi,
  ['Kardymovo']: kardymovo,
  ['Holm-Zhirkovsky']: holm_Zhirkovsky,
  ['Glinkа']: glinkа,
  ['Desnogorsk']: desnogorsk,
};

export const exportedAPI = () => {
  switch (UserStore.city) {
    case 'Pskov':
      return geoPskov;
    case 'Smolensk':
      return geoSmolensk;
    case 'Velizh':
      return velizh;
    case 'Vyazma':
      return vyazma;
    case 'Gagarin':
      return gagarin;
    case 'Demidov':
      return demidov;
    case 'Dorogubuzh':
      return dorogubuzh;
    case 'Dukhovishchina':
      return dukhovishchina;
    case 'Roslavl':
      return roslavl;
    case 'Shumyachi':
      return shumyachi;
    case 'Yershichi':
      return yershichi;
    case 'Yelnyai':
      return yelnya;
    case 'Yartsevo':
      return yarotsev;
    case 'Ugra':
      return ugra;
    case 'Temkino':
      return temkino;
    case 'Sychevka':
      return sychevka;
    case 'Safonovo':
      return safonovo;
    case 'Rudnya':
      return rudnya;
    case 'Repairs':
      return repair;
    case 'Red':
      return red;
    case 'Novodugino':
      return novodugino;
    case 'Monast':
      return monast;
    case 'Khislavichi':
      return khislavichi;
    case 'Kardymovo':
      return kardymovo;
    case 'Holm-Zhirkovsky':
      return holm_Zhirkovsky;
    case 'Glinkа':
      return glinkа;
    case 'Desnogorsk':
      return desnogorsk;
    default:
      return geoSmolensk;
  }
};
