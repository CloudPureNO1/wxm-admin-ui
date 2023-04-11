export const ckWsSupported = () :boolean => {
  if ('WebSocket' in window) {
    return true
  } else if ('MozWebSocket' in window) {
    return true
  } else {
    return false
  }
}

export const connect = (url:string, uid:string, callBack:Function) :WebSocket => {
  const ws = new WebSocket(`${url}/${uid}`)

  ws.onmessage = (evt:any) => {
    callBack(evt, 'message')
  }
  ws.onopen = (evt:any) => {
    callBack(evt, 'open')
  }
  ws.onclose = (evt:any) => {
    callBack(evt, 'close')
  }
  ws.onerror = (evt:any) => {
    callBack(evt, 'error')
  }
  return ws
}

export const send = (ws:WebSocket, msgData:any) => {
  ws.send(msgData)
}

