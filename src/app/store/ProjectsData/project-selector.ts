import { createFeatureSelector, createSelector } from '@ngrx/store';
import { projectState } from './project.reducer';

export const selectDataState =
  createFeatureSelector<projectState>('Projectlist');

export const selectData = createSelector(
  selectDataState,
  (state: projectState) => {
    console.log(state);
    return state?.projectdata;
  }
);

export const selectDataLoading = createSelector(
  selectDataState,
  (state: projectState) => state.loading
);

export const selectDataError = createSelector(
  selectDataState,
  (state: projectState) => state.error
);
