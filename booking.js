import Dialog from "./dialog/dialog.js";

let b = document.getElementsByTagName("td");

let dBox = new Dialog();
dBox.init();

for (let i = 0; i < b.length; i++) {
    let currentB = b.item(i);

    let date = currentB.parentNode.firstElementChild.innerText;
    let weekDay = date.split('\n')[0];
    let day = date.split('\n')[1];
    let subj = currentB.parentNode.parentNode.firstElementChild.children.item(i%11).innerText;

    if (currentB.innerHTML.includes("offerent") && !currentB.innerHTML.includes("rimanenti")) {

        currentB.addEventListener("click", () => {

            let cont = "Confermi di voler inviare la prenotazione per " + weekDay + " " + day + " in " + subj + "?";

            dBox.setTitle("Prenotazione");
            dBox.setContent(cont);

            dBox.setYesBtn("SI", "#00ff00");
            dBox.setNoBtn("NO", "#ff0000", vabbene);

            dBox.show();

        });
    }
}

function vabbene() {
    alert("OK");
}
