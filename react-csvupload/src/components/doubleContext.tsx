import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import ItemForNameCompany from './ItemForNameCompany';
import Item2ndColumn from './Item2ndcolumn';

interface DataItem {
  No: number;
  id: number;
  name: string;
  company: string;
  // 他のフィールドがある場合は追加します
}

const objectsList:DataItem[] = [
  {
    No: 1,
    id: 1001,
    name: 'Alice',
    company: 'TechCorp',
  },
  {
    No: 2,
    id: 1002,
    name: 'Bob',
    company: 'FinanceInc',
  },
  {
    No: 3,
    id: 1003,
    name: 'Carol',
    company: 'HealthPlus',
  },
];

const DoubleContext = () => {
  const [responseData, setResponseData] = useState(objectsList);

  const [column2Data, setColumn2Data] = useState<DataItem[]>([]); // 2列目のデータ（最初は空）

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    // 1列目と2列目のデータを識別
    const activeColumn = responseData.some(item => item.No === active.id) ? 'column1' : 'column2';
    const overColumn = responseData.some(item => item.No === over.id) ? 'column1' : 'column2';

    // ドラッグが1列目と2列目の間で行われた場合
    if (activeColumn !== overColumn) {
      if (activeColumn === 'column1') {
        // 1列目から2列目へのドラッグ
        const activeIndex = responseData.findIndex(item => item.id === active.id);
        const itemToMove = responseData[activeIndex];
        setResponseData(items => items.filter((_, index) => index !== activeIndex));
        setColumn2Data(items => [...items, itemToMove]);
        console.log("column2Data",column2Data)
      } else {
        // 2列目から1列目へのドラッグ
        const activeIndex = column2Data.findIndex(item => item.id === active.id);
        const itemToMove = column2Data[activeIndex];
        setColumn2Data(items => items.filter((_, index) => index !== activeIndex));
        setResponseData(items => [...items, itemToMove]);
      }
    } else {
      // 列内のアイテムの並び替え
      if (activeColumn === 'column1') {
        const oldIndex = responseData.findIndex(item => item.id === active.id);
        const newIndex = responseData.findIndex(item => item.id === over.id);
        setResponseData(items => arrayMove(items, oldIndex, newIndex));
      } else {
        const oldIndex = column2Data.findIndex(item => item.id === active.id);
        const newIndex = column2Data.findIndex(item => item.id === over.id);
        setColumn2Data(items => arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h3>１列目</h3>
          <SortableContext items={responseData}>
            {responseData.map((data, index) => (
              <div
                key={data.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <div style={{ marginRight: '10px', fontWeight: 'bold' }}>
                  {index + 1}
                </div>
                {/* ItemForNameCompanyコンポーネントは適宜更新 */}
                <ItemForNameCompany item={data} />
              </div>
            ))}
          </SortableContext>
        </div>
        <div style={{ flex: 1 }}>
        <h3>2列目</h3>
          <SortableContext items={column2Data}>
          {/* <SortableContext items={column2Data}> */}
            {/* {responseData.map((data, index) => ( */}
             {column2Data.map((data, index) => (
              <div
                key={data.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <div style={{ marginRight: '10px', fontWeight: 'bold' }}>
                  {index + 1}
                </div>
                {/* ItemForNameCompanyコンポーネントは適宜更新 */}
                <Item2ndColumn item={data} />
              </div>
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default DoubleContext;
