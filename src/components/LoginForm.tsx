import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api"

export default function LoginForm() {
  const navigate = useNavigate()

  async function login(e: any) {
    e.preventDefault()

    const name = e.target.name.value
    const room = e.target.room.value

    await api.account.createAnonymousSession()
    await api.account.updateName(name)
    navigate("./chat?room=" + room)
  }

  return (
    <div className="login-container">
      <span className="join-room">Join a room</span>
      <form className="login-form" onSubmit={login}>
        <p className="login-name">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter Name" />
        </p>

        <p className="login-room">
          <label htmlFor="room">Room</label>
          <input type="text" id="room" name="room" placeholder="Room Name" />
        </p>

        <button type="submit">Start Chatting</button>
      </form>
    </div>
  )
}
