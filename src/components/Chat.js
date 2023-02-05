import { useCallback, useContext, useState, useEffect } from "react";

// Firebase
import { query, collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

// Context
import { AuthContext } from "../store/AuthContext";

const Chat = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");

  // Get live update of messages
  const liveUpdate = useCallback(() => {
    const q = query(collection(db, "chat"));
    onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        if (id === doc.data().item_id) {
          msgs.push(doc.data());
        }
      });
      setMessages(msgs);
    });
  }, [id]);

  useEffect(() => {
    liveUpdate();
  }, [liveUpdate]);

  // inputting a new message
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    setValue(e.target.value);
  };

  // posting a new message
  const handleSubmit = async () => {
    await addDoc(collection(db, "chat"), {
      text: newMessage,
      author: user.email,
      date: new Date(),
      item_id: id,
    });
    setValue("");
  };

  // deleting a message

  const handleDeleteMessage = async () => {
    console.log("delete message");
    alert("feature is coming");
    // await deleteDoc(doc(db, "chat"));
  };

  return (
    <div className="chat-container">
      <h3>Kommentare</h3>

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
          .map((message, index) => {
            const date = new Date(message.date.seconds * 1000);
            return (
              <div key={index} className="chat-msg">
                <div>
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
                {user.email === message.author && (
                  <button
                    className="deleteMessage"
                    onClick={handleDeleteMessage}
                  >
                    löschen&nbsp;&times;
                  </button>
                )}
              </div>
            );
          })}
    </div>
  );
};

export default Chat;
