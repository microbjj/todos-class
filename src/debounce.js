export function debounce(fn, ms) {
    let timer
    return function (...args) {
        const fnCall = () => {
            fn.apply(this, args)
        }
        clearTimeout(timer)
        timer = setTimeout(fnCall, ms)
    }
}
