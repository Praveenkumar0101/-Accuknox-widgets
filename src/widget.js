import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./widget.css";

const Widget = ({ widget, categoryId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(widget.name);
  const [content, setContent] = useState(widget.content);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch({ 
      type: 'EDIT_WIDGET', 
      payload: { 
        categoryId, 
        widgetId: widget.id, 
        newName: name, 
        newContent: content 
      } 
    });
    setIsEditing(false);
  };

  return (
    <div className="widget">
      {isEditing ? (
        <div className="widget-edit-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Widget Name"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Widget Content"
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <h3>{widget.name}</h3>
          <p>{widget.content}</p>
        </div>
      )}
    </div>
  );
};

export default Widget;
