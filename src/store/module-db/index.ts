import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { RootObject } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const SRFeatureModule: Module<RootObject, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default SRFeatureModule;
