
class Counter extends React.Component{

    constructor(){
        super();
        this.state = {
            count : 5,
        };
    }

    increment = () => {
        this.setState({
            count : this.state.count+1
        })
    }

    decrement = () => {
        this.setState({
            count : this.state.count-1
        })
    }

    reset = () => {
        this.setState({
            count : 0
        })
    }

    render(){

        let count = this.state.count;

        return(
            <React.Fragment>
        
                <p className="badge bg-secondary m-2">{count}</p>
                <button className="btn btn-primary m-2" onClick = {this.increment}>+</button>
                <button className="btn btn-danger m-2" onClick = {this.decrement}>-</button>
                <button className="btn btn-warning m-2" onClick = {this.reset}>reset</button>

            </React.Fragment>
        )
    }

}

ReactDOM.render( <Counter></Counter> , document.querySelector("#root"));