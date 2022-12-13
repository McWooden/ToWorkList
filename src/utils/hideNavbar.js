export function handleLeftBase() {
    document.querySelector('.btn-sidebar-left').classList.toggle('bars-active')
    document.querySelector('.base-left').classList.toggle('base-left-hide')
}
export function handleRightBase() {
    document.querySelector('.btn-sidebar-right').classList.toggle('bars-active')
    document.querySelector('.base-right').classList.toggle('base-right-hide')
}