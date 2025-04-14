// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelectorAll(".loading-btn").forEach(button => {
//         button.addEventListener("click", function () {
//             let spinner = this.querySelector(".loading-spinner");
//             let buttonText = this.querySelector(".loading-text-btn");

//             let loadingText = this.getAttribute("data-loading");
//             let defaultText = this.getAttribute("data-default");

//             buttonText.textContent = loadingText;
//             spinner.style.display = "inline-block";

//             setTimeout(() => {
//                 spinner.style.display = "none";
//                 buttonText.textContent = defaultText;
//             }, 2000);
//         });
//     });

    
// });
document.addEventListener("DOMContentLoaded", function () {
    const loadingButtons = document.querySelectorAll(".loading-btn");

    loadingButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const loadingText = button.getAttribute("data-loading");
            const defaultText = button.getAttribute("data-default");
            const textSpan = button.querySelector(".loading-text-btn");
            const spinner = button.querySelector(".loading-spinner");

           
            button.classList.add("loading");
            textSpan.textContent = loadingText;
            spinner.style.display = "inline-block"; 


            setTimeout(() => {
                
                button.classList.remove("loading");
                textSpan.textContent = defaultText;
                spinner.style.display = "none";
            }, 2000); 
        });
    });
});
