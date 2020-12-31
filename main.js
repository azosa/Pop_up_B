var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");

                    }
                    this.setAttribute("class", "same-as-selected");
                    document.getElementsByName('sm-cst.wojewodztwo')[0].parentElement.parentElement.getElementsByClassName('error__img')[0].style.display = "none";
                    document.getElementsByName('sm-cst.wojewodztwo')[0].parentElement.parentElement.getElementsByClassName('form-error')[0].style.display = "none";

                    break;
                }
            }
            document.getElementsByClassName('select-selected')[0].style.color = "#000000"
            h.click();
        });
        b.appendChild(c);


    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

let firstSection = document.getElementById('first');
let secondSection = document.getElementById('second');

let firstCheckboxes = document.getElementById('secondA');
let secondCheckboxes = document.getElementById('secondB');

let buttonNext = document.getElementById('next');
let checkbox = document.getElementsByName('sm-cst.CLIENT');
let submit = document.getElementById('sm-form-submit');
let sm_phone = document.querySelector("#sm-form-phone");
buttonNext.addEventListener('click', () => {
    if (checkbox[0].checked == true) {
        firstSection.style.display = "none";
        secondSection.style.display = "block";
        firstCheckboxes.style.display = "none";
        sm_phone.setAttribute('placeholder', 'telefon kontaktowy');
        document.getElementById('sm-form-company').required = true;
        document.getElementById('sm-form-name').parentElement.style.display = "none";
    } else if (checkbox[1].checked == true) {
        firstSection.style.display = "none";
        secondSection.style.display = "block";
        secondCheckboxes.style.display = "none";
        sm_phone.setAttribute('placeholder', 'telefon');
        document.getElementById('sm-form-name').required = true;
        document.getElementById('sm-form-company').parentElement.style.display = "none";

    } else {
        checkbox[0].closest('.section__checkboxes').getElementsByClassName('error')[0].style.display = "block";

    }
})




sm_phone.addEventListener("keydown", event => {
    if (event.keyCode == 190 || event.keyCode == 188 || event.keyCode == 69) {
        event.preventDefault();
    }
    if (sm_phone.value.length >= 12) {
        switch (event.keyCode) {
            case 8:
                break;
            case 46:
                break;
            default:
                event.preventDefault();
        }

    }
});




var email = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;




submit.addEventListener('click', (event) => {
    let inputs = document.querySelectorAll('.input[required]');
    validate = true;
    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].value.length < 1) {
            validate = false;
            inputs[i].parentElement.getElementsByClassName('form-error')[0].style.display = "block";
            inputs[i].parentElement.getElementsByClassName('error__img')[0].style.display = "block";
            event.preventDefault();
        } else {
            inputs[i].parentElement.getElementsByClassName('form-error')[0].style.display = "none";
            inputs[i].parentElement.getElementsByClassName('error__img')[0].style.display = "none";
        }
    }
    if (!(document.getElementById('sm-form-email').value.match(email))) {
        validate = false;
        document.getElementById('sm-form-email').parentElement.getElementsByClassName('form-error')[0].style.display = "block";
        event.preventDefault();
    } else {
        document.getElementById('sm-form-email').parentElement.getElementsByClassName('form-error')[0].style.display = "none";

    }
    if (document.getElementsByName('sm-cst.wojewodztwo')[0].value == "null") {
        document.getElementsByName('sm-cst.wojewodztwo')[0].parentElement.parentElement.getElementsByClassName('error__img')[0].style.display = "block";
        document.getElementsByName('sm-cst.wojewodztwo')[0].parentElement.parentElement.getElementsByClassName('form-error')[0].style.display = "block";

        event.preventDefault();
    } else {
        document.getElementsByName('sm-cst.wojewodztwo')[0].parentElement.parentElement.getElementsByClassName('error__img')[0].style.display = "none";
        document.getElementsByName('sm-cst.wojewodztwo')[0].parentElement.parentElement.getElementsByClassName('form-error')[0].style.display = "none";

    }
})