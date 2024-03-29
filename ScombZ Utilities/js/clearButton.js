/* ScombZ Utilities */
/* clearButton.js */
//更新通知を削除するボタンの追加

function updateClear(){
    'use strict';

    let buttonUl = document.getElementsByClassName("page-head-notification-area clearfix")[0];
    if (buttonUl){
        console.log("更新通知を削除するボタン追加");
        let button = document.createElement("li");

        let buttonLink = document.createElement("a");
        buttonLink.className = "btn-header-info btnControl";
        buttonLink.id = "ctrl_btn_clear";
        buttonLink.href = "javascript:void(0);"

        var buttonSpan = document.createElement("span");
        buttonSpan.className = "header-icon-space";

        buttonLink.appendChild(buttonSpan);
        buttonLink.insertAdjacentHTML("beforeEnd",`
        <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="opacity: 1;" xml:space="preserve" class="header-img">
        <title>通知削除</title>
        <style type="text/css">
            .st0{fill:#4B4B4B;}
        </style>
        <g>
            <path class="st0" d="M439.114,69.747c0,0,2.977,2.1-43.339-11.966c-41.52-12.604-80.795-15.309-80.795-15.309l-2.722-19.297
                C310.387,9.857,299.484,0,286.642,0h-30.651h-30.651c-12.825,0-23.729,9.857-25.616,23.175l-2.722,19.297
                c0,0-39.258,2.705-80.778,15.309C69.891,71.848,72.868,69.747,72.868,69.747c-10.324,2.849-17.536,12.655-17.536,23.864v16.695
                h200.66h200.677V93.611C456.669,82.402,449.456,72.596,439.114,69.747z" style="fill: rgb(75, 75, 75);"></path>
            <path class="st0" d="M88.593,464.731C90.957,491.486,113.367,512,140.234,512h231.524c26.857,0,49.276-20.514,51.64-47.269
                l25.642-327.21H62.952L88.593,464.731z M342.016,209.904c0.51-8.402,7.731-14.807,16.134-14.296
                c8.402,0.51,14.798,7.731,14.296,16.134l-14.492,239.493c-0.51,8.402-7.731,14.798-16.133,14.288
                c-8.403-0.51-14.806-7.722-14.296-16.125L342.016,209.904z M240.751,210.823c0-8.42,6.821-15.241,15.24-15.241
                c8.42,0,15.24,6.821,15.24,15.241v239.492c0,8.42-6.821,15.24-15.24,15.24c-8.42,0-15.24-6.821-15.24-15.24V210.823z
                M153.833,195.608c8.403-0.51,15.624,5.894,16.134,14.296l14.509,239.492c0.51,8.403-5.894,15.615-14.296,16.125
                c-8.403,0.51-15.624-5.886-16.134-14.288l-14.509-239.493C139.026,203.339,145.43,196.118,153.833,195.608z" style="fill: rgb(75, 75, 75);"></path>
        </g>
        </svg>
        `)

        button.className = "header-clear";

        buttonUl.insertAdjacentHTML('beforeBegin',`
        <style>
        .header-clear {
            margin-right: 10px;
            float: left;
            margin-top: 5px;
            margin-left: 10px;
        }
        
        .header-icon-space {
            background-color: transparent;
            width: 13px;
            height: 13px;
            display: inline-block;
            position: relative;
            top: -21px;
            left: 40px;
            border-radius: 50%;
        }
        </style>
        `);

        button.appendChild(buttonLink);
        buttonUl.appendChild(button);
        //ボタン追加終了

        //ボタン部分のレイアウト調整
        //透明の赤丸を入れている
        let headerButtons = document.getElementsByClassName("btn-header-info btnControl");
        for (let headerButton of headerButtons){
            if (headerButton.getElementsByTagName("span").length == 0){
                buttonSpan = document.createElement("span");
                buttonSpan.className = "header-icon-space";
                headerButton.insertBefore(buttonSpan,headerButton.getElementsByClassName("header-img")[0])
            }
        }
    }
    $(function(){
        $("#ctrl_btn_clear").click(function(){
            console.log("更新通知削除ボタンがクリックされました");
            let postData="";
            let updateInfoIds;
            if (document.querySelectorAll("#ctrl_menu_notification > li").length > 1 && window.confirm("通知を削除しますか？")) {

                $.get("https://scombz.shibaura-it.ac.jp/updateinfo",
                function(data){
                    console.log("通知の取得に成功しました");
                    const parser = new DOMParser();
                    data = parser.parseFromString(data, 'text/html');

                    postData += "_csrf="+data.querySelector('input[name="_csrf"]').value;
                    postData += '&_method='+data.querySelector('input[name="_method"]').value
                    updateInfoIds = data.querySelectorAll('input[name="deleteUpdateInfoList"]');

                    for(let updateInfoId of updateInfoIds){
                        postData+="&deleteUpdateInfoList="+updateInfoId.value;
                    }
                    console.log(postData)

                    $.post("https://scombz.shibaura-it.ac.jp/updateinfo",postData,
                    function(){
                        console.log("通知の削除に成功しました");
                        let notifi = document.querySelectorAll("#ctrl_menu_notification > li");
                        for (let i=0;i<notifi.length-1;i++){
                            notifi[i].remove();
                        }
                        document.querySelector("#ctrl_btn_notification > span").className = "header-icon-space";

                    })
                })
            }else{
                console.log("通知はありませんでした");
            }
            
        })
    })
}
//ScombZバグ修正 D&D時に課題削除できないバグを修正
function submissionBugFix(){
    if(location.href.includes("https://scombz.shibaura-it.ac.jp/lms/course/report/submission") && 
    document.querySelectorAll("#toDragAndDrop").length == 1 && 
    document.querySelectorAll("#submissionFileResult").length == 1){
        console.log("D&D状態のバグ修正開始");
        let reportBtn = document.querySelector("#report_submission_btn");
        reportBtn.style.display = "none";
        reportBtn.insertAdjacentHTML("beforebegin",`
        <a id="report_submission_btn_bugfix" class="under-btn btn-txt btn-color">確認画面に進む</a>
        `)
    }

    function dadFileAreaAddDiv(){
        document.querySelector("#dad_file_area").insertAdjacentHTML("beforeEnd",`
                <div style="display:none;" id="DaDfix">
                <input type="file" class="fileSelectInput" name="uploadFiles" style="display : none;">
                <input type="hidden" class="originalFileName" name="originalFileName" value="">
                <input type="hidden" name="fileId" value="0">
                <input type="hidden" name="rowCounter" value="1">
                <input type="text" name="fileName" class="input input-box">
                <input type="text" name="comment" class="input input-box"></div>`
                );
    }

    function DaDCheck() {
        if (document.querySelector("#dad_file_area > div") == null){
        dadFileAreaAddDiv();
        }else{
            let dadFix = document.querySelectorAll("#DaDfix");
            if (dadFix.length != 1 || dadFix[0].id != "DaDfix"){
                for (let i of dadFix){
                    i.remove();
                }
            }
        }
        document.querySelector("#report_submission_btn").click();
    }

    $(document).ready(function () {
    $("#report_submission_btn_bugfix").click(function (){
        console.log("変更されたボタンをクリック");
        DaDCheck();});
    })
}