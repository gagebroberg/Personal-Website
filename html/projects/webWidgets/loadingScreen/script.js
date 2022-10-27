const loadText = document.querySelector('.loading-text')
const loadTextReplay = document.querySelector('.loading-text-replay')
const bg = document.querySelector('.bg')

let load = 0

let int = setInterval(blurring, 30)

function blurring() {

    console.log(load)
    load++

    if (load > 99) {
        clearInterval(int)
    }

    if (load < 99) {
        loadText.style.display = 'block'
        loadTextReplay.style.display = 'none'
        loadText.innerText = `${load}%`
        loadText.style.opacity = scale(load, 0, 100, 1, 0)
        bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
    } else {
        loadText.style.display = 'none'
        loadTextReplay.style.display = 'block'
        loadText.style.opacity = 1
    }
}

function replay() {
    load = 0
    int = setInterval(blurring, 30)
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}