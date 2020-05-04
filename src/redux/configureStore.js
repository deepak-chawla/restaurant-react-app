import {createStore, combineReducers} from 'redux';
import { CommentsReducer  } from './commentsReducer';
import { DishesReducer  } from './dishesReducer';
import { LeadersReducer  } from './leadersReducer';
import { PromotionsReducer  } from './promotionsReducer';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    
    const store = createStore(
        combineReducers({
            dishes : DishesReducer,
            comments: CommentsReducer,
            promotions: PromotionsReducer,
            leaders: LeadersReducer,
            ...createForms({
                feedback: InitialFeedback
            })
        })
        );

    return store;
}