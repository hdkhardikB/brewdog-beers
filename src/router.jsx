import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import BeerList from './routes/beer-list'
import BeerDetail from './routes/beer-detail'
import classNames from 'classnames'
import Header from './components/header'
import * as styles from './scss/app.scss'
const Router = props => (
    <Switch>
        <Route render={() => (
            <React.Fragment>
                <Header />
                <Switch>
                    <section className={classNames(styles.jumbotron, styles['text-center'])}>
                        <Route path="/" exact={true} component={BeerList} />
                        <Route path="/beer" component={BeerDetail} />
                    </section>
                </Switch>
                {/* <Footer /> */}
            </React.Fragment>
        )}
        />
    </Switch>
)

export default Router
