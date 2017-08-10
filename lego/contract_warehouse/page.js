// tag: 用于存放该控件代码的html标签。
// currentOffset: 当前显示的偏移。
// displayRows: 每页显示的数据行数。
// maxPageNum: 最多展现的分页数目。
// dataCount: 以此控件显示的数据总条目数。
function generatePageCtrl(tag, currentOffset, displayRows, maxPageNum, dataCount) {
//	debugger;
        if (currentOffset > dataCount) {
                return;
        }
        var currentPage;
        var code = "";
        code += "<nav class=\"pull-right\">";
        code += "<ul class = \"pagination\">";
        if (0 >= currentOffset) {
                currentPage = 1;
        } else {
                currentPage = Math.ceil(currentOffset / displayRows) + 1;
        }
        var pageCount = Math.ceil(dataCount / displayRows);
        var displaySceneCount = Math.ceil(pageCount / maxPageNum);
        var currentPageSceneNum = Math.ceil(currentPage / maxPageNum);
        if (currentPageSceneNum > 1) {
                code += "<li data-offset = \"" + (((currentPageSceneNum - 1) * maxPageNum * displayRows) - displayRows) + "\"><a><span>«</span></a></li>";
        }
        for (var i = ((currentPageSceneNum * maxPageNum) - maxPageNum + 1); i <= (currentPageSceneNum * maxPageNum); i++) {
                if (i > pageCount) {
                        break;
                }
                if (i == (currentPage)) {
                        code += "<li data-offset = \"" + (i * displayRows - displayRows) + "\" class = \"active\"><a>" + i + "</a></li>";
                } else {
                        code += "<li data-offset = \"" + (i * displayRows - displayRows) + "\"><a>" + i + "</a></li>";
                }
        }
        if ((displaySceneCount - currentPageSceneNum) >= 1) {
                code += "<li data-offset = \"" + ((currentPageSceneNum * maxPageNum * displayRows)) + "\"><a><span>»</span></a></li>";
        }
        code += "</ul>";
        code += "</nav>";
        // return code;
        $(tag).html(code);
}