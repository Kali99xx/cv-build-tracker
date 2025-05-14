const initialState = {
  tracks: [],
  load: false,
};

const trackReducer = function (state = initialState, action) {
  switch (action.type) {
    case "LOAD_INFO":
      return {
        ...state,
        steps: action.payload.steps,
        account_types: action.payload.account_types,
        account_users: action.payload.account_users,
        items: action.payload.items,
      };
    case "ADD_TRACK":
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.col_idx
            ? { items: [...item.items, action.payload] }
            : item
        ),
      };
    case "UPDATE_TRACK":
      return {
        ...state,
        items: action.payload,
      };
    case "DELETE_TRACK":
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.col_idx
            ? {
                items: item.items.filter(
                  (item) =>
                    !(
                      item.col_idx === action.payload.col_idx &&
                      item.row_idx === action.payload.row_idx
                    )
                ),
              }
            : item
        ),
      };
    case "MOVE_TRACK":
      let newItems = [...state.items]; // Create a copy of the items array
      let [st_col, st_row, end_col, end_row] = action.payload;
      if (st_col === end_col) return { ...state };
      // Create a copy of the dragged item and modify it
      let draggedItem = {
        ...newItems[st_col].items[st_row],
        row_idx: end_row,
        col_idx: end_col,
      };

      // Create a copy of the column (st_col) and remove the dragged item
      let updatedStColItems = newItems[st_col].items.filter(
        (_, index) => index !== st_row
      );

      // Map over the remaining items in the column and update their row_idx
      updatedStColItems = updatedStColItems.map((item, index) => ({
        ...item,
        row_idx: index,
      }));

      // Create a copy of the column (end_col) and add the dragged item
      let updatedEndColItems = [
        ...newItems[end_col].items.slice(0, end_row),
        draggedItem,
        ...newItems[end_col].items.slice(end_row),
      ];

      // Map over the updated items in the end column and update their row_idx
      updatedEndColItems = updatedEndColItems.map((item, index) => ({
        ...item,
        row_idx: index,
      }));

      // Update the newItems array with the updated columns
      newItems[st_col] = { ...newItems[st_col], items: updatedStColItems };
      newItems[end_col] = { ...newItems[end_col], items: updatedEndColItems };

      // Return the new state with updated items
      return {
        ...state,
        items: newItems,
      };

    case "ADD_TITLE":
      return {
        ...state,
        steps: [...state.steps, action.payload],
      };
    case "EDIT_TITLE":
      return {
        ...state,
        steps: [...state.steps, action.payload],
      };
    case "DELETE_TITLE":
      return {
        ...state,
        steps: state.steps.filter((title) => title !== action.payload),
      };

    case "UPDATE_TITLE":
      return {
        ...state,
        steps: state.steps.map((title) =>
          title === action.payload[0] ? action.payload[1] : title
        ),
      };
    case "IS_LOAD_INFO":
      return {
        ...state,
        load: action.payload,
      };
    default:
      return state;
  }
};

export default trackReducer;
