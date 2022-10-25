const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('') // split into array, putting each letter in own index
        .map((letter, idx) => `<span style="transition-delay: ${idx * 30}ms">${letter}</span>`) // mapping with span around it
        .join('') // joining array backtogether
})