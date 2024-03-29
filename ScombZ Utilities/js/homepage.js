function homepageLoaded(){
    if(location.href.includes("https://yudai1204.github.io/ScombZ-Utilities/updates.html") || location.href.includes("https://scombz-utilities.com/update.html")){
        console.log("Update Release Note");
        document.querySelector("#updates .heading").insertAdjacentHTML("afterend",`
            <style type="text/css">
            #link_to_extention {
                display: block;
                position: fixed;
                right: 30px;
                bottom: 30px;
                color: #fff;
                background-color: #595;
                font-size: 20px;
                padding: 10px 30px;
                border-radius: 30px;
            }
            </style>
            <a href="javascript:void(0);" id="link_to_extention">Utilitiesの設定へ</a>
        `);
        if(document.getElementById("link_to_extention")){
            document.getElementById("link_to_extention").addEventListener("click", function(){
                chrome.runtime.sendMessage({"action": "openOptionsPage"});
            });
        }
    }
    if(true){
        let intervalcnt = 0;
        const interval = setInterval(function(){
            console.log("homepageLoaded");
            const optionBtn = document.getElementById("utilities-incontent-open-option-btn");
            console.log(optionBtn);
            if(optionBtn){
                clearInterval(interval);
                optionBtn.addEventListener("click", function(){
                    chrome.runtime.sendMessage({"action": "openOptionsPage"});
                });
            }
            if(intervalcnt++ > 10){
                clearInterval(interval);
            }
        }, 500);
    }
}