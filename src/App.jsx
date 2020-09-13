class IssueList extends React.Component {
    render() {
        return(
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        );
    }
}

class IssueFilter extends React.Component {
    render() {
        return(
            <div>This is a placeholder for issue filter.</div>
        );
    }
}

class IssueTable extends React.Component {
    render() {
        return(
            <div>This is a placeholder for a table of issues.</div>
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return(
            <div>This is a placeholder for a form to add an issue.</div>
        );
    }
}

ReactDOM.render(<IssueList />, document.getElementById("root"));