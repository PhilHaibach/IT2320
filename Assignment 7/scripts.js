$(document).ready(function()
{
    $(".button").click(function()
    {
        var list = createList();
        displayList(list);
    });
});

function createList()
{
    return{
        
        "listName" : "Animals",
        "dogs" : [
            
                {
                    "name" : "Oreo",
                    "breed" : "Australian Shepherd",
                    "cuteness" : 11
                }, 
            
                {
                    "name" : "Farrah",
                    "breed" : "Lab Mix",
                    "cuteness" : 9
                }, 
            
                {
                    "name" : "Dreamy",
                    "breed" : "Keeshond",
                    "cuteness" : 10
                } 
            
        ],
        
        "horses" : [
            
                {
                    "name" : "Rabask",
                    "color" : "chestnut",
                    "cuteness" : 10
                }, 
            
                {
                    "name" : "Night",
                    "color" : "bay",
                    "cuteness" : 9
                }, 
            
                {
                    "name" : "Ranaven",
                    "color" : "bay",
                    "cuteness" : 8
                }, 
        
                {
                    "name" : "Shadow",
                    "color" : "black",
                    "cuteness" : 10
                } 
            
        ]
        
    };
}

function displayList(list)
{
    alert(list.listName);
    alert("dogs");
    for(var i=0; i<list.dogs.length; i++)
        {
            var dog = list.dogs[i];
            alert("name:  " + dog.name + "  breed:  " + dog.breed + "  cuteness:  " + dog.cuteness);
        }
    alert("horses");
    for(var j=0; j<list.horses.length; j++)
        {
            var horse = list.horses[j];
            alert("name:  " + horse.name + "  color:  " + horse.color + "  cuteness:  " + horse.cuteness);
        }
}