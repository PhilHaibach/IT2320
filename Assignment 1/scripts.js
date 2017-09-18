function ToggleDogPic()
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