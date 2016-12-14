/*
	WebPlotDigitizer - http://arohatgi.info/WebPlotdigitizer

	Copyright 2010-2016 Ankit Rohatgi <ankitrohatgi@hotmail.com>

	This file is part of WebPlotDigitizer.

    WebPlotDIgitizer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WebPlotDigitizer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WebPlotDigitizer.  If not, see <http://www.gnu.org/licenses/>.


*/

var wpd = wpd || {};

wpd.initApp = function (config) {// This is run when the page loads.
    wpd._config = config || {
        contentBaseUri: "/",
        loadingCurtainSelector: "#loadingCurtain",
        sidebarContainerSelector: "#sidebarContainer",
        mainContainerSelector: "#mainContainer",
        appContainerElem: document.body,
        focusedSelection: null,
        wpdPlotMemento: null,
        userSettings: { }
    };
    //wpd.appData.lee_setPlotMemento(wpd._config.wpdPlotMemento);

    wpd.browserInfo.checkBrowser();
    wpd.layoutManager.initialLayout(config);
    if (!wpd.loadRemoteData()) {
        if (!!config.graphImage) {
            wpd.graphicsWidget.loadImageFromURL(config.graphImage.imageSrc,
                false //true <-- TODO - this bool needs to be dynamic
            );
            //wpd.graphicsWidget.leeInit();
            //wpd.graphicsWidget.loadImageFromData(
            //    config.graphImage.imageData,
            //    config.graphImage.imageData.width,
            //    config.graphImage.imageData.height,
            //    false,
            //    true
            //);
        } else {
            wpd.graphicsWidget.loadImageFromURL(wpd._config.contentBaseUri + 'start.png');
            //wpd.messagePopup.show(wpd.gettext('unstable-version-warning'), wpd.gettext('unstable-version-warning-text'));
        }
    }
    // document.getElementById('loadingCurtain').style.display = 'none';
    document.querySelectorAll(wpd._config.loadingCurtainSelector)[0].style.display = 'none';

};


wpd.loadRemoteData = function() {

    if(typeof wpdremote === "undefined") { 
        return false; 
    }
    if(wpdremote.status != null && wpdremote.status === 'fail') {
        wpd.messagePopup.show('Remote Upload Failed!', 'Remote Upload Failed!');
        return false;
    }
    if(wpdremote.status === 'success' && wpdremote.localUrl != null) {
        wpd.graphicsWidget.loadImageFromURL(wpdremote.localUrl);
        wpd.popup.show('axesList');
        return true;
    }
    return false;
};

//document.addEventListener("DOMContentLoaded", wpd.initApp, true);
