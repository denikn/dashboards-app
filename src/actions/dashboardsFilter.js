import { actionTypes } from '../reducers';

// actions

export const acSetFilterName = value => ({
    type: actionTypes.SET_DASHBOARDS_FILTER_NAME,
    value,
});

export const acSetFilterOwner = value => ({
    type: actionTypes.SET_DASHBOARDS_FILTER_OWNER,
    value,
});

export const acSetFilterOrder = value => ({
    type: actionTypes.SET_DASHBOARDS_FILTER_ORDER,
    value,
});
