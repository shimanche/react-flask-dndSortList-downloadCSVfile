import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface DataItem {
  No: number;
  name: string;
  company: string;
  // 他のフィールドがある場合は追加します
}
type SimpleSortableItemProps = {
  item: DataItem;
};

const ItemForNameCompany: React.FC<SimpleSortableItemProps> = ({ item }) => {
  const {
    isDragging, //アイテムが現在ドラッグされているかを示す boolean です。
    attributes, //アクセシビリティや HTML の属性を適切に設定するために使用されます。
    setNodeRef, //DOM 要素への参照を設定するために使用されます。これにより、dnd-kitは、Sortable のドラッグアンドドロップにその要素を正確に追跡することができます。
    transform, //アイテムがドラッグ操作中にどのように移動するかを定義する CSS 変換のオブジェクトです。
    listeners, //ドラッグ操作の開始や終了するためのマウスやタッチイベントのリスナーを含んでいます。
    transition, //transformプロパティの設定がどのように時間をかけて適用されるかを定義する CSS プロパティです。
    setActivatorNodeRef,
  } = useSortable({
    id: item.No,
  });

  // console.log("transform:", transform);
  // console.log('setNodeRef:', setNodeRef);
  // console.log('attributes:', attributes);
  // console.log('listeners:', listeners);
  // console.log("transition:", transition);
  // console.log("isDragging:", isDragging);

  return (
    <div
      ref={setNodeRef}
      // {...attributes}
      // {...listeners}
      // style={{
      //   transform: CSS.Transform.toString(transform),
      //   transition,
      // }}
      style={{
        // marginBottom: '10px', // マージンを追加
        padding: '10px', // パディングを追加
        // border: '1px solid #ccc', // ボーダーを追加
        borderRadius: '5px', // 角丸を追加
        background: isDragging ? '#f0f0f0' : 'transparent', // ドラッグ時の背景色を変更
        transition: 'background-color 0.3s ease', // 背景色の変化をアニメーション化
        transform: CSS.Transform.toString(transform),
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* つまみ部分 */}
        <div
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            marginRight: '5px', // マージンを追加
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div>{item.name}</div>
      </div>
    </div>
  );
};

export default ItemForNameCompany;
