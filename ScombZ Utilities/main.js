/* ScombZ Utilities */
/* main.js */
(function(){
    'use strict';
    /*  定数  */
    const $$version = chrome.runtime.getManifest().version; //バージョン
    const $$reacquisitionMin = 20;      //再取得までの時間(分)
    /*  定数ここまで  */
    console.log(`Welcome to ScombZ Utilities ver.${$$version}`);
    
    /* 設定読み込み*/
    //初期状態（設定が保存されていない場合に適用される）
    const defaults = {
            year: null,                 //入学年度
            fac: null,                  //学部
            clickLoginBtn: true,        //ログインボタンクリック
            adfsSkip: true,             //adfsスキップ
            exitSidemenu: true,         //サイドメニューを閉じる
            styleSidemenu: true,        //サイドメニューのスタイル変更
            styleExamBtn: true,         //テストのボタンスタイル変更
            styleExamImg: false,        //テストの画像スタイル変更
            addSubTimetable: true,      //メニューを展開したときの時間割
            hideCompletedReports: true, //完了したレポートをカレンダーに表示しない
            styleDialog: true,          //ダイアログを大きくする
            changeReportBtn: true,      //レポート提出ボタンの変更
            syllBtn: true,              //シラバスリンクボタンを表示
            changeLogout: true,         //ログアウト画面変更
            setMaxWidth: true,          //科目ページに最大横幅を設定
            pageTopBtn: true,           //ページトップへ行くボタンを消すかどうか
            mouseDown: true,            //ホイールクリックをできるようにする
            tasklistDisplay: true,      //メニュー横課題表示
            styleNowPeriod: true,       //現在のコマを目立たせる
            displayName: false,         //履修者表示名を変更する
            layoutHome: true,           //HOMEのレイアウト
            fixHeadShadow: true,        //キモイヘッダの影なおす
            notepadMode: true,          //メモモード
            ddSubmission: false,        //D&Dで課題提出
            updateClear: false,         //通知を削除するボタン
            darkmode: 'relative',       //ダークモード
            remomveDirectLink: true,    //ダイレクトリンクを消す
            adjustTimetableData:{       // LMSの調整
                eraseSat: false,        // 土曜日を消す
                erase6: false,          // 6限を消す
                erase7: false,          // 7限を消す
                dispClassroom: false,   // 講師名表示を教室表示にする
                timetableCentering: false // 時間割のセンタリング 
            }
    }
    /* ローディング画面 */
    onLoading();
    /* メイン処理 */
    document.addEventListener('DOMContentLoaded', function(){
        //chrome Storage API読み込み
        chrome.storage.local.get(defaults, (items) => {
            if(location.hostname == "scomb.shibaura-it.ac.jp"){
                console.log("旧Scomb");
                scombLogin();
            }
            if(location.hostname == "adfs.sic.shibaura-it.ac.jp"){
                console.log("adfs");
                //ADFSだったらadfs.jsに飛ばす
                adfsLoaded();
            }
            if(location.hostname == "syllabus.sic.shibaura-it.ac.jp"){
                //シラバスだったらsyllabus.jsに飛ばす
                syllabusLoaded(items.year , items.fac);
            }
            if(location.hostname == 'scombz.shibaura-it.ac.jp'){
                //デバッグ用 itemsをログ出力
                console.log(items);
                //非表示にしていたものを表示
                setTimeout(function(){
                    document.documentElement.style.visibility = '';
                },300);
                
                //設定ボタンを追加
                addExtensionSettingsBtn();
                //帰ってきて芝猫
                topShibaneko();
                //ページ上部にある固定ヘッダのキモい影を直す
                if(items.fixHeadShadow === true){
                    fixHeadShadow();
                }
                //HOMEをレイアウト
                if(items.layoutHome === true){
                layoutHome();
                }
                //ログインボタン自動クリック
                if(items.clickLoginBtn === true){
                    clickLoginBtn();
                }
                
                //サイドメニューを閉じる
                if(items.exitSidemenu === true){
                    exitSidemenu();
                }
                //サイドメニューのスタイル変更
                if(items.styleSidemenu === true){
                    styleSidemenu();
                //メニューを展開したときの時間割 (オフだった場合はグレーレイヤーだけ表示) , メニュー横に課題一覧を表示
                    subTimetable(items.addSubTimetable , items.tasklistDisplay , $$version,$$reacquisitionMin);
                }
                //課題一覧取得
                if( items.tasklistDisplay === true ){
                getTaskLists($$reacquisitionMin);
                surveyLinkScroll();
                };
                //テストのスタイル変更
                if(items.styleExamBtn === true){
                    styleExam();
                    styleSurveys();
                }
                if(items.styleExamImg === true){
                    styleExamImg();
                }
                //完了したレポートをカレンダーに表示しない
                if(items.hideCompletedReports === true){
                    hideCompletedReports();
                }
                //ダイアログを大きくする
                if(items.styleDialog === true){
                    styleDialog();
                }
                //レポート提出ボタンの変更
                if(items.changeReportBtn === true){
                    changeReportBtn();
                }
                
                //ログアウト画面の変更
                if(items.changeLogout === true){
                    changeLogout();
                }
                //画面横幅最大値の変更
                if(items.setMaxWidth === true){
                    maxWidthOnSubjPage();
                }
                //ページトップボタンの表示有無
                if(items.pageTopBtn === true){
                    remomvePageTop();
                }
                
                //ホイールクリックをできる機能
                if(items.mouseDown === true){
                mouseEvents();
                }
                //シラバスリンクボタンを表示
                if(items.syllBtn === true){
                    //学年、学部が未入力の時はエラー表示
                    if(items.year !== null && items.fac !== null){
                        displaySyllabus(items.year , items.fac);
                    }else{
                        displaySyllabusError();
                    }
                }
                //現在の授業を目立たせる
                if(items.styleNowPeriod === true){
                    styleNowPeriod();
                }
                //表示名を変更
                if(items.displayName === true){
                    removeName();
                }
                //メモ機能
                if(items.notepadMode === true){
                    notepad(items.tasklistDisplay);
                }
                
                //LMSの調整
                adjustTimetable(items.adjustTimetableData, items.addSubTimetable);
                
                //D&Dで課題提出
                if(items.ddSubmission === true){
                    ddSub();
                }
                
                //通知を削除するボタン
                if(items.updateClear === true){
                    updateClear();
                }
                //ダイレクトリンクを消す
                if(items.remomveDirectLink === true){
                    remomveDirectLink();
                }
                //ダークモードの適用
                darkmodeLayout(items.darkmode);
                //クリックして名前隠す
                
                clickHideName();
                //カスタムCSSの適用
                
                customizeCSS();
                console.log('すべての機能の実行が完了しました');
                
            }
        });
    });
})();
function onLoading(){
    'use strict';
    console.log('Loading');
    if(location.hostname == "scombz.shibaura-it.ac.jp"){
        console.log("SCOMBZ");
        //一度非表示
        document.documentElement.style.visibility = 'hidden';
    }else{
        console.log("NOT SCOMBZ");
    }
    return;
}