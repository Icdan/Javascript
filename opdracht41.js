var mijnauto = {
    merk: "Ford",
    type: "Mondeo",
    aantalWielen: 4,
    kleur: "blauw",
    snelheid: 0,
    toeter: function (){
        console.log("Toet!")
    },
    gasgeven: function(){
        this.snelheid += 5
        console.log(this.snelheid);
    }
}

mijnauto.toeter();
mijnauto.gasgeven();
mijnauto.gasgeven();
mijnauto.gasgeven();
mijnauto.gasgeven();
mijnauto.toeter();
mijnauto.toeter();
mijnauto.toeter();
mijnauto.gasgeven();
