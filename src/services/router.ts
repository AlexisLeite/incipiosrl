type Listener = (route: string) => void

const listeners: Listener[] = []

export function onRouteChange(cb: Listener) {
  console.log("add listener")
  listeners.push(cb)
  return () => listeners.filter(listener => listener !== cb)
}

export function pushRouteChange(route: string) {
  listeners.forEach(listener => listener(route))
}
