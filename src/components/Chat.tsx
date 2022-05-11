import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { api } from "../api"

export type ChatMessage = {
  name: string
  message: string
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    const unsubscribe = api.subscribe(
      ["collections.chat0510.documents"],
      (data) => {
        if (data.event === "database.documents.create") {
          setMessages((messages) => [...messages, data.payload as ChatMessage])
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    async function fetch() {
      const messages = await api.database.listDocuments("chat0510")
      //@ts-ignore
      setMessages(messages.documents)
    }
    fetch()
  }, [])

  async function sendMessage(e: any) {
    e.preventDefault()

    const message = e.target.message.value
    const session = await api.account.get()

    await api.database.createDocument("chat0510", "unique()", {
      name: session.name,
      room: "tech",
      message,
    })
  }

  function logout() {}

  return (
    <div>
      <div>
        <div>Let's Chat</div>
        <div onClick={logout}>Leave Room</div>
      </div>

      <div>
        {messages.map((message) => {
          return (
            <div>
              <span>
                {message.name}: {message.message}
              </span>
            </div>
          )
        })}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="Type a message ..."
        ></input>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
