import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios'; // axiosをインポート
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import SimpleSortableItem from './components/SimpleSortableItem';
import ItemForNameCompany from './components/ItemForNameCompany';
import { downloadCSV } from './utils/csvDownloader';
import { doubleList } from './utils/doubleList';

interface DataItem {
  No: number;
  id: number;
  name: string;
  company: string;
  // 他のフィールドがある場合は追加します
}

const ITEMS = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];

const App: React.FC = () => {
  const [items, setItems] = useState(ITEMS);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [responseData, setResponseData] = useState<any | null>(null);
  const [responseData, setResponseData] = useState<DataItem[] | null>(null);
  const [responseDataDouble, setResponseDataDouble] = useState<
    DataItem[] | null
  >(null);

  //ファイル選択時のハンドラー
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('e.target.files', e.target.files);
    setSelectedFile(e.target.files ? e.target.files[0] : null);
  };

  const sendItemshandler = async (): Promise<void> => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post(
          'http://localhost:8888/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // レスポンスデータを DataItem 配列にキャストします
        // console.log('response.data:', response.data);

        const data: DataItem[] = response.data;
        // if (data !== null) {
        // responseData をマッピングして各 DataItem に id プロパティを追加
        const responseDataWithId = data.map((dataItem) => {
          return {
            // No プロパティの値を id プロパティに設定
            id: dataItem.No,
            // 他のプロパティを保持
            No: dataItem.No,
            name: dataItem.name,
            company: dataItem.company,
            // 他のフィールドがある場合は追加
          };
        });
        console.log(responseDataWithId);
        setResponseData(responseDataWithId);

        // }
        // setResponseData(response.data);
        // レスポンスの処理を追加
        console.log('response.data.file_content:', data);
        console.log('Response from Flask responseData:', responseData);
        // console.log('Response from Flask:', response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (responseData) {
      setResponseDataDouble(doubleList(responseData));
    }
  }, [responseData]);
  console.log('responseDataDouble', responseDataDouble);

  const getMsg = async () => {
    try {
      const response = await axios.get('http://localhost:8888/');
      console.log('response:', response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sortable List</h1>
      <input type='file' onChange={handleFileChange} />
      <button onClick={sendItemshandler}>upload</button>
      <button onClick={() => downloadCSV(responseData)}>Download CSV</button>
      <button onClick={() => downloadCSV(responseDataDouble)}>
        Download CSV double
      </button>
      {/* 受け取ったデータを表示 */}

      <h2>Response Data:</h2>

      <div style={{ marginBottom: '10px' }}>
        {/* <button onClick={getMsg}>send</button> */}
      </div>
      {/* <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]}> */}
      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over == null) {
            return;
          }
          if (active.id !== over.id) {
            setResponseData((items) => {
              const oldIndex = items!.findIndex(
                (item) => item.No === active.id,
              );
              const newIndex = items!.findIndex((item) => item.No === over.id);
              return arrayMove(items!, oldIndex, newIndex);
            });
          }
        }}
      >
        <SortableContext items={responseData ?? []}>
          {responseData?.map((data, index) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px', // アイテム間のマージンを追加
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <div style={{ marginRight: '10px', fontWeight: 'bold' }}>
                {index + 1}
              </div>
              <ItemForNameCompany key={data.id} item={data} />
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <hr
        style={{
          border: 'none',
          height: '2px', // 線の太さ
          backgroundColor: '#333', // 線の色
          margin: '20px 0', // 上下の余白
        }}
      />

      {/* <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]}> */}
      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over == null) {
            return;
          }
          if (active.id !== over.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((item) => item.id === active.id);
              const newIndex = items.findIndex((item) => item.id === over.id);
              return arrayMove(items, oldIndex, newIndex);
            });
          }
        }}
      >
        <SortableContext items={items}>
          {items.map((item, index) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px', // アイテム間のマージンを追加
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <div style={{ marginRight: '10px', fontWeight: 'bold' }}>
                {index + 1}
              </div>
              <SimpleSortableItem key={item.id} item={item} />
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={getMsg}>Check Flask Connection</button>
    </div>
  );
};

export default App;

// interface ResponseData {
//   file_content: string;
//   error?: string;
// }

// const handleDouble = () => {
//   responseData && setResponseDataDouble(doubleList(responseData));
//   console.log('responseDataDouble', responseDataDouble);
// };

// {responseData && (
//   <div>
//     <h2>Response Data:</h2>
//     {responseData.map((data: any, index: any) => (
//       <div key={index}>
//         <p>No: {data.No}</p>
//         <p>Name: {data.name}</p>
//         <p>Company: {data.company}</p>
//         {/* 他のデータも表示します */}
//       </div>
//     ))}
//   </div>
// )}
