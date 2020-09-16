const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

const jsonDateReviver = (key, value) => {
    if(dateRegex.test(value)) return new Date(value);
    return value;
}

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }

    async loadData() {
        const query = `
            query {
                issueList {
                    id status owner effort
                    created due
                    title
                }
            }`;
        
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
            });

        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);
        this.setState({issues: result.data.issueList});
    }

    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({issues: newIssueList});
    }

    componentDidMount() {
        this.loadData();
    }
    
    render() {
        return(
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        );
    }
}

const IssueFilter = (props) => {
        return(
            <div>This is a placeholder for issue filter.</div>
        );
}

const IssueTable = (props) => {
        const issueRows = props.issues.map(issue => 
            <IssueRow key={issue.id} issue={issue}></IssueRow>);

        return(
            <table className='bordered-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        );
}

const IssueRow = (props) => {
        const issue = props.issue;
        return(
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
        );
}

const IssueAdd = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            status: 'New'
        }
        props.createIssue(issue);
        form.owner.value = '';
        form.title.value = '';
    }
        return(
            <form name='issueAdd' onSubmit={handleSubmit}>
                <input type='text' name='owner' placeholder='Owner' />
                <input type='text' name='title' placeholder='Title' />
                <button>Add</button>
            </form>
        );
}

ReactDOM.render(<IssueList />, document.getElementById("root"));