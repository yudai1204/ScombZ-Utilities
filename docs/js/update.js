const updateArea = document.getElementById("updateContents");
if(updateArea){
    $.getJSON("updateData.json", (jsondata) => {
        let mainHtmlData = "";
        for(const versionData of jsondata){
            let subHtmlData = `
            <div class="version-column">
            <h2>ver.${versionData.version}</h2>
            <h3 class="browser-update-date">Chrome版アップデート:${versionData.date.chrome}</h3>
            <h3 class="browser-update-date">FireFox版アップデート:${versionData.date.firefox}</h3>
            `;
            for(let i=0;versionData.contents[i];i++){
                const contents = versionData.contents[i];
                subHtmlData += `
                <div class="update-details">
                    <div class="update-type">${contents.genre}</div>
                    <h4>${contents.title}</h4>
                    <p>${contents.explain}</p>
                </div>`;
            }
            subHtmlData += '</div>';
            mainHtmlData += subHtmlData;
        }
        updateArea.innerHTML =  mainHtmlData;
    });
}