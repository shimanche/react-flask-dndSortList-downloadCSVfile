npm install @dnd-kit/core @dnd-kit/sortable


手順:
react-DragAndDropListSort サブモジュールの設定解除:

外側のリポジトリ (react-flask) で、サブモジュールの設定を解除します。以下のコマンドを実行します。
bash
Copy code
git submodule deinit -f react-DragAndDropListSort
ディレクトリのステージング解除:

サブモジュールとしてステージングされたreact-DragAndDropListSort ディレクトリを解除します。
bash
Copy code
git rm --cached react-DragAndDropListSort
react-DragAndDropListSort ディレクトリの .git ディレクトリ削除:

react-DragAndDropListSort ディレクトリ内の .git ディレクトリを削除します。これにより、ディレクトリが独立したリポジトリではなくなります。
bash
Copy code
rm -rf react-DragAndDropListSort/.git
ディレクトリを再度ステージングし、コミット:

react-DragAndDropListSort ディレクトリを再度ステージングし、通常のディレクトリとしてコミットします。
bash
Copy code
git add react-DragAndDropListSort
git commit -m "Add react-DragAndDropListSort as regular directory"
以上の手順に従ってサブモジュールの設定を解除し、react-DragAndDropListSort ディレクトリを通常のディレクトリとして扱うことができます。この変更をリモートリポジトリにプッシュする場合は、git push origin mainを実行してください。





