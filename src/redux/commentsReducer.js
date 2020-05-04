import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const CommentsReducer = (state = COMMENTS, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comments = action.payload;
            comments.id = state.length;
            comments.date = new Date().toISOString();
            console.log("Comment ", comments)
            return state.concat(comments);
            
        default:
             return state;
    }
};