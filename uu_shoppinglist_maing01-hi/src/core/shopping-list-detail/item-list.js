//@@viewOn:imports
import { createVisualComponent, Utils, useRoute, useState, Lsi } from "uu5g05";
import { Block, Icon, Toggle } from "uu5g05-elements";
import { Checkbox } from "uu5g05-forms";

import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";

import TextInput from "./text-input.js";
import importLsi from "../../lsi/import-lsi.js";

import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const FILTER_LIST = [
  {
    key: "showChecked",
    label: <Lsi import={importLsi} path={["Detail", "buttonLabel"]} />,
    filter: (item, value) => {
      if (value) return true;
      else return !item.checked;
    },
    inputType: "bool",
  },
];

const ItemList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ isOwner, shoppingListDetail, handleUpdate, handleToggleState, handleDelete }) {
    //@@viewOn:private
    const [filterList, setFilterList] = useState([]);

    function onFilterChange(e) {
      setFilterList(e.data.filterList);
    }

    const [, setRoute] = useRoute();
    const itemListWithEmptyList = shoppingListDetail.itemList.slice();
    if (!shoppingListDetail.archived) itemListWithEmptyList.push({});
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider
        data={itemListWithEmptyList || []}
        filterDefinitionList={FILTER_LIST}
        filterList={filterList}
        onFilterChange={onFilterChange}
      >
        <div>
     <Block
  card={"full"}
  header={({ style }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Icon
          style={{ fontSize: "20px", marginRight: "8px" }}
          icon={shoppingListDetail.archived ? "uugds-lock-closed" : "uugds-lock-open"}
        />
        <span>{shoppingListDetail.name}</span>
      </div>
      <Toggle
        label={<Lsi import={importLsi} path={["Detail", "buttonLabel"]} />}
        value={filterList.some((filter) => filter.key === "showChecked" && filter.value)}
        style={{ marginLeft: "8px" }}
        onChange={(e) =>
          onFilterChange({ data: { filterList: [{ key: "showChecked", value: e.data.value }] } })
        }/>
    </div>
     )}
          headerType={"title"}
          actionList={[
            {
              icon: shoppingListDetail.archived ? "uugds-lock-open" : "uugds-lock-closed",
              children: shoppingListDetail.archived ? <Lsi import={importLsi} path={["Detail", "archive"]} /> : <Lsi import={importLsi} path={["Detail", "unarchive"]} />,
              onClick: () => handleToggleState(shoppingListDetail),
              hidden: !isOwner,
            },
            {
              icon: "uugds-delete",
              children: <Lsi import={importLsi} path={["Detail", "delete"]} />,
              colorScheme: "negative",
              onClick: () => {
                handleDelete(shoppingListDetail);
                setRoute("shoppingListList");
              },
              hidden: !isOwner,
            },
          ]}
          headerSeparator={true}
          contentMaxHeight={"60vh"}
          footer={<Uu5TilesControls.Counter />}
        >
          <Uu5TilesElements.Table
            hideHeader
            getActionList={({ data }) =>
              data.id && !shoppingListDetail.archived
                ? [
                    {
                      icon: "uugds-delete",
                      colorScheme: "negative",
                      size: "s",
                      onClick: () => handleDeleteItem({ data, shoppingListDetail, handleUpdate }),
                    },
                  ]
                : []
            }
            columnList={[
              {
                value: "checked",
                maxWidth: "max-content",
                cell: (data) => {
                  if (data.data.id)
                    return (
                      <Checkbox
                        value={data.data.checked}
                        size={"xs"}
                        readOnly={shoppingListDetail.archived}
                        onChange={(e) =>
                          handleUpdateCheckedItem({ value: e.data.value, data, shoppingListDetail, handleUpdate })
                        }
                      />
                    );
                  else return "";
                },
              },
              {
                value: "name",
                cell: (data) => {
                  return (
                    <TextInput
                      style={{ width: "100%" }}
                      value={data.data.name}
                      onChange={(value) => {
                        handleUpdateItem({ value, data, shoppingListDetail, handleUpdate });
                      }}
                      readOnly={shoppingListDetail.archived}
                      significance={shoppingListDetail.archived ? "subdued" : undefined}
                    />
                  );
                },
              },
              { type: "actionList" },
            ]}
          />
        </Block>
        </div>

      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

function getHeaderInput({ style, shoppingListDetail, handleUpdate }) {
  return (
    <TextInput
      className={Config.Css.css(style)}
      style={{ width: "50%" }}
      id={"header"}
      value={shoppingListDetail.name}
      onChange={(value) => handleUpdate({ ...shoppingListDetail, name: value })}
    />
  );
}

function handleUpdateItem({ value, data, shoppingListDetail, handleUpdate }) {
  if (data.data.id) {
    const index = shoppingListDetail.itemList.findIndex((item) => item.id === data.data.id);
    if (index >= 0) shoppingListDetail.itemList[index] = { ...data.data, name: value };
  } else if (value) {
    shoppingListDetail.itemList.push({ id: Utils.String.generateId(4), name: value });
  }
  handleUpdate(shoppingListDetail);
}

function handleUpdateCheckedItem({ value, data, shoppingListDetail, handleUpdate }) {
  const index = shoppingListDetail.itemList.findIndex((item) => item.id === data.data.id);
  if (index >= 0) shoppingListDetail.itemList[index] = { ...data.data, checked: value };
  handleUpdate(shoppingListDetail);
}

function handleDeleteItem({ data, shoppingListDetail, handleUpdate }) {
  const index = shoppingListDetail.itemList.findIndex((item) => item.id === data.id);
  if (index >= 0) shoppingListDetail.itemList.splice(index, 1);
  handleUpdate(shoppingListDetail);
}

//@@viewOn:exports
export { ItemList };
export default ItemList;
//@@viewOff:exports
