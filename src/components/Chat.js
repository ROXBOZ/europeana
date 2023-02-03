import { getDocs, query } from "firebase/firestore";
import { useCallback, useContext, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const Chat = ({ id }) => {
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

  console.log("getMessages", getMessages);

  const liveUpdate = useCallback(() => {
    const q = query(collection(db, "chat"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        if (id === doc.data().item_id) {
          msgs.push(doc.data());
        }
      });
      setMessages(msgs);
      console.log("unsubscribe :>> ", unsubscribe);
    });
  }, [id]);

  // const liveUpdate = () => {
  //   const q = query(collection(db, "chat"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const msgs = [];
  //     querySnapshot.forEach((doc) => {
  //       if (id === doc.data().item_id) {
  //         msgs.push(doc.data());
  //       }
  //     });
  //     setMessages(msgs);
  //     console.log("unsubscribe :>> ", unsubscribe);
  //   });
  // };

  useEffect(() => {
    liveUpdate();
  }, [liveUpdate]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, "chat"), {
      text: newMessage,
      author: user.email,
      date: new Date(),
      item_id: id,
    });
    setValue("");
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
            );
          })}
    </div>
  );
};

export default Chat;
