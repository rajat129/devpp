let names = ["Rajat" , "udayn" ,"aditya" ,"nihar","sonali"];

function Bighello(){
    return  (
    <React.Fragment>
        { names.map(function(name){
            return <Hello key={name} name={name}></Hello>
        }) }
    </React.Fragment> ) ;
}

function Hello(props){
    return <h1>hello func says hello from {props.name}</h1>
}

ReactDOM.render(
    <Bighello></Bighello>, 
    document.querySelector("#root")
);