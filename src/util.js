export const timeConversion = (time) => {
    var suffix = time.slice(0,2) >= 12 ? "PM":"AM";
    var hours = (( Number(time.slice(0,2)) + 11) % 12 + 1) + time.slice(2,5) +  " " + suffix
    return hours;
}

export const calculateDuration = (deptDate, deptTime, arrDate, arrTime) => {
        
    let deptDateTime = new Date(deptDate.split(' ').slice(1,4).join(' ') + ' ' + deptTime);
    let arrDateTime = new Date(arrDate.split(' ').slice(1,4).join(' ') + ' ' + arrTime);
    
    let diffInMilliSeconds = Math.abs(arrDateTime - deptDateTime) / 1000;

      // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
    difference +=  `${days} d`;
    }

    difference += (hours === 0 || hours === 1) ? `${hours}h ` : `${hours}h `;

    difference += (minutes === 0 || hours === 1) ? `${minutes}m` : `${minutes} m`; 

    return difference;
}
