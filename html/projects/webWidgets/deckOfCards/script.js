const panels = document.querySelectorAll('.panel') // this creates a node list of all in the "panels" class

// console.log(panels[0]) // this is a way to get the panels to show in the dev tools -> console section of chrome

panels.forEach(panel => {
    // console.log(panel) // this would loop through and show each panel in the console dev tool in chrome
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}