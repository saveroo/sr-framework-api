import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { RootObject } from './state';

const getters: GetterTree<RootObject, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
