const slidesWrapper = document.querySelector(".images");
const infoEl = document.getElementById("info");
const circlesEl = document.getElementById("circles");
const leftBtnEl = document.querySelector(".slide-left-Btn");
const rightBtnEl = document.querySelector(".slide-right-Btn");

let counter = 0;

const imageList = [
  {
    imageNo: 1,
    heading: "Kashmir",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing 1.",
    link: "images/1.jpg",
  },
  {
    imageNo: 2,
    heading: "Dehradun",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing 2.",
    link: "images/2.jpg",
  },
  {
    imageNo: 3,
    heading: "Beizing",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing 3.",
    link: "images/3.jpg",
  },
  {
    imageNo: 4,
    heading: "UAE",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing 4.",
    link: "images/4.jpg",
  },
  {
    imageNo: 5,
    heading: "Paris",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing 5.",
    link: "images/5.jpg",
  },
];

const len = imageList.length;

const generateCircles = () => {
  return imageList
    .map((_, index) => {
      return `<i class="circle fa-regular fa-circle" ${
        index === counter ? 'style = "background-color: white;"' : ""
      }></i>`;
    })
    .join("");
};

const getInfo = () => {
  infoEl.innerHTML = `<h3>${imageList[counter].heading}</h3>
    <p>${imageList[counter].detail}</p>
    <div id="circles" class="circles">
      ${generateCircles()}
    </div>`;
};

getInfo();

const generateImages = () => {
  slidesWrapper.innerHTML = imageList.map((_, index) => {
    return `<img src=${imageList[index].link} class="slide"/>`;
  });
};

generateImages();

const dummySlide = slidesWrapper.children[len - 1].cloneNode(true);
slidesWrapper.children[0].before(dummySlide);

for (let index = 0; index < slidesWrapper.children.length; index++) {
  slidesWrapper.children[index].style.left = `${(index - 1) * 100}%`;
}

const disableButtons = () => {
  leftBtnEl.disabled = true;
  rightBtnEl.disabled = true;
  setTimeout(() => {
    leftBtnEl.disabled = false;
    rightBtnEl.disabled = false;
  }, 1000);
};

leftBtnEl.addEventListener("click", () => {
  disableButtons();
  counter = counter < 1 ? len - 1 : counter - 1; // keeping counter in 0-(len-1) range
  for (let index = 0; index < len; index++) {
    slidesWrapper.children[index].style.left = `${100 * index}%`;
  }
  slidesWrapper.removeChild(slidesWrapper.lastElementChild);
  const lastClone = slidesWrapper.children[len - 1].cloneNode(true);
  slidesWrapper.children[0].before(lastClone);
  slidesWrapper.firstElementChild.style.left = "-100%";
  getInfo();
});

rightBtnEl.addEventListener("click", () => {
  disableButtons();
  counter = counter > len - 2 ? 0 : counter + 1; // keeping counter in 0-(len-1) range
  for (let index = 0; index < len; index++) {
    slidesWrapper.children[index].style.left = `${100 * (index - 2)}%`;
  }
  slidesWrapper.removeChild(slidesWrapper.firstElementChild);
  const firstClone = slidesWrapper.children[0].cloneNode(true);
  slidesWrapper.appendChild(firstClone);
  slidesWrapper.lastElementChild.style.left = `${(len - 1) * 100}%`;
  getInfo();
});
