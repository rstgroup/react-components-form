import React, { Component } from 'react';
import styles from './Devtools.css';

class Devtools extends Component {
    constructor(props) {
        super(props);
        this.getDevtoolsData = this.getDevtoolsData.bind(this);
        this.setHistory = this.setHistory.bind(this);
        this.state = {
            settings: {},
            formStateHistory: {},
            fieldListeners: {},
            fieldRerenders: {},
            emittedEvents: [],
        };
    }
    getDevtoolsData() {
        const devtoolsData = JSON.parse(window.formDebugger.getDevtoolsData());
        this.setState(devtoolsData);
    }
    componentDidMount() {
        this.toolsInterval = setInterval(this.getDevtoolsData, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.toolsInterval);
    }
    setHistory(state) {
        console.log(state);
    }
    render() {
        const { formStateHistory, fieldRerenders } = this.state;
        return <div className={styles.wrapper}>
            <div className={styles.formStateHistoryWrapper}>
                <div className={styles.historyTitle}>State History</div>
                <div className={styles.historyListContainer}>
                    {Object.keys(formStateHistory).map(key =>
                        <div className={styles.historyList} key={key}>
                            {formStateHistory[key].map(state =>
                                <div className={styles.historyItem} onClick={() => this.setHistory(state)}>{JSON.stringify(state)}</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.formFields}>
                <div className={styles.historyTitle}>Fields</div>
                <div className={styles.historyListContainer}>
                    <div className={styles.historyList}>
                    {Object.keys(fieldRerenders).map(key =>
                        <div className={styles.historyItem}>{key}: {fieldRerenders[key]}</div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Devtools;
