import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  postFeedback,
  fetchLeaders,
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import Contact from './Contact';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
});

class MainComponent extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    const HomePage = () => {
      return (
        <HomeComponent
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          CommentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <HeaderComponent />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              }
              <Route
                exact
                path="/menu"
                component={() => <MenuComponent dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              }
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <FooterComponent />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainComponent)
);