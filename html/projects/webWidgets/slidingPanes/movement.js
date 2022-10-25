const boxes = document.querySelectorAll('.box')
const words = document.querySelectorAll('p')

boxes.forEach(box => {

    // if box 1 hovered
    if (box === boxes[0]) {
        boxes[0].addEventListener('mouseover', () => {
            words[0].classList.add('active')
            boxes[1].classList.add('box1')
            boxes[2].classList.add('box1')
            boxes[3].classList.add('box1')
            console.log("Mouse in 1")
        })
        boxes[0].addEventListener('mouseout', () => {
            words[0].classList.remove('active')
            boxes[1].classList.remove('box1')
            boxes[2].classList.remove('box1')
            boxes[3].classList.remove('box1')
            console.log("Mouse out 1")
        })

    } else if (box === boxes[1]) { 
        boxes[1].addEventListener('mouseover', () => {
            words[1].classList.add('active')
            boxes[2].classList.add('box2')
            console.log("Mouse in 2")
        })
        boxes[1].addEventListener('mouseout', () => {
            words[1].classList.remove('active')
            boxes[2].classList.remove('box2')
            console.log("Mouse out 2")
        })

    } else if (box === boxes[2]) {
        boxes[2].addEventListener('mouseover', () => {
            words[2].classList.add('active')
            boxes[1].classList.add('box3')
            console.log("Mouse in 3") 
        })
        boxes[2].addEventListener('mouseout', () => {
            words[2].classList.remove('active')
            boxes[1].classList.remove('box3')
            console.log("Mouse out 3")
        })

    } else if (box === boxes[3]) {
        boxes[3].addEventListener('mouseover', () => {
            words[3].classList.add('active')
            boxes[0].classList.add('box4')
            boxes[1].classList.add('box4')
            boxes[2].classList.add('box4')
            console.log("Mouse in 4")
        })
        boxes[3].addEventListener('mouseout', () => {
            words[3].classList.remove('active')
            boxes[0].classList.remove('box4')
            boxes[1].classList.remove('box4')
            boxes[2].classList.remove('box4')
            console.log("Mouse out 4")
        })
    }
})