import { useLayoutEffect } from 'react'


export function useEventListener(
  element: HTMLElement | Document | typeof globalThis, 
  type: keyof HTMLElementEventMap, 
  listener: Function, 
  deps?: React.DependencyList | undefined) {

  return useLayoutEffect(() => {
    element.addEventListener(type, listener as any)

    return () => element.removeEventListener(type, listener as any)
  }, deps)
}

// useEventListener(document, 'click', () => {})
// useEventListener(window, 'load', () => {})
