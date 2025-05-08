
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

    document.querySelectorAll('.step-container-cardsliding').forEach(container => {
      let currentStep = 1;
      const steps = container.querySelectorAll('.step-num-cardsliding');
      const progressFill = container.querySelector('.progress-step-fill-cardsliding');
  
      const prevBtn = document.querySelector('.prev-step-btn-cardsliding');
      const nextBtn = document.querySelector('.next-step-btn-cardsliding');
  
      const cards = document.querySelectorAll('.card-cardsliding');
  
      function updateSteps() {
          steps.forEach((step, index) => {
              step.classList.toggle('active', index < currentStep);
          });
  
          progressFill.style.width = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;
  
          prevBtn.disabled = currentStep === 1;
          nextBtn.disabled = currentStep === steps.length;
  
          // Slide cards
          cards.forEach((card, idx) => {
              card.style.transform = `translateX(-${(currentStep - 1) * 100}%)`;
          });
      }
  
      function changeStep(direction) {
          currentStep += direction;
          currentStep = Math.max(1, Math.min(currentStep, steps.length));
          updateSteps();
      }
  
      steps.forEach((step, index) => {
          step.addEventListener('click', () => {
              currentStep = index + 1;
              updateSteps();
          });
      });
  
      prevBtn.addEventListener('click', () => changeStep(-1));
      nextBtn.addEventListener('click', () => changeStep(1));
  
      updateSteps();
  });
  
    const backToTopBtn = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {
      if (
        window.scrollY > 20 &&
        !backToTopBtn.classList.contains("animate")
      ) {
        backToTopBtn.style.display = "flex";
      } else if (!backToTopBtn.classList.contains("animate")) {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      backToTopBtn.classList.add("animate");

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);

      setTimeout(() => {
        backToTopBtn.classList.remove("animate");
        backToTopBtn.style.display = "none";
      }, 1250);
    });
});
