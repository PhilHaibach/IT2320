//alert("hello");

window.onload = function()
{
    //event listeners for dog images
    var OreoImg = document.getElementsByClassName("oreoImg");
    OreoImg.addEventListener("click", ToggleDogPic);
    var FarrahImg = document.getElementsByClassName("farrahImg");
    FarrahImg.addEventListener("click", ToggleDogPic);

    //event listeners for game list
    var game1 = document.getElementsByClassName("game1");
    game1.addEventListener("mouseenter", function() {game1.className = "listItemHighlight"});
    game1.addEventListener("mouseleave", MouseOut);
    var game2 = document.getElementsByClassName("game2");
    game2.addEventListener("mouseover", MouseOver);
    game2.addEventListener("mouseout", MouseOut);
    var game3 = document.getElementsByClassName("game3");
    game3.addEventListener("mouseover", MouseOver);
    game3.addEventListener("mouseout", MouseOut);
    var game4 = document.getElementsByClassName("game4");
    game4.addEventListener("mouseover", MouseOver);
    game4.addEventListener("mouseout", MouseOut);
    var game5 = document.getElementsByClassName("game5");
    game5.addEventListener("mouseover", MouseOver);
    game5.addEventListener("mouseout", MouseOut);
    
    
}

function CreateDiv(text, className)
{
    var newDiv = document.createElement("div");
    newDiv.className = className;
    newDiv.innerHTML = text;
    return newDiv;
}

function ToggleDogPic(event)
{
    var captions = document.getElementsByClassName("oreoImgCaption");
    var images = document.getElementsByClassName("oreoImg");
    var images2 = document.getElementsByClassName("farrahImg");
    
    if(images[0] != null)
        {
            captions[0].innerHTML = "Farrah!  click image to see Oreo";
            images[0].className = "farrahImg";
        }
    else
        {
            captions[0].innerHTML = "Oreo!  click image to see Farrah";
            images2[0].className = "oreoImg";
        }
}


function MouseOver(mouse)
{
    mouse.className = "listItemHightlight";
}
function MouseOut(mouse)
{
    mouse.className = "";
}


function HorseInfo()
{
    var horse = document.getElementsByClassName("horseInfo");
    
    horse[0].innerHTML = "Left: Cravallo, gelding, 8 years old, Half Fresian half Arabian  -  Middle:  Ranaven, gelding, 10 years old, Arabian  -  Right:  Shadow, gelding, 4 years old, Arabian";
}