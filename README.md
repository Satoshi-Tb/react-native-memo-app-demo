# react-native-memo-app-demo

## React Nativeを用いたスマホアプリ

### 技術スタック
* バックエンド
  * Firebase
* フロントエンド
  * React Native
  
### 学習メモ
* セクション10: アプリ開発・構造化とスタイリング
  * KeyboardAvoidingViewのバグについて。  
    修正コード適用はいったん割愛する。
* セクション11: アプリ開発・ナビゲーションの実装
  * react-navigationを導入したところ、Androidエミュレータがエラーで画面表示できず。  
    VisualStudioCode上ではエラーがなく、また、Web画面からは表示可能。  
    直前まで正常に動作していたコミットからモジュールを再インストールし、エミュレータを起動したが、正常動作せず。  
    結局、Androidエミュレーターを再インストールすることで解決した。  
    なお、エミュレーターはPixcel3から、Pixcel4に変更。OSも30から31にVer UP。
* セクション12: アプリ開発・機能の実装
  * Firebase
    * 「ウェブ」を選択。React Nativeアプリの場合、AndroidでもiOSでもないので注意。
    * Firebase Hostingは不要。
    * Firebaseの初期化には、firebaseConfigのコードスニペットをそのまま使用する。
    * ライブラリは最新の9.x系を利用する。9.x系を導入するとエラーが発生したとあったが、学習日の時点ではエラーなし。  
      expo、Androidエミュレーターも正常動作したので、このまま9.x系で進める。  
      なお、8.x系とAPI体系が大きく変わっているため、講座内容をそのまま  
      打鍵するのではなく、適宜9.x系の使用方法に変換が必要になる。