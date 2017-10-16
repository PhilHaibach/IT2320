var Main = {};

Main.Musician = function(name, instrument)
{
    this.Name = name;
    this.Instrument = instrument;
}

Main.Phil = new Main.Musician("Phil", "Guitar");
Main.Paul = new Main.Musician("Paul", "Drums");
Main.Alex = new Main.Musician("Alex", "Bass");
Main.Ben = new Main.Musician("Ben", "Guitar");

Main.Musician.prototype.GetInfo = function()
{
    return "Name:  " + this.Name + "  Instrument:  " + this.Instrument;
}

document.body.innerHTML = Main.Phil.GetInfo();
document.body.innerHTML += "<br/>";
document.body.innerHTML += Main.Paul.GetInfo();
document.body.innerHTML += "<br/>";
document.body.innerHTML += Main.Alex.GetInfo();
document.body.innerHTML += "<br/>";
document.body.innerHTML += Main.Ben.GetInfo();
document.body.innerHTML += "<br/>";