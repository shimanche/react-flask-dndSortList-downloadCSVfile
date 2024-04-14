export const doubleList = <T>(responseData: T[]): T[] => {
  // flatMap を使用して各要素を 2 回繰り返したリストを生成
  // console.log("doubleLIst.ts => return :",responseData.flatMap(data => [data, data]))
  return responseData.flatMap(data => [data, data]);
}



// export const doubleList = (responseData:any) =>{
//   const doubleList:any = [];
//   responseData.map((data:any)=>{
//     doubleList.push(data)
//     doubleList.push(data)
//   })
//   return doubleList

// }