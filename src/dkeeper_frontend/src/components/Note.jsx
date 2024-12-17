import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedContent, setUpdatedContent] = useState(props.content);

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSaveClick = () => {
    props.onUpdate(props.id, { title: updatedTitle, content: updatedContent });
    setIsEditing(false); 
  };

  const handleDeleteClick = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={handleSaveClick}>
            <SaveIcon />
          </button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleEditClick}>
            <EditIcon />
          </button>
        </>
      )}
      <button onClick={handleDeleteClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
