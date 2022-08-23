export default function (element){
    element.style.overflow = "hidden";
    element.innerHTML = element.innerText.split("").map((char) => {
        return `<span class="animatedis" > </span>`
    }).join("");
   return element ;
}