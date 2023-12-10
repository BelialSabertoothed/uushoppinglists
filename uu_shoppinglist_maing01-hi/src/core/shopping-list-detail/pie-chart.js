import React, { useContext } from "react";
import { createVisualComponent, useDataList } from "uu5g05";
import Uu5Charts from "uu5chartsg01";
import { ShoppingListListContext } from "../shopping-list-list/shopping-list-list-context.js";

// Definujte komponentu PieChart
const Chart = createVisualComponent({
  displayName: "Chart",

  render() {
    // Získání dat z kontextu nákupního seznamu
    const shoppingListContext = useContext(ShoppingListListContext);
    const { shoppingListDetail } = shoppingListContext;

    // Získání položek nákupního seznamu
    const itemList = shoppingListDetail ? shoppingListDetail.itemList : [];

    // Vytvoření dat pro graf
    const completedCount = itemList.filter((item) => item.checked).length;
    const notCompletedCount = itemList.length - completedCount;
    const dataList = [
      { name: "Completed", value: completedCount },
      { name: "Not Completed", value: notCompletedCount },
    ];

    // Nastavení vlastností grafu
    const chartProps = {
      data: useDataList(dataList),
      chartProperties: {
        title: "Pie Chart", // Nastavte název grafu podle vašich potřeb
        series: [
          {
            name: "Completed",
            dataKey: "value",
          },
          {
            name: "Not Completed",
            dataKey: "value",
          },
        ],
      },
      tooltip: {
        labelFormatter: "{name}: {value}%",
      },
    };

    // Vykreslení grafu
    return <Uu5Charts.PieChart {...chartProps} />;
  },
});

export default Chart;