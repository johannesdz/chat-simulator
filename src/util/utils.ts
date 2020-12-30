function scrollTo(element: HTMLElement, toValue: number, duration = 500, callback?: Function): void {
  const start: number = element.scrollTop
  const change: number = toValue - start
  let currentTime = 0
  const increment = 20

  function easeInOutQuad(currentTime: number, startValue: number, changeInValue: number, duration: number) {
    currentTime /= duration / 2
    if (currentTime < 1) {
      return (changeInValue / 2 * currentTime * currentTime) + startValue
    }
    currentTime--
    return (-changeInValue / 2 * ((currentTime * (currentTime - 2)) - 1)) + startValue
  }

  function animateScroll(): void {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)

    element.scrollTop = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    } else if (callback !== undefined) {
      callback()
    }
  }

  animateScroll()
}

export function scrollToBottom(element: HTMLElement): void {
  const elementHeight = element.scrollHeight
  scrollTo(element, elementHeight)
}
