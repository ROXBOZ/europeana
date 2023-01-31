import { getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");

  const getMessages = async () => {
    const q = query(collection(db, "chat"));
    const querySnapshot = await getDocs(q);
    const msgs = [];
    querySnapshot.forEach((doc) => {
      msgs.push(doc.data());
    });
    setMessages(msgs);
  };

  const liveUpdate = () => {
    const q = query(collection(db, "chat"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
  };

  // const secondToDate = (time) => {
  //   const date = new Date(time).toLocaleDateString();
  //   return date;
  // };

  useEffect(() => {
    liveUpdate();
  }, []);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "chat"), {
      text: newMessage,
      author: user.email,
      date: new Date(),
    });
    setValue("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <h2>Guestbook</h2>
      <p>The concept of a Guestbook here is extremely lame.</p>

      <div className="add-msg">
        <input
          value={value}
          onChange={handleInputChange}
          type="text"
          name="chat"
          id="chat"
          placeholder="Diese App ist wunderbar..."
        ></input>
        <button
          disabled={newMessage === "" ? true : false}
          onClick={handleSubmit}
        >
          Senden
        </button>
      </div>
      {messages &&
        messages
          .sort((a, b) => b.date.seconds - a.date.seconds)
          .map((message) => {
            const date = new Date(message.date.seconds * 1000);
            return (
              <>
                <div className="chat-msg">
                  <p>
                    <span className="message-date">
                      {date.toLocaleDateString("de-DE", {
                        day: "numeric",
                        year: "numeric",
                        month: "short",
                      })}
                      ,{" "}
                      {date.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                    <br />
                    <span className="message-author">{message.author}</span>
                  </p>
                  <p>{message.text}</p>
                </div>
              </>
            );
          })}
    </div>
  );
};

export default Chat;
