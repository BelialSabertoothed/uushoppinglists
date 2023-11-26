//@@viewOn:imports
import { createComponent, useRoute, useDataList } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const DetailProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [route, setRoute] = useRoute();
    const listId = route.params.id;

    const detailDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        deleteItem: handleDeleteItem,
        deleteMember: handleDeleteMember,
        update: handleUpdate,
        updateItem: handleUpdateItem,
        addItem: handleAddItem,
        addMember: handleAddMember,
      },
    });

    function handleLoad(dtoIn) {
      return Calls.Shoppinglist.get(dtoIn);
    }

    function handleDeleteItem(dtoIn) {
      return Calls.Shoppinglist.deleteItem(dtoIn, props.baseUri);
    }

    function handleDeleteMember(dtoIn) {
      return Calls.Shoppinglist.deleteMember(dtoIn, props.baseUri);
    }

    function handleUpdate(dtoIn) {
      return Calls.Shoppinglist.update(dtoIn, props.baseUri);
    }

    function handleUpdateItem(dtoIn) {
      return Calls.Shoppinglist.updateItem(dtoIn, props.baseUri);
    }

    function handleAddItem(dtoIn) {
      return Calls.Shoppinglist.addItem(dtoIn, props.baseUri);
    }

    function handleAddMember(dtoIn) {
      return Calls.Shoppinglist.addMember(dtoIn, props.baseUri);
    }
    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(detailDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailProvider };
export default DetailProvider;
//@@viewOff:exports