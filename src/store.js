import { createStore } from 'redux';

const initialState = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'widget1', name: 'Widget 1', content: 'Random text for widget 1' },
      ]
    },
    {
      id: 'security',
      name: 'Security Dashboard',
      widgets: [
        { id: 'widget3', name: 'Widget 3', content: 'Random text for widget 3' }
      ]
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.categoryId ? 
          {
            ...category,
            widgets: [...category.widgets, action.payload.widget]
          } : category
        )
      };
      
    case 'REMOVE_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.categoryId ? 
          {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== action.payload.widgetId)
          } : category
        )
      };

    case 'EDIT_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.categoryId ? 
          {
            ...category,
            widgets: category.widgets.map(widget => 
              widget.id === action.payload.widgetId ? 
              { ...widget, name: action.payload.newName, content: action.payload.newContent } 
              : widget
            )
          } : category
        )
      };

    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
