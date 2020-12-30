function scrollTo(toValue: number, element: HTMLElement | null = null, duration = 500, callback?: Function): void {
  const start: number = element?.scrollTop || window.scrollY
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

    if (element) {
      element.scrollTop = val
    } else {
      window.scrollTo(0, val)
    }
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    } else if (callback !== undefined) {
      callback()
    }
  }

  animateScroll()
}

export function scrollToBottom(element?: HTMLElement): void {
  const elementHeight = (element || document.body).scrollHeight
  scrollTo(elementHeight, element)
}
