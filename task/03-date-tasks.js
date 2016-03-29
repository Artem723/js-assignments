'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date() 
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
   return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
   return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
   var year = date.getFullYear();
 /*  if(year % 4 !== 0)return false;
   else if(year % 100 !== 0)return true;
   else if(year % 400 !== 0)return false;
   else return true;*/
   
   return (year % 4 == 0) && ((year % 100 !== 0) || (year % 400 == 0));
}


/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
   var diff = Math.abs(startDate.getTime() - endDate.getTime());
   
   var hourInMS = 60*60*1000;
   var minuteInMS = 60 * 1000;
   var secondInMS = 1000;
   
   var hours = Math.floor(diff/hourInMS);
   diff -= hours * hourInMS;
   var minutes = Math.floor(diff/minuteInMS);
   diff -= minutes * minuteInMS;
   var seconds = Math.floor(diff/secondInMS);
   var mSeconds = diff - seconds*secondInMS;
   
   var result = "" + (hours<10) ? "0"+hours : hours;
   result += ":";
   result +=  (minutes<10) ? "0"+minutes : minutes;
   result += ":";
   result +=  (seconds<10) ? "0"+seconds : seconds;
   //result += "." + (mSeconds<100) ? "0"+mSeconds : mSeconds;
   result += ".";
   if(mSeconds<100)result += "0";
   if(mSeconds<10)result += "0";
   result += mSeconds;
   return result;
   
   
}


/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
    var radInHour = 2*Math.PI/12;
    var radInMinute = 2*Math.PI/60;
    
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
        
    if(hours>12)hours-=12;
    
    var hoursAngle = hours * radInHour + radInHour * minutes/60;
    var minutesAngle = minutes * radInMinute; 
    var result = Math.abs(hoursAngle - minutesAngle);
    if(result > Math.PI)result -= Math.PI;
    return result;
    
        

}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
