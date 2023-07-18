const ShowSelectedMembers = ({ selectedMembers }) => {
  const membersArray = Object.keys(selectedMembers).map((key) => ({
    id: key,
    info: selectedMembers[key],
  }));

  return (
    <div className="flex aic">
      {membersArray.length}
      {membersArray.map((member) => (
        <div key={member.info._id}>
          <img src={member?.info?.photoURL} alt={member?.info?.name} />
          {/* {member.info.name} */}
        </div>
      ))}
    </div>
  );
};

export default ShowSelectedMembers;
