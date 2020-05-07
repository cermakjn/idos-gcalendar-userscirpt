// ==UserScript==
// @name         IDOS - Save connection to a Google Calendar
// @name:cs      IDOS – Uložit spojení do Google Kalendáře
// @description  Save connection to Google Calendar
// @description:cs Uloží spojení do Google kalendáře
// @version      1.0.0
// @icon         https://idos.idnes.cz/favicon.ico
// @author       Jan Cermak
// @match        https://idos.idnes.cz/*/spojeni/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var shareLinkClass = 'add-to-google-calendar';

    function appendShareLink(element) {
        var links = element.find('ul.connection-expand__actions');
        links.css('width', '120%');

        var saveLink = jQuery('<li/>', {
            class: shareLinkClass
        }).append(jQuery("<a/>", {
            href: '#',
            html: '<span>Uložit do Google kalendáře</span>'
        }).bind('click',function(e) {
            e.preventDefault();

            var eventSelector = jQuery(this).closest('div.detail-box');

            var connectionText = '';
            var startStation = null;
            var finishStation = null;
            var startTime = null;
            var finishTime = null;
            var startTimeMoved = false;
            var finishTimeMoved = false;

            var currentYear = new Date().getFullYear();

            var connectionDate = eventSelector.find('div.connection-head h2.date span.date-after').text().replace(/[a-z]/gi, '').split('.');
            var startDate = currentYear + connectionDate[1].padStart(2, '0') + connectionDate[0].padStart(2, '0');
            var startDateObject = new Date(currentYear, (connectionDate[1].padStart(2, '0') - 1), connectionDate[0].padStart(2, '0'));
            var finishDate = startDate;

            eventSelector.find('div.connection-details div.line-item div.outside-of-popup').each(function() {
                var connection = jQuery(this);

                var stations = connection.find('ul.stations li');
                var firstStation = stations.first();
                var lastStation = stations.last();
                var startTimeSelector = firstStation.find('p.time');
                var finishTimeSelector = lastStation.find('p.time');

                var connectionStartStation = firstStation.find('strong.name').text();
                var connectionStartTime = startTimeSelector.text();
                var connectionFinishStation = lastStation.find('strong.name').text();
                var connectionFinishTime = finishTimeSelector.text();

                var transportTypeAndLine = connection.find('div.line-title h3 span').text();

                if (startStation === null) {
                    startStation = connectionStartStation;
                    startTime = connectionStartTime.replace(':', '').padStart(4, '0') + '00';

                    if (startTimeSelector.hasClass('color-red')) {
                        startTimeMoved = true;
                    }
                }
                finishStation = connectionFinishStation;
                finishTime = connectionFinishTime.replace(':', '').padStart(4, '0') + '00';
                if (finishTimeSelector.hasClass('color-red')) {
                    finishTimeMoved = true;
                }

                var walk = connection.find('div.walk');
                if (walk.length === 1) {
                    connectionText += walk.text().trim() + "\r\n\r\n";
                }

                connectionText += transportTypeAndLine + "\r\n" + connectionStartTime + ' ' + connectionStartStation + "\r\n";
                connectionText += connectionFinishTime + ' ' + connectionFinishStation + "\r\n\r\n";
            });

            connectionText += eventSelector.find('div.connection-head p.total').text();

            // Increase the finish date in case of one of the time is in another day
            if ((startTimeMoved === true || finishTimeMoved === true) && !(startTimeMoved === true && finishTimeMoved === true)) {
                var finishDateObject = new Date(startDateObject.setDate(startDateObject.getDate() + 1));
                finishDate = finishDateObject.getFullYear().toString() + (finishDateObject.getMonth() + 1).toString().padStart(2, '0') + finishDateObject.getDate().toString().padStart(2, '0');
            }

            var eventName = startStation + ' - ' + finishStation;
            var eventDetail = connectionText;
            var eventDates = startDate + 'T' + startTime + '/' + finishDate + 'T' + finishTime;
            var eventUrl = eventSelector.data('share-url');

            // Format: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/master/services/google.md
            var googleCalendarUrl = 'https://www.google.com/calendar/event?action=TEMPLATE&text=' + eventName;
            googleCalendarUrl += '&details=' + encodeURI(eventDetail);
            googleCalendarUrl += '&dates=' + eventDates;
            googleCalendarUrl += '&location=' + startStation;
            googleCalendarUrl += '&sprop=' + eventUrl;

            window.open(googleCalendarUrl);
        }));
        links.append(saveLink);
    }

    function createShareLinks() {
        var connections = jQuery('div.connection-list>div.box');

        connections.each(function() {
            appendShareLink(jQuery(this));
        });
    }

    function init() {
        createShareLinks();

        jQuery('div.connection-list').bind('DOMNodeInserted', function () {
            jQuery(this).find('div.box').each(function() {
                if (jQuery(this).find('li.' + shareLinkClass).length === 0) {
                    appendShareLink(jQuery(this));
                }
            });
        });
    }

    init();
})();