import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import classNames from 'classnames'
import { getBeerDetail } from './../../api/beer'
//@ts-ignore
import * as  styles from './beer-detail.scss'
import { Beer, Malt, Hop, MashTemp, Status, Method } from './../../store'

interface BeerDetailProps extends RouteComponentProps<any> { }

interface BeerDetailState {
    beerDetail: Beer
}

class BeerDetail extends React.Component<BeerDetailProps, BeerDetailState> {

    constructor(props: BeerDetailProps) {
        super(props)
        this.state = {
            beerDetail: { method: { mash_temp: [] }, ingredients: { hops: [], malt: [], yeast: '' } }
        }
    }
    componentDidMount() {
        const { beerId } = this.props.location.state
        if (beerId)
            getBeerDetail(beerId).then((data: Beer) => {
                this.setState({ beerDetail: data })
            })
    }

    render() {
        const { beerDetail } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles['col-md-11']}></div>
                    <div className={styles['col-md-1']}>
                        <button className={classNames(styles['btn'], styles['btn-xs'], styles['btn-default'])}>
                            <a href="/">Back</a>
                        </button>
                    </div>
                </div>

                {beerDetail && <React.Fragment>
                    <div className={styles.row}>
                        <div className={styles['col-md-3']}>
                            <img src={beerDetail.image_url} />
                        </div>
                        <div className={styles['col-md-9']}>
                            <div className={styles.row}>
                                <div className={styles['col-md-12']}>
                                    <h3>{beerDetail.name}</h3>
                                    <p className={styles['card-text']}>{beerDetail.tagline}</p>
                                    <p className={styles.beerDescription}>{beerDetail.description}</p>

                                </div>
                                <div className={styles['col-md-3']}>
                                    <h4>Methods</h4>
                                    <ul className={styles["list-group"]}>
                                        {
                                            beerDetail.method && beerDetail.method.mash_temp && beerDetail.method.mash_temp.length > 0 &&
                                            beerDetail.method.mash_temp.map((mesh: MashTemp, index: number) =>
                                                <li key={'method' + index} className={styles["list-group-item"]}>
                                                    <span>Duration:</span>{mesh.duration}<br />
                                                    {mesh.temp.value} {mesh.temp.unit}<br />
                                                    <button onClick={() => {

                                                        const mashTemp = this.state.beerDetail.method.mash_temp
                                                        if (!mesh.status || mesh.status === Status.PAUSE) {
                                                            mashTemp[index] = mesh
                                                            mesh.status = Status.RUNNING
                                                            this.setState((prevState => ({
                                                                ...prevState, beerDetail: {
                                                                    ...prevState.beerDetail, method: {
                                                                        ...prevState.beerDetail.method, mash_temp: [...mashTemp]
                                                                    }
                                                                }
                                                            })))
                                                            if (mesh.duration && mesh.duration > 0) {
                                                                mesh.timer = setInterval(() => {
                                                                    mesh.duration = mesh.duration ? mesh.duration - 1 : 0
                                                                    if (mesh.duration < 1) {
                                                                        mesh.status = Status.DONE
                                                                        clearInterval(mesh.timer)
                                                                    }
                                                                    mashTemp[index] = mesh
                                                                    this.setState((prevState => ({
                                                                        ...prevState, beerDetail: {
                                                                            ...prevState.beerDetail, method: {
                                                                                ...prevState.beerDetail.method, mash_temp: [...mashTemp]
                                                                            }
                                                                        }
                                                                    })))
                                                                }, 1000)
                                                                return;
                                                            }
                                                            else
                                                                mesh.status = Status.DONE
                                                        }
                                                        else if (mesh.status === Status.RUNNING) {
                                                            clearInterval(mesh.timer)
                                                            mesh.status = Status.PAUSE
                                                        }
                                                        mashTemp[index] = mesh
                                                        this.setState((prevState => ({
                                                            ...prevState, beerDetail: {
                                                                ...prevState.beerDetail, method: {
                                                                    ...prevState.beerDetail.method, mash_temp: [...mashTemp]
                                                                }
                                                            }
                                                        })))

                                                    }} type="button" className={classNames(styles['btn'], styles['btn-xs'], styles['btn-primary'])}>
                                                        {mesh.status || "IDLE"}
                                                    </button>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className={styles['col-md-3']}>
                                    <h4>Hop</h4>
                                    <ul className={styles["list-group"]}>
                                        {beerDetail.ingredients && beerDetail.ingredients.hops && beerDetail.ingredients.hops.length > 0 &&
                                            beerDetail.ingredients.hops.map((hop: Hop, index: number) =>
                                                <li key={'hop' + index} className={styles["list-group-item"]}>
                                                    {hop.name}<br />
                                                    {hop.amount.value} {hop.amount.unit}<br />
                                                    <button onClick={() => {
                                                        const type: { [key: string]: { count: number, done: number } } = { start: { count: 0, done: 0 }, end: { count: 0, done: 0 }, middle: { count: 0, done: 0 } }

                                                        this.state.beerDetail.ingredients.hops.map((h: Hop) => {
                                                            type[h.add] = { count: type[h.add] ? type[h.add].count + 1 : 1, done: h.status ? type[h.add].done + 1 : 0 }
                                                        })
                                                        if (!hop.status) {
                                                            if (hop.add === "middle") {
                                                                if (type.start.count !== type.start.done)

                                                                    return
                                                            } else if (hop.add === "end") {
                                                                if ((type.start.count !== type.start.done) || (type.middle.count !== type.middle.done))
                                                                    return
                                                            }
                                                            let hops: Hop[] = []
                                                            hops = this.state.beerDetail.ingredients.hops
                                                            hop.status = Status.DONE
                                                            hops[index] = hop
                                                            this.setState((prevState => ({
                                                                ...prevState, beerDetail: {
                                                                    ...prevState.beerDetail, ingredients: {
                                                                        ...prevState.beerDetail.ingredients, hops: [...hops]
                                                                    }
                                                                }
                                                            })))
                                                        }
                                                    }} type="button" className={classNames(styles['btn'], styles['btn-xs'], styles['btn-primary'])}>
                                                        {hop.status || "IDLE"}
                                                    </button>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className={styles['col-md-3']}>
                                    <h4>Malts</h4>
                                    <ul className={styles["list-group"]}>
                                        {beerDetail.ingredients && beerDetail.ingredients.hops && beerDetail.ingredients.hops.length > 0 &&
                                            beerDetail.ingredients.malt.map((malt: Malt, index: number) =>
                                                <li key={'malt' + index} className={styles["list-group-item"]}>
                                                    {malt.name}<br />
                                                    {malt.amount.value} {malt.amount.unit}<br />
                                                    <button onClick={() => {
                                                        if (!malt.status) {
                                                            let malts: Malt[] = []
                                                            malts = this.state.beerDetail.ingredients.malt
                                                            malt.status = Status.DONE
                                                            malts[index] = malt
                                                            this.setState((prevState => ({
                                                                ...prevState, beerDetail: {
                                                                    ...prevState.beerDetail, ingredients: {
                                                                        ...prevState.beerDetail.ingredients, malts: [...malts]
                                                                    }
                                                                }
                                                            })))
                                                        }
                                                    }} type="button" className={classNames(styles['btn'], styles['btn-xs'], styles['btn-primary'])}>
                                                        {malt.status || "IDLE"}
                                                    </button>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                }
            </div>
        )
    }
}
export default BeerDetail