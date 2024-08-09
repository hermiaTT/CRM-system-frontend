export const formateDate = (from) =>{
    if(!from) return '';
    let date = new Date(from);
    if (date instanceof Date && !isNaN(date)){
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return  `${year}-${month}-${day}`;
    }

}


export const formatDateEpoch = (from) => {
    const date = new Date(`${from}T00:00:00.000Z`);
    return date.getTime();
}