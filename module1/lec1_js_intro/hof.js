
function gfn(name){
    name = name.split(" ")[0];
    return name;
}

function gln(name){
    name = name.split(" ")[1];
    return name;
}

function hello(name,fun){

    let temp = fun(name);
    console.log(temp);

}

hello("steve carell",gfn);
hello("jim halpert",gln);