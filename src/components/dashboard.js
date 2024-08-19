import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from '../category';
import "../components/dashboard.css";

const Dashboard = () => {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isManageWidgetsOpen, setIsManageWidgetsOpen] = useState(false);

  const toggleWidget = (categoryId, widgetId) => {
    const category = categories.find(cat => cat.id === categoryId);
    const widgetExists = category.widgets.some(widget => widget.id === widgetId);
    if (widgetExists) {
      dispatch({ type: 'REMOVE_WIDGET', payload: { categoryId, widgetId } });
    } else {
      const widget = { id: widgetId, name: `Widget ${widgetId}`, content: `Content for widget ${widgetId}` };
      dispatch({ type: 'ADD_WIDGET', payload: { categoryId, widget } });
    }
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => 
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="dashboard-container">
      <div className={`dashboard-left ${isManageWidgetsOpen ? 'narrow' : 'full-width'}`}>
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {filteredCategories.map(category => (
          <Category key={category.id} category={category} />
        ))}
      </div>
      <div className={`dashboard-right ${isManageWidgetsOpen ? 'manage-open' : 'closed'}`}>
        {isManageWidgetsOpen && (
          <div className="manage-widgets-content">
            <h3>Manage Widgets</h3>
            {categories.map(category => (
              <div key={category.id} className="manage-category">
                <h4>{category.name}</h4>
                {category.widgets.map(widget => (
                  <div key={widget.id} className="manage-widget">
                    <input
                      type="checkbox"
                      checked={category.widgets.some(w => w.id === widget.id)}
                      onChange={() => toggleWidget(category.id, widget.id)}
                    />
                    <label>{widget.name}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <button 
        className="manage-button"
        onClick={() => setIsManageWidgetsOpen(!isManageWidgetsOpen)}
      >
        {isManageWidgetsOpen ? 'Close Manage Widgets' : 'Open Manage Widgets'}
      </button>
    </div>
  );
};

export default Dashboard;
