from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import pandas as pd 
from io import StringIO

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return 'Hello, Flask!'
  
@app.route('/getlist',methods = ['POST'])
def getItems():
  data = request.json
  items = data.get('items',[])
  
  print("items",items)
  
  return jsonify({'message': 'Items recieved'})

@app.route('/upload',methods = ['POST'])
def upload_file():  
      try:
        file = request.files['file']  # キー名を確認して変更
        if not file:
            return jsonify({'error': 'No file provided'}), 400
        # file_content = file.read()
                # ファイルの内容を一旦読み込む
        file_content = file.read().decode('utf-8')
        # print('File content:', file_content)
        
        # pandasでCSVを解析
        df = pd.read_csv(StringIO(file_content),skipinitialspace=True)
                # 列名の中で "Unnamed" で始まる列を削除する
        df = df.loc[:, ~df.columns.str.startswith('Unnamed')]
        print(df)
        # ファイルを読み取り、pandasでCSVを解析
        # df = pd.read_csv(file)
        
        # データフレームを辞書のリストに変換
        data = df.to_dict(orient='records')
        
        # print(data)
        
        # JSON形式でデータを返す
        return jsonify(data)
           
        # return jsonify({'file_content': file_content.decode('utf-8')})
  
        
      except Exception as e:
        print('Error uploading file:', e)
        return jsonify({'error': 'Failed to upload file'}), 500

if __name__ == '__main__':
    app.run(port=8888) #mac　Sonoma使用。デフォルトの5000番はmacで使用されているのでポート番号を変更している
    # app.run(debug=True)
