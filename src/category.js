import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Widget from './widget';
import "./category.css";

const Category = ({ category }) => {
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetContent, setNewWidgetContent] = useState('');
  const dispatch = useDispatch();

  const handleAddWidgetClick = () => {
    setShowAddWidgetForm(true);
  };

  const handleAddWidget = () => {
    if (newWidgetName && newWidgetContent) {
      const widget = {
        id: Date.now().toString(),
        name: newWidgetName,
        content: newWidgetContent
      };
      dispatch({ type: 'ADD_WIDGET', payload: { categoryId: category.id, widget } });
      setNewWidgetName('');
      setNewWidgetContent('');
      setShowAddWidgetForm(false);
    }
  };

  const handleCancel = () => {
    setNewWidgetName('');
    setNewWidgetContent('');
    setShowAddWidgetForm(false);
  };

  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="widgets">
        {category.widgets.map(widget => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}
        {showAddWidgetForm ? (
          <div className="widget add-widget-form">
            <input 
              type="text" 
              value={newWidgetName} 
              onChange={(e) => setNewWidgetName(e.target.value)} 
              placeholder="Widget Name" 
            />
            <textarea 
              value={newWidgetContent} 
              onChange={(e) => setNewWidgetContent(e.target.value)} 
              placeholder="Widget Content" 
            />
            <button onClick={handleAddWidget}>Add Widget</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        ) : (
          <div className="widget add-widget" onClick={handleAddWidgetClick}>
            +
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
