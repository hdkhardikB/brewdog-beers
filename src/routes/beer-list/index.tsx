import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'
import classNames from 'classnames'
import { getBeerList } from './../../api/beer'
//@ts-ignore
import * as  styles from './beer-list.scss'
import { Beer } from './../../store'

interface BeerListProps extends RouteComponentProps<any> { }

interface BeerListState {
    beers: Beer[]
}

class BeerList extends React.Component<BeerListProps, BeerListState> {

    state = {
        beers: []
    }
    componentDidMount() {
        getBeerList().then(data => {
            this.setState({ beers: data })
        })
    }
    render() {
        const { beers } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.row}>
                    {
                        beers && beers.length > 0 && beers.map((beer: Beer) =>

                            <div key={beer.id} className={classNames(styles['col-md-3'])}>
                                <span className={styles.abv}>{beer.abv}%</span>
                                <Link to={{
                                    pathname: `/beer`,
                                    state: {
                                        beerId: beer.id
                                    }
                                }} >
                                    <img src={beer.image_url} />
                                    <h5>{beer.name}</h5>
                                    <p className={styles['card-text']}>{beer.description}</p>
                                </Link>

                            </div>

                        )
                    }
                </div>
            </div>
        )
    }
}
export default BeerList