document.addEventListener("DOMContentLoaded", () => {
    // console.log("HELLO JS!");

    // FORM FADE IN ON LOAD
    $(".main__container--animation").fadeIn(2000);

    // CATCH FORM ELEMENTS
    const form = document.querySelector("#main-form");
    const allInputs = document.querySelectorAll(".main-form__input");
    const nameInput = document.querySelector("#name");
    const selectInput = document.querySelector("#mobile-prefix");
    const mobileInput = document.querySelector("#mobile-number");
    const femaleCheckbox = document.querySelector("#female");
    const maleCheckbox = document.querySelector("#male");
    const dayInput = document.querySelector("#day");
    const monthInput = document.querySelector("#month");
    const yearInput = document.querySelector("#year");
    const submitBtn = document.querySelector(".main-form__btn");
    const tablinks = document.querySelectorAll(".main-form__navlink a");
    const warningBox = document.querySelector(".warning__box");
    const successMessage = document.querySelector(".success-message__box");

    // BLOCK ALL TABLINKS
    let tabLength = tablinks.length;
    for (let i=0; i<tabLength; i++) {
        tablinks[i].addEventListener("click", e => e.preventDefault());
    }

    // BLOCK SUBMIT BUTTON
    submitBtn.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    // REPLACE MONTH INPUT FIELD DEPENDING ON VIEWPORT SIZE ON LOAD
    let w = Math.max(window.innerWidth);
    const parentDiv = document.querySelector(".main-form__dateOfBirth-box");
    const monthInputMobile = document.createElement("input");
    monthInputMobile.className = "main-form__input main-form__input--mobile main-form--dateOfBirth";
    monthInputMobile.type = "number";
    monthInputMobile.placeholder = "01";
    monthInputMobile.min = "1";
    monthInputMobile.max = "12";

    // ON BREAKPOINT FOR MOBILE RENDER NUMERIC MONTH FIELD
    w <= 600
    ? parentDiv.replaceChild(monthInputMobile, monthInput)
    : " ";

    // REPLACE MONTH INPUT FIELD DEPENDING ON VIEWPORT SIZE ON RESIZE
    window.addEventListener("resize", () => {
        let w = Math.max(window.innerWidth);

        const input = parentDiv.children[2].classList;
        const checker = input.contains("main-form__input--mobile");

        if(w <= 600 && !checker) {
            parentDiv.replaceChild(monthInputMobile, monthInput);
        }
        if(w > 600 && checker) {
            parentDiv.replaceChild(monthInput, monthInputMobile);
        }
    });

    // BASIC FORM VALIDATION
    const warning = document.createElement("span");
    warning.style.display = "none";

    const validateInput = (input, warning, warningText, parentField) => {
        input.addEventListener("invalid", (e) => {
            e.preventDefault();
            parentField.appendChild(warning);
            if (!e.target.validity.valid) {
                warning.textContent = warningText;
                warning.className = "error";
                warning.style.display = "block";
                input.className = "invalid animated shake main-form__input main-form--dateOfBirth";
                // ON CORRECT INPUT REMOVE WARNING STYLE
                setValidState(input, warning);
            }
            return null;
        });
    }
    // REMOVE WARNING CLASS
    const setValidState = (input, warning) => {
        input.addEventListener("input", (e) => {
            if ("block" === warning.style.display) {
                warning.className = "";
                warning.style.display = "none";
                input.className = "main-form__input";
            }
        });
    }

    // BASIC VALIDATION OF ALL INPUTS
    let max = allInputs.length;
    const warningMessage = "Please fill in all the fields";
    for(let i = 0; i<max; i++) {
        validateInput(allInputs[i], warning, warningMessage, warningBox);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        successMessage.style.display = "flex";
    });
});
