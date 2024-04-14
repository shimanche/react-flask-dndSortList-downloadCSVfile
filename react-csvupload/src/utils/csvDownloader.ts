// csvDownloader.ts
interface DataItem {
  No: number;
  id:number;
  name: string;
  company: string;
  // 他のフィールドがある場合は追加します
}


// `responseData` を CSV ファイルとしてダウンロードする関数
export const downloadCSV = (responseData: DataItem[] | null): void => {
    if (!responseData) {
        return;
    }

    const headers = ['id', 'No', 'name', 'company'];
    const csvRows = responseData.map(dataItem => {
        return `${dataItem.id},${dataItem.No},${dataItem.name},${dataItem.company}`;
    });
    const csvData = [headers.join(','), ...csvRows].join('\n');
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
