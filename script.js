function loadData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const reactionResultDiv = document.querySelector("#reaction-result");
      const memoryResultDiv = document.querySelector("#memory-result");
      const verbalResultDiv = document.querySelector("#verbal-result");
      const visualResultDiv = document.querySelector("#visual-result");
      const totalResultDiv = document.querySelector("#total-result");
      let totalResult = 0;

      const categories = [
        { name: "Reaction", div: reactionResultDiv },
        { name: "Memory", div: memoryResultDiv },
        { name: "Verbal", div: verbalResultDiv },
        { name: "Visual", div: visualResultDiv },
      ];

      categories.forEach((category) => {
        const item = data.find((item) => item.category === category.name);
        category.div.innerHTML = item.score;
        totalResult += item.score;
      });
      totalResultDiv.innerHTML = Math.round(totalResult / 4);

      animateNumberCount(reactionResultDiv);
      animateNumberCount(memoryResultDiv);
      animateNumberCount(verbalResultDiv);
      animateNumberCount(visualResultDiv);
      animateNumberCount(totalResultDiv);
    });
}

function animateNumberCount(div) {
  const countTo = parseInt(div.textContent, 10);

  let count = 0;
  const increment = Math.ceil(countTo / 100);
  const intervalId = setInterval(() => {
    count += increment;
    if (count >= countTo) {
      count = countTo;
      clearInterval(intervalId);
    }
    div.textContent = count;
  }, 20);
}

window.onload = loadData;
