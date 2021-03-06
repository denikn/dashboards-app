import objectClean from 'd2-utilizr/lib/objectClean';
import isEmpty from 'd2-utilizr/lib/isEmpty';

export const actionTypes = {
    SET_ITEM_FILTER: 'SET_ITEM_FILTER',
};

export const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_ITEM_FILTER: {
            return objectClean(
                {
                    ...state,
                    [action.key]: action.value,
                },
                isEmpty
            );
        }
        default:
            return state;
    }
};

// root selector

export const sGetFromState = state => state.itemFilter;

// selectors

export const sGetFilterKeys = state => Object.keys(sGetFromState(state));
