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