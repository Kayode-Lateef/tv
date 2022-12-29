function move() {
    const other = document.getElementById('1')
    const change = document.getElementById('11')

    if (other.style.display === "none") {
        other.style.display = "block";
        change.className = 'fa fa-chevron-up'
    } else {
        other.style.display = "none";
        change.className = 'fa fa-chevron-down'
    }
}
function down() {
    const other = document.getElementById('3')
    const change = document.getElementById('33')
    if (other.style.display === "none") {
        other.style.display = "block";
        change.className = 'fa fa-chevron-up'
    } else {
        other.style.display = "none";
        change.className = 'fa fa-chevron-down'
    }
}
function push() {
    const other = document.getElementById('2')
    const change = document.getElementById('22')
    if (other.style.display === "none") {
        other.style.display = "block";
        change.className = 'fa fa-chevron-up'
    } else {
        other.style.display = "none";
        change.className = 'fa fa-chevron-down'
    }
}


