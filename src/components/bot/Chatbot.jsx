import React, { useEffect } from 'react'

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.botpressWebChat.init({
        botId: '<6f806c65-46fe-42d7-9a4b-8c562d8f91f3>',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '<b0b12ba3-973b-4edf-bc59-7a2b7c2e6fb1>',
      })
    }
  }, [])

  return <div id="webchat" />
}

export default Chatbot