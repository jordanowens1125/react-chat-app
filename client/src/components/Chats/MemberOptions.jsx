const MemberOptions = ({
  availableMembers,
  selectedMembers,
  setSelectedMembers,
}) => {
  const updateMembers = (id, user) => {
    const copy = { ...selectedMembers };

    if (copy[id]) {
      delete copy[id];
    } else {
      copy[id] = user;
    }
    setSelectedMembers(copy);
  };

  return (
    <div className="flex-col">
      {availableMembers.map((user) => {
        return (
          <div
            key={user._id}
            className={
              selectedMembers[user._id]
                ? "member_option selected"
                : "member_option"
            }
            onClick={() => updateMembers(user._id, user)}
          >
            <img src={user.photoURL} alt="" />
            <div className="flex-col">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MemberOptions;
