import { useEffect, useState } from "react";
import Input from "../shared/Input";
import api from "../../api";
import useAuthContext from "../../hooks/useAuthContext";
import MemberOptions from "./MemberOptions";
import ShowSelectedMembers from "./ShowSelectedMembers";

const Modal = ({ showModal, setShowModal }) => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [selectedMembers, setSelectedMembers] = useState({});
  const [availableMembers, setAvailableMembers] = useState([]);

  useEffect(() => {}, [selectedMembers]);
  useEffect(() => {
    const fetchOtherUsers = async () => {
      if (user && showModal) {
        const users = await api.users.fetchOtherUsers(user);
        setAvailableMembers(users);
      }
    };
    fetchOtherUsers();
  }, [user, showModal]);

  const createNewChat = async (e) => {
    e.preventDefault();
    try {
      await api.chats.createChat(
        { members: Object.keys(selectedMembers), title, creator: user._id },
        user
      );
    } catch (error) {}
    resetState();
  };
  const resetState = () => {
    setTitle('')
    setSelectedMembers({});
    setShowModal(false);
  };
  const el = {
    true: (
      <div className="modal">
        <form onSubmit={createNewChat} className="modal-content">
          <button onClick={resetState} type="button">
            Close
          </button>
          <Input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            label={"Title"}
          />
          <ShowSelectedMembers selectedMembers={selectedMembers} />
          <MemberOptions
            availableMembers={availableMembers}
            setSelectedMembers={setSelectedMembers}
            selectedMembers={selectedMembers}
          />

          <button type="submit">Create Chat</button>
        </form>
      </div>
    ),
    false: null,
  };

  return el[showModal];
};

const NewChat = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>+</button>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default NewChat;
