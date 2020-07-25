import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { RootObject } from './state';

const actions: ActionTree<RootObject, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
