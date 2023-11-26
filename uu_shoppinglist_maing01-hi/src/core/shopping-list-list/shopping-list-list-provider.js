//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef, useState } from "uu5g05";
import ShoppingListListContext from "./shopping-list-list-context";
import { useUserContext } from "../user-list/user-context";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

export const ShoppingListListProvider = createComponent({
  uu5Tag: Config.TAG + "ShoppingListListProvider",

  render(props) {
    const [shoppingListList, setShoppingListList] = useState([]);
    const { loggedUser } = useUserContext();

    const shoppinglistDataList= useDataList({
      onLoad: handleLoad,
      onCreate: handleCreate,
      onUpdate: handleUpdate,
      onDelete: handleDelete,
      initialDtoIn: {},
    });

    const imageUrlListRef = useRef([]);

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => imageUrlListRef.current.forEach((url) => URL.revokeObjectURL(url));
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    async function handleLoad(dtoIn) {
      try {
        const shoppingLists = await Calls.Shoppinglist.list(dtoIn);
        setShoppingListList(shoppingLists);
        return { itemMap: shoppingLists.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}) };
      } catch (error) {
        console.error("Error fetching shopping lists:", error);
        return { error };
      }
    }

    async function handleCreate(values) {
      try {
        const newShoppingList = await Calls.Shoppinglist.create(values);
        setShoppingListList((current) => [...current, newShoppingList]);
        return { item: newShoppingList };
      } catch (error) {
        console.error("Error creating shopping list:", error);
        return { error };
      }
    }

    async function handleUpdate(dtoIn) {
      try {
        const updatedShoppingList = await Calls.Shoppinglist.update(dtoIn);
        setShoppingListList((current) =>
          current.map((item) => (item.id === updatedShoppingList.id ? updatedShoppingList : item))
        );
        return { item: updatedShoppingList };
      } catch (error) {
        console.error("Error updating shopping list:", error);
        return { error };
      }
    }

    async function handleDelete(dtoIn) {
      try {
        await Calls.Shoppinglist.delete(dtoIn);
        setShoppingListList((current) => current.filter((item) => item.id !== dtoIn.id));
        return {};
      } catch (error) {
        console.error("Error deleting shopping list:", error);
        return { error };
      }
    }

    return (
      <ShoppingListListContext.Provider value={{ shoppinglistDataList }}>
        {typeof props.children === "function" ? props.children(shoppinglistDataList) : props.children}
      </ShoppingListListContext.Provider>
    );
  },
});

export default ShoppingListListProvider;
//@@viewOff:exports
