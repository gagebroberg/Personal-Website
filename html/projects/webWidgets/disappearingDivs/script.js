const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4 // gets the height of the viewport but 4/5ths of it

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top // gets the position of the top of the box

        if(boxTop < triggerBottom) { // 
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
} 