// import Dialog from "./dialog/dialog.js";

// let b = document.getElementsByTagName("td");

// let dBox = new Dialog();
// dBox.init();

// let day;
// let weekDay;
// let subj;

// for (let i = 0; i < b.length; i++) {

//     let currentB = b.item(i);

//     let date = currentB.parentNode.firstElementChild.innerText;

//     weekDay = date.split('\n')[0];
//     day = date.split('\n')[1];

//     subj = currentB.parentNode.parentNode.firstElementChild.children.item(i % 11).innerText;

//     if (currentB.innerHTML.includes("offerent") && !currentB.innerHTML.includes("rimanenti")) {

//         currentB.addEventListener("click", () => {

//             let cont = "Confermi di voler inviare la prenotazione per " + weekDay + " " + day + " in " + subj + "?";

//             dBox.setTitle("Prenotazione");
//             dBox.setContent(cont);

//             dBox.setYesBtn("SI", "#00ff00", prenota);
//             dBox.setNoBtn("NO", "#ff0000", vabbene);

//             dBox.show();

//         });
//     }
// }

// function vabbene() {
//     alert("OK");
// }

// function prenota(ev, txt) {

//     var data = encodeURL("name="+txt+"&weekDay="+weekDay+"&day="+day+"&subject="+subj);

//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === 4) {
//             console.log(this.responseText);
//         }
//     });

//     xhr.open("POST", "http://127.0.0.1:8080/Calendario%20interrogazioni/");
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//     xhr.send(data);
// }